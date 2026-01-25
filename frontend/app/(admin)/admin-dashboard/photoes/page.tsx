"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";

type NewsItem = {
  id: number;
  title: string;
  image_url?: string | null; // First image in list (backend will later return array)
  images?: string[];
};

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  if (window.location.hostname === "localhost") {
    return "http://localhost:8000";
  }

  return "http://127.0.0.1:8000";
};

const extractXsrfToken = () => {
  if (typeof document === "undefined") return null;
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

const fetchCsrfToken = async (apiUrl: string) => {
  await fetch(`${apiUrl}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });

  const token = extractXsrfToken();
  if (!token) {
    throw new Error("CSRF token not found.");
  }
  return token;
};

const authHeaders = (token: string) => ({
  "X-XSRF-TOKEN": token,
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
});

export default function NewsUpdate() {
  const API_URL = resolveApiUrl();
  const router = useRouter();

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ----- Create Form State -----
  const [form, setForm] = useState({
    title: "",
    images: [] as (File | null)[],
  });

  // ----- Edit Modal -----
  const [editItem, setEditItem] = useState<NewsItem | null>(null);

  /* FETCH NEWS */
  const loadNews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/photoes`, {
        credentials: "include",
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        setNewsList([]);
        return;
      }

      setNewsList(payload.data ?? []);
    } catch (error) {
      console.error("News fetch error:", error);
      setNewsList([]);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  /* ---- FORM HANDLERS ---- */
  const handleImageChange = (index: number, file: File) => {
    const updated = [...form.images];
    updated[index] = file;
    setForm({ ...form, images: updated });
  };

  const addMoreImageField = () => {
    setForm({ ...form, images: [...form.images, null] });
  };

  const removeImageField = (index: number) => {
    const updated = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updated });
  };

  /* ---- SUBMIT CREATE ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const csrfToken = await fetchCsrfToken(API_URL);

      const formData = new FormData();
      formData.append("title", form.title);

      form.images.forEach((img) => {
        if (img) formData.append("images[]", img);
      });

      const response = await fetch(`${API_URL}/api/photoes`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to add photos.");
        return;
      }

      setForm({ title: "", images: [] });
      await loadNews();
      router.refresh();
    } catch (error) {
      console.error("News submit error:", error);
      alert("Unable to add photos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- DELETE ---- */
  const deleteNews = async (id: number) => {
    if (!confirm("Delete this photo group?")) return;

    try {
      const csrfToken = await fetchCsrfToken(API_URL);
      const response = await fetch(`${API_URL}/api/photoes/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: authHeaders(csrfToken),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to delete.");
        return;
      }

      await loadNews();
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete.");
    }
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = newsList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  return (
    <main className="ml-60 w-full h-screen max-w-7xl p-6 text-gray-600">
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onLogout={() => {}} />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Photos Update</h1>

        {/* ----------------- CREATE FORM ------------------ */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 w-full max-w-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Add Photos</h2>

          <label className="block mb-2 text-sm font-medium">Photo Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2 text-sm font-medium">Images</label>

          {form.images.map((img, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">
              <input
                type="file"
                onChange={(e: any) =>
                  handleImageChange(index, e.target.files[0])
                }
                className="border p-1"
              />

              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMoreImageField}
            className="px-3 py-2 bg-green-600 text-white rounded-lg mt-2"
          >
            +  Add More
          </button>
          &nbsp;
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
        </form>

        {/* --------------- TABLE ---------------- */}
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      className="w-20 h-20 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td className="p-3">{item.title}</td>

                <td className="p-3 flex gap-3">
                  {/* <button
                    onClick={() => setEditItem(item)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button> */}

                  <button
                    onClick={() => deleteNews(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination */}

        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-md border
              ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border 
                ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-md border
              ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>

        {/* EDIT MODAL (Optional) */}
        {editItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Photo Group</h2>

              <p>Multi-image editing can be added later — just send me your backend.</p>

              <button
                className="mt-4 px-4 py-2 bg-gray-400 rounded text-white"
                onClick={() => setEditItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}
