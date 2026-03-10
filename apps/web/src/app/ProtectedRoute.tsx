import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/react';
import { Link, Navigate, useLocation } from 'react-router-dom';

const LOAD_TIMEOUT_MS = 6000;

type ProtectedRouteProps = {
  children: React.ReactNode;
};

/**
 * Wraps content that requires authentication. Redirects to /sign-in when not signed in.
 * If Clerk doesn't load within a timeout, shows a helpful message (e.g. keys not set).
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    const t = setTimeout(() => setLoadTimedOut(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [isLoaded]);

  if (!isLoaded) {
    if (loadTimedOut) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
          <h2 className="text-lg font-medium text-foreground">
            Authentication is taking longer than expected
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            If you haven’t set up Clerk yet, add{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              VITE_CLERK_PUBLISHABLE_KEY
            </code>{' '}
            to your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> file (see
            README). Restart the dev server and try again.
          </p>
          <div className="flex gap-3">
            <Link
              to="/sign-in"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Go to sign-in
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
