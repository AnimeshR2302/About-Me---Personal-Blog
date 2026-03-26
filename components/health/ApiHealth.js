"use client";

import { useEffect, useState } from "react";

function getApiBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

export default function ApiHealth() {
  const [state, setState] = useState({
    label: "Checking API health",
    tone: "var(--muted)"
  });

  useEffect(() => {
    let active = true;

    async function checkHealth() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/healthz`);
        if (!response.ok) {
          throw new Error(`Health request failed with ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setState({
            label:
              data?.status === "ok"
                ? "API online and healthy"
                : "API responded with an unexpected payload",
            tone: data?.status === "ok" ? "var(--success)" : "var(--muted)"
          });
        }
      } catch (_error) {
        if (active) {
          setState({
            label: "API unavailable, frontend still works",
            tone: "var(--danger)"
          });
        }
      }
    }

    checkHealth();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="pill" aria-live="polite">
      <span
        className="status-dot"
        style={{
          background: state.tone,
          boxShadow: `0 0 12px ${state.tone}`
        }}
      />
      <span>{state.label}</span>
    </div>
  );
}
