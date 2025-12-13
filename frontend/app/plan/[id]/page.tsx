"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "../../components/Footer";

type Plan = {
  id: number;
  title: string;
  image_url: string | null;
  description: string;
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

export default function PlanDetails() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = resolveApiUrl();

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function fetchPlan() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/plan/${id}`, {
          signal: controller.signal,
        });
        const payload = await response.json();

        if (!response.ok || !payload?.status) {
          throw new Error(payload?.message || "Unable to load plan details.");
        }

        setPlan(payload.data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Error fetching plan:", err);
        setError(err.message || "Unable to fetch plan. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlan();

    return () => controller.abort();
  }, [API_URL, id]);

  if (!id) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-600">Invalid plan id.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p>Loading plan details...</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-600">{error || "Plan not found."}</p>
      </div>
    );
  }

  return (
    <>
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{plan.title}</h1>
      {plan.image_url && (
        <img
          src={plan.image_url}
          className="w-full h-64 object-cover mb-4 rounded-lg"
          alt={plan.title}
        />
      )}
      <p className="text-lg leading-relaxed whitespace-pre-line">{plan.description}</p>
    </div>
    <Footer/>
    </>
  );
}

