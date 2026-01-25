"use client";

import axios from "axios";

axios.defaults.withCredentials = true;

const API = "http://127.0.0.1:8000";

export async function login(email, password) {
  try {
    // Get CSRF cookie from Laravel
    await axios.get(`${API}/sanctum/csrf-cookie`);

    // Send login request
    const res = await axios.post(
      `${API}/api/login`,
      { email, password },
      { withCredentials: true }
    );

    return res.data;
  } catch (err) {
    console.log("Login error:", err.response?.data);
    throw err;
  }
}
