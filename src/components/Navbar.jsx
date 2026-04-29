import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const atTop = y < 60
      setScrolled(!atTop)
      // Mostra ao subir ou no topo; esconde ao descer
      if (atTop || y < lastY.current) {
        setVisible(true)
      } else {
        setVisible(false)
        setMenuOpen(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#about' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Contato', href: '#contact' },
  ]

  return (
    // Wrapper posicionado — a box flutua dentro dele
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
      <div
        className={`
          pointer-events-auto w-full max-w-3xl
          transition-all duration-300 ease-in-out
          ${visible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
          }
          ${scrolled
            ? 'rounded-3xl dark:bg-[#1f2124]/90 bg-white/90 backdrop-blur-md dark:border-white/8 border-slate-200 border shadow-lg shadow-black/10'
            : 'bg-transparent'
          }
        `}
      >
        <div className="px-5 h-14 flex items-center gap-6">
          {/* Logo */}
          <span className="text-sm font-medium dark:text-white/90 text-slate-800 tracking-tight shrink-0">
            <span className="dark:text-white/30 text-slate-400">{`<`}</span>
            Felipe Cabral de Aquino
            <span className="dark:text-white/30 text-slate-400">{`/>`}</span>
          </span>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
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

          {/* Ações */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-lg dark:border-white/10
               border-slate-200 border dark:bg-white/3 bg-slate-100 dark:text-white/40 text-slate-500
                dark:hover:text-white/80 hover:text-slate-800 dark:hover:border-white/20 hover:border-slate-300 transition-all duration-200"
              aria-label="Trocar tema"
            >
              {isDark ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden border-t dark:border-white/5 border-slate-200 px-5 py-4 flex flex-col gap-4">
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
      </div>
    </div>
  )
}
