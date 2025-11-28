"use client";

import axios from "axios";

axios.defaults.withCredentials = true;

const API = "http://127.0.0.1:8000";

export async function login(email, password) {
  try {
    await axios.get(`${API}/sanctum/csrf-cookie`, {
      withCredentials: true
    });

    const response = await axios.post(
      `${API}/login`,
      { email, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (e) {
    console.log(e.response?.data);
    throw e;
  }
}
