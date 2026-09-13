import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { VENUE_LIST } from '../lib/venues';

const NAV_LINKS = [
  { to: '/', label: 'Domov' },
  ...VENUE_LIST.map((v) => ({ to: `/${v.slug}`, label: v.label })),
  { to: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-white" onClick={() => setOpen(false)}>
          <span className="rounded-lg bg-amber-500 px-2 py-1 text-[#0b0f14]">HARI</span>
          <span className="hidden text-sm font-medium text-white/60 sm:inline">Športcentrum</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-amber-400' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 cursor-pointer md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-2 md:hidden">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-white/10 text-amber-400' : 'text-white/70 hover:bg-white/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
