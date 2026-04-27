import { useState, useEffect } from 'react'

export default function DemoView({ project, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '96px', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}
    >
      <div className="w-full max-w-4xl flex flex-col border border-white/8 rounded-2xl overflow-hidden bg-[#0d0d0d]" style={{ height: 'calc(100vh - 64px - 136px - 32px)' }}>

        {/* Topbar */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/8 shrink-0">
          <div className="flex-1 min-w-0">
            <span className="text-white/70 text-sm font-medium">{project.title}</span>
            <span className="text-white/25 text-xs ml-2">— demonstração</span>
          </div>

          <div className="flex gap-1.5 flex-wrap justify-end">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs text-white/25 bg-white/5 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="ml-2 text-white/30 hover:text-white/70 transition-colors shrink-0"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={project.href}
            title={`Demo — ${project.title}`}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        {/* Footer bar */}
        <div className="px-4 py-2 border-t border-white/8 flex items-center gap-3 shrink-0">
          <span className="text-xs text-white/20 truncate flex-1">{project.href}</span>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/35 hover:text-white/65 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            Abrir em nova aba
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
