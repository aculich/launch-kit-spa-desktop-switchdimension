import { hc } from 'hono/client';
import type { AppType } from '@launch-kit-spa-desktop-switchdimension/api';

/** Same-origin when unset (Vite proxy in dev, or same host in prod). */
const apiBase = import.meta.env.VITE_API_URL ?? '';
export const api = hc<AppType>(apiBase);

/** Type of the API client (for use with useApi()). */
export type ApiClient = typeof api;

/**
 * Creates an API client that uses the given fetch function (e.g. to add auth headers).
 * Use this for typed authenticated clients; see useApi().
 */
export function createApiClient(
  fetchFn: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response>
): ApiClient {
  return hc<AppType>(apiBase, { fetch: fetchFn }) as ApiClient;
}
