import { useMemo } from 'react';
import { useAuth } from '@clerk/react';
import { createApiClient, type ApiClient } from './api-client';

/**
 * Returns an API client that sends the current Clerk session JWT in the Authorization header.
 * Use this hook in components that need to call protected API routes.
 */
export function useApi(): ApiClient {
  const { getToken } = useAuth();

  return useMemo(
    () =>
      createApiClient(async (input, init) => {
        const token = await getToken();
        const headers = new Headers(init?.headers);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return fetch(input, { ...init, headers });
      }),
    [getToken]
  );
}
