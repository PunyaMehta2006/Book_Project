const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

// ── Books ─────────────────────────────────────────────
export const getBooks = (params = {}) => {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v))
  ).toString();
  return request(`/books${query ? `?${query}` : ""}`);
};

export const getBook = (id) => request(`/books/${id}`);

export const createBook = (body) =>
  request("/books", { method: "POST", body: JSON.stringify(body) });

export const updateBook = (id, body) =>
  request(`/books/${id}`, { method: "PUT", body: JSON.stringify(body) });

export const deleteBook = (id) =>
  request(`/books/${id}`, { method: "DELETE" });

export const updateExchange = (id, body) =>
  request(`/books/${id}/exchange`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

// ── Reviews ───────────────────────────────────────────
export const getReviews = (bookId) => request(`/reviews/${bookId}`);

export const createReview = (bookId, body) =>
  request(`/reviews/${bookId}`, { method: "POST", body: JSON.stringify(body) });
