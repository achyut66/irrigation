"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  image?: File | null;
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
    throw new Error("CSRF token not found. Make sure backend and frontend share the same domain.");
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
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  // For Edit Modal
  const [editItem, setEditItem] = useState<NewsItem | (NewsItem & { image?: File }) | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** -----------------------------------------
   * LOGOUT HANDLER
   ------------------------------------------*/
  const handleLogout = async () => {
    await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.replace("/admin-access");
  };

  /** -----------------------------------------
   * Fetch all News
   ------------------------------------------*/
  const loadNews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/rule`, {
        credentials: "include",
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        console.error("Unable to load news:", payload);
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

  /** -----------------------------------------
   * FORM CHANGE HANDLER
   ------------------------------------------*/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  /** -----------------------------------------
   * SUBMIT CREATE NEWS
   ------------------------------------------*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    try {
      const csrfToken = await fetchCsrfToken(API_URL);
  
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);
  
      const response = await fetch(`${API_URL}/api/rule`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: formData,
      });
  
      const payload = await response.json();
  
      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to add news.");
        return;
      }
  
      setForm({ title: "", description: "", image: null });
      await loadNews();
      router.refresh();
    } catch (error) {
      console.error("News submit error:", error);
      alert("Unable to add news.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /** -----------------------------------------
   * DELETE NEWS
   ------------------------------------------*/
  const deleteNews = async (id: number) => {
    if (!confirm("Delete this news?")) return;

    try {
      const csrfToken = await fetchCsrfToken(API_URL);
      const response = await fetch(`${API_URL}/api/rule/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: authHeaders(csrfToken),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to delete highlight. Please try again.");
        return;
      }

      await loadNews();
      router.refresh();
    } catch (error) {
      console.error("News delete error:", error);
      alert("Unable to delete this news right now.");
    }
  };

  /** -----------------------------------------
   * EDIT NEWS SUBMIT
   ------------------------------------------*/
  const handleEditSubmit = async () => {
    if (!editItem || isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", editItem.title);
    formData.append("description", editItem.description);
    if (editItem.image instanceof File) {
      formData.append("image", editItem.image);
    }

    try {
      const csrfToken = await fetchCsrfToken(API_URL);
      const response = await fetch(`${API_URL}/api/rule/${editItem.id}/update`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to update rules. Please try again.");
        return;
      }

      setEditItem(null);
      await loadNews();
      router.refresh();
    } catch (error) {
      console.error("News update error:", error);
      alert("Unable to update this news right now.");
    } finally {
      setIsSubmitting(false);
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
    <main className="ml-60 w-full h-screen max-w-7xl p-6">
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">Laws An Rules</h1>

        {/* ---------------- FORM ---------------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 w-full max-w-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Add Laws</h2>

          <label className="block mb-2 text-sm font-medium">Laws/Rules Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium">Laws/Rules Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium">Image</label>
          <input type="file" onChange={handleImageChange} />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
        </form>

        {/* ---------------- TABLE ---------------- */}
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
            <tr>
            <th className="p-3 text-left">#</th>  {/* index column */}
            <th className="p-3 text-left">Laws Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3">Actions</th>
            </tr>
        </thead>

        <tbody>
            {currentItems.map((item, index) => (
            <tr key={item.id} className="border-t">

                {/* Index number */}
                <td className="p-3 font-semibold">{index + 1}</td>

                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.description}</td>

                <td className="p-3 flex gap-3">
                <button
                    onClick={() => setEditItem({ ...item, image: null })}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                    Edit
                </button>

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


        {/* ---------------- EDIT MODAL ---------------- */}
        {editItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">

              <h2 className="text-xl font-semibold mb-4">Edit Laws/Rules</h2>

              <label className="block mb-2">Laws/News Title</label>
              <input
                type="text"
                value={editItem.title}
                onChange={(e) =>
                  setEditItem({ ...editItem, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <label className="block mt-4 mb-2">Laws/Rules Description</label>
              <textarea
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows={4}
              />

              <label className="block mt-4 mb-2">Replace Image</label>
              <input
                type="file"
                onChange={(e: any) =>
                  setEditItem({ ...editItem, image: e.target.files[0] })
                }
              />

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 bg-gray-400 rounded text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-blue-600 rounded text-white"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
    </main>
  );
}
