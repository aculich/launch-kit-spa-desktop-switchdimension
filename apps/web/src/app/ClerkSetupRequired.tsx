/**
 * Shown when Clerk is not configured (missing or placeholder publishable key).
 * Renders instead of the app so new users see clear setup instructions.
 */
export function ClerkSetupRequired() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <div className="max-w-md space-y-2">
        <h1 className="text-xl font-semibold text-foreground">
          Clerk not configured
        </h1>
        <p className="text-sm text-muted-foreground">
          This app uses Clerk for authentication. You only need the{' '}
          <strong>Publishable Key</strong> to get the app running. Add it to the{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> file in the
          project root (same folder as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">package.json</code>).
        </p>
      </div>
      <ol className="max-w-md list-inside list-decimal space-y-2 text-left text-sm text-muted-foreground">
        <li>
          Create a free account at{' '}
          <a
            href="https://clerk.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline hover:no-underline"
          >
            clerk.com
          </a>{' '}
          and create an application.
        </li>
        <li>
          In the Clerk Dashboard, go to <strong>API Keys</strong>. Copy the{' '}
          <strong>Publishable Key</strong> (starts with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">pk_test_</code>).
          You can ignore the Secret Key for now — it’s only needed later if you want the backend API to require sign-in.
        </li>
        <li>
          In the project root, copy <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.env.example</code> to{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.env</code> if you
          haven’t already.
        </li>
        <li>
          In <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.env</code>, set{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">VITE_CLERK_PUBLISHABLE_KEY</code> to your
          Publishable Key. Use no quotes: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx</code>.
        </li>
        <li>
          Stop the dev server (Ctrl+C), run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">npm run dev</code> again, then
          hard-refresh the browser (Cmd+Shift+R or Ctrl+Shift+R) or open the app in a new incognito window.
        </li>
      </ol>
      <div className="max-w-md space-y-1 rounded-md border border-border bg-muted/50 p-4 text-left text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Where is the Secret Key?</p>
        <p>
          On the same <strong>API Keys</strong> page in the Clerk Dashboard you’ll see a <strong>Secret Key</strong> (starts with{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">sk_test_</code>). It’s often hidden — look for a “Reveal” or “Show” button next to it.
          Only account <strong>Admins</strong> can reveal it. You only need it when you want the backend API (e.g. <code className="rounded bg-muted px-1 py-0.5 font-mono">/api/todos</code>) to require sign-in; set it as <code className="rounded bg-muted px-1 py-0.5 font-mono">CLERK_SECRET_KEY</code> in <code className="rounded bg-muted px-1 py-0.5 font-mono">.env</code>.
        </p>
      </div>
      <div className="max-w-md space-y-1 rounded-md border border-border bg-muted/50 p-4 text-left text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Still seeing this after adding the key?</p>
        <p>
          Restart the dev server, then open the browser <strong>Developer Tools</strong> (F12 or
          Cmd+Option+J) and go to the <strong>Console</strong> tab. Look for a log named{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">[Clerk config]</code> — it shows what
          value the app received and why it might still show this screen.
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        See the project README for more detail.
      </p>
    </div>
  );
}
