/**
 * frontend/lib/api.js
 *
 * Axios client pre-configured for the ToolVerse backend API.
 * Used for dynamic features (user history, saved tools, Phase 2 auth).
 *
 * NOTE: Tool pages use static generation from data/tools.js for SEO.
 * This client is for runtime/client-side fetches only.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}

// ─── Tool Registry API ────────────────────────────────────────────────────────

export async function fetchAllTools(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/tools${qs ? `?${qs}` : ''}`);
}

export async function fetchToolBySlug(slug) {
  return apiFetch(`/tools/${slug}`);
}

// ─── Health API ───────────────────────────────────────────────────────────────

export async function checkHealth() {
  return apiFetch('/health');
}
