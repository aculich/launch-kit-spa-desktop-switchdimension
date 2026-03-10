import { hc } from 'hono/client';
import type { AppType } from '@molten/api';

/** Same-origin when unset (Vite proxy in dev, or same host in prod). */
const apiBase = import.meta.env.VITE_API_URL ?? '';
export const api = hc<AppType>(apiBase);
