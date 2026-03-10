/**
 * Displays API/setup errors in the UI so users don't have to rely on the console.
 * Provides short guidance for common failures (401 → Clerk, 500 → DB/API).
 */
type ApiErrorBannerProps = {
  status: number | null;
  message?: string;
  onDismiss?: () => void;
};

function getGuidance(status: number): string {
  switch (status) {
    case 401:
      return 'Add CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY to the root .env and restart the API.';
    case 500:
      return 'Check that DATABASE_URL is set and the database is running; see README → Troubleshooting.';
    case 502:
    case 503:
      return 'The API may be starting or unavailable. Restart with npm run dev and try again.';
    default:
      return 'See the project README for setup and troubleshooting.';
  }
}

export function ApiErrorBanner({ status, message, onDismiss }: ApiErrorBannerProps) {
  const guidance = status !== null ? getGuidance(status) : message ?? 'Something went wrong.';
  const title = status === 401 ? 'Sign-in required' : status !== null ? `Request failed (${status})` : 'Error';

  return (
    <div
      className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-foreground"
      role="alert"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="font-medium">{title}</p>
          <p className="text-muted-foreground">{guidance}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
