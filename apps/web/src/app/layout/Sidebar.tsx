import { UserButton, Show } from '@clerk/react';
import { Home, ListTodo, Settings } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/todos', label: 'Todos', icon: ListTodo },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <nav className="flex flex-col gap-0.5 p-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-sidebar-border p-3">
        <Show when="signed-out">
          <div className="flex flex-col gap-2">
            <Link to="/sign-in">
              <Button variant="outline" size="sm" className="w-full">
                Sign in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button size="sm" className="w-full">
                Sign up
              </Button>
            </Link>
          </div>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-sidebar-foreground/70">Account</span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'size-8',
                },
              }}
            />
          </div>
        </Show>
      </div>
    </aside>
  );
}
