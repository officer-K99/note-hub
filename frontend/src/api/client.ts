import queryClient from "../lib/queryClient";

const API_URL = import.meta.env.VITE_BASE_URL;

let refreshPromise: Promise<boolean> | null = null;

const refreshSession = (): Promise<boolean> => {
  refreshPromise ??= fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

export const apiFetch = async (
  path: string,
  init: RequestInit = {},
): Promise<Response> => {
  const request = () =>
    fetch(`${API_URL}${path}`, { ...init, credentials: "include" });

  const res = await request();
  if (res.status !== 401) return res;

  if (await refreshSession()) return request();

  queryClient.setQueryData(["me"], null);
  return res;
};
