"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { FileSpreadsheet } from "lucide-react"; // Excel icon

/* -------------------- TYPES --------------------- */
type ReportItem = {
  id: number;
  title: string;
  file_url: string | null;
};

/* -------------------- HELPERS --------------------- */
const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
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
  if (!token) throw new Error("CSRF token missing.");
  return token;
};

const authHeaders = (token: string) => ({
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "X-XSRF-TOKEN": token,
});

/* ---------------------------------------------------- */

export default function ReportPage() {
  const API_URL = resolveApiUrl();
  const router = useRouter();

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- CREATE FORM STATE ---------- */
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  /* ---------- EDIT MODAL ---------- */
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  /* ---------- LOAD REPORTS ---------- */
  const loadReports = async () => {
    try {
      const res = await fetch(`${API_URL}/api/report`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data?.status) {
        setReports(data.data);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Report fetch error:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  /* ---------- CREATE REPORT ---------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const csrfToken = await fetchCsrfToken(API_URL);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("report_file", file);

      const res = await fetch(`${API_URL}/api/report`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data?.status) {
        alert("Report added!");
        setTitle("");
        setFile(null);
        loadReports();
        router.refresh();
      } else {
        alert(data?.message || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to upload.");
    }

    setIsSubmitting(false);
  };

  /* ---------- DELETE REPORT ---------- */
  const deleteReport = async (id: number) => {
    if (!confirm("Delete this report?")) return;

    try {
      const csrfToken = await fetchCsrfToken(API_URL);

      const res = await fetch(`${API_URL}/api/report/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: authHeaders(csrfToken),
      });

      const data = await res.json();

      if (res.ok && data?.status) {
        alert("Deleted!");
        loadReports();
        router.refresh();
      } else {
        alert(data?.message || "Unable to delete.");
      }
    } catch (error) {
      console.error(error);
      alert("Delete error.");
    }
  };

  /* ---------- UPDATE REPORT ---------- */
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    try {
      const csrfToken = await fetchCsrfToken(API_URL);

      const formData = new FormData();
      formData.append("title", editTitle);
      if (editFile) {
        formData.append("report_file", editFile);
      }

      const res = await fetch(`${API_URL}/api/report/${editId}`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data?.status) {
        alert("Updated!");
        setEditId(null);
        loadReports();
        router.refresh();
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={() => {}} />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Excel Reports</h1>

        {/* ---------------- CREATE FORM ---------------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 w-full max-w-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Report</h2>

          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium">
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".xls,.xlsx"
            className="w-full p-2 border rounded"
            onChange={(e: any) => setFile(e.target.files[0])}
            required
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isSubmitting ? "Uploading..." : "Submit"}
          </button>
        </form>

        {/* ---------------- TABLE ---------------- */}
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">{item.title}</td>

                <td className="p-3">
                    <FileSpreadsheet/>
                  {item.file_url ? (
                    <a
                      href={item.file_url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>

                <td className="p-3 flex gap-3 justify-center">
                  {/* <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditTitle(item.title);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button> */}

                  <button
                    onClick={() => deleteReport(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ---------- EDIT MODAL ---------- */}
        {editId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Report</h2>

              <form onSubmit={handleUpdate}>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <label className="block mt-4 mb-2">New File (Optional)</label>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  className="w-full p-2 border rounded"
                  onChange={(e: any) => setEditFile(e.target.files[0])}
                />

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
