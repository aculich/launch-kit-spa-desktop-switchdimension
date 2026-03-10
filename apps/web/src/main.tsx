import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import { App } from './App'
import { ClerkSetupRequired } from './app/ClerkSetupRequired'

const publishableKey = (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string) ?? '';

/** Treat missing or placeholder value as "Clerk not configured". */
const isClerkConfigured =
  publishableKey.length > 0 &&
  publishableKey !== 'pk_test_' &&
  publishableKey.startsWith('pk_');

if (import.meta.env.DEV) {
  const redacted =
    publishableKey.length === 0
      ? '(empty)'
      : `${publishableKey.slice(0, 10)}... (length ${publishableKey.length})`;
  console.log('[Clerk config] ' + JSON.stringify({
    keyPreview: redacted,
    length: publishableKey.length,
    notPlaceholder: publishableKey !== 'pk_test_',
    startsWithPk: publishableKey.startsWith('pk_'),
    isClerkConfigured,
  }));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isClerkConfigured ? (
      <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    ) : (
      <ClerkSetupRequired />
    )}
  </StrictMode>,
)
