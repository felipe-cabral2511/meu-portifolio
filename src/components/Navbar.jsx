import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#about' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Contato', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'dark:bg-[#0a0a0a]/95 bg-white/95 backdrop-blur-sm dark:border-white/5 border-slate-200/80 border-b'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 h-16 flex items-center justify-center gap-40">
        <span className="text-sm font-medium dark:text-white/90 text-slate-800 tracking-tight">
          <span className="dark:text-white/30 text-slate-400">{`<`}</span>
          Felipe.Cabral.de.Aquino
          <span className="dark:text-white/30 text-slate-400">{`/>`}</span>
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm dark:text-white/40 text-slate-500 dark:hover:text-white/90 hover:text-slate-900 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-lg dark:border-white/10 border-slate-200 border dark:bg-white/3 bg-slate-100 dark:text-white/40 text-slate-500 dark:hover:text-white/80 hover:text-slate-800 dark:hover:border-white/20 hover:border-slate-300 transition-all duration-200"
            aria-label="Trocar tema"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px dark:bg-white/50 bg-slate-500 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.75' : ''}`} />
            <span className={`block w-5 h-px dark:bg-white/50 bg-slate-500 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px dark:bg-white/50 bg-slate-500 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.75' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t dark:border-white/5 border-slate-200 dark:bg-[#0a0a0a]/98 bg-white px-6 py-5 flex flex-col gap-5">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm dark:text-white/50 text-slate-500 dark:hover:text-white hover:text-slate-900 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
