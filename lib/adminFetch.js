// admin pages ke liye fetch helper (browser side)
export async function api(url, options = {}) {
  const isForm = options.body instanceof FormData;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body && !isForm ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Request failed");
    err.fields = data.fields;
    throw err;
  }
  return data;
}