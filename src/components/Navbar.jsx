import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-sm font-medium text-white/90 tracking-tight">
          <span className="text-white/30">{`<`}</span>
          seu.nome
          <span className="text-white/30">{`/>`}</span>
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/40 hover:text-white/90 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-white/50 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.75' : ''}`} />
          <span className={`block w-5 h-px bg-white/50 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white/50 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.75' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0a]/98 px-6 py-5 flex flex-col gap-5">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
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
