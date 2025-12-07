"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import {getCookie} from "../../../../utils/getCookie";

type NewsItem = {
  id: number;
  heading: string;
  news: string;
  image_url?: string | null;
  image?: File | null;
};

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
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

  // console.log('app_url_is',API_URL);

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [form, setForm] = useState({
    heading: "",
    news: "",
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
      const response = await fetch(`${API_URL}/api/news`, {
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
      // const csrfToken = await fetchCsrfToken(API_URL);
  
      const formData = new FormData();
      formData.append("heading", form.heading);
      formData.append("news", form.news);
      if (form.image) formData.append("image", form.image);

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });
  
      // STEP 2: Read the XSRF token
      const xsrf = getCookie("XSRF-TOKEN");
      const decodedToken = xsrf ? decodeURIComponent(xsrf) : "";
  
      // const response = await fetch(`${API_URL}/api/news`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: authHeaders(csrfToken),
      //   body: formData,
      // });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodedToken,
        },
        body: formData,
      });
  
      const payload = await response.json();
  
      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to add news.");
        return;
      }
  
      setForm({ heading: "", news: "", image: null });
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
      const response = await fetch(`${API_URL}/api/news/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: authHeaders(csrfToken),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to delete news. Please try again.");
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
    formData.append("heading", editItem.heading);
    formData.append("news", editItem.news);
    if (editItem.image instanceof File) {
      formData.append("image", editItem.image);
    }

    try {
      const csrfToken = await fetchCsrfToken(API_URL);
      const response = await fetch(`${API_URL}/api/news/${editItem.id}/update`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload?.status) {
        alert(payload?.message || "Unable to update news. Please try again.");
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

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">News Update</h1>

        {/* ---------------- FORM ---------------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 w-full max-w-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Add News</h2>

          <label className="block mb-2 text-sm font-medium">News Title</label>
          <input
            type="text"
            name="heading"
            value={form.heading}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium">News Description</label>
          <textarea
            name="news"
            value={form.news}
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
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">News</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {newsList.map((item) => (
                
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  {item.image_url ? (
                    <img src={item.image_url} className="w-20 h-20 object-cover" />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td className="p-3">{item.heading}</td>
                <td className="p-3">{item.news}</td>

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

        {/* ---------------- EDIT MODAL ---------------- */}
        {editItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">

              <h2 className="text-xl font-semibold mb-4">Edit News</h2>

              <label className="block mb-2">News Title</label>
              <input
                type="text"
                value={editItem.heading}
                onChange={(e) =>
                  setEditItem({ ...editItem, heading: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <label className="block mt-4 mb-2">News Description</label>
              <textarea
                value={editItem.news}
                onChange={(e) =>
                  setEditItem({ ...editItem, news: e.target.value })
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
  );
}
