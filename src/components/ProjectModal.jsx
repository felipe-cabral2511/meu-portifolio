import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ProjectModal({ project, initialTab, onClose }) {
  const [tab, setTab] = useState(initialTab ?? (project.href ? 'demo' : 'code'))
  const [snippetIndex, setSnippetIndex] = useState(0)

  // Fecha com ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const snippets = project.codeSnippets ?? []
  const hasTabs = project.href && snippets.length > 0

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Painel */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
          <div>
            <h3 className="text-white font-semibold">{project.title}</h3>
            <p className="text-xs text-white/35 mt-0.5">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors ml-4"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs — só aparece se tiver os dois */}
        {hasTabs && (
          <div className="flex border-b border-white/8 shrink-0">
            <button
              onClick={() => setTab('demo')}
              className={`px-6 py-3 text-sm transition-colors ${tab === 'demo' ? 'text-white border-b-2 border-white' : 'text-white/35 hover:text-white/60'}`}
            >
              Demo
            </button>
            <button
              onClick={() => setTab('code')}
              className={`px-6 py-3 text-sm transition-colors ${tab === 'code' ? 'text-white border-b-2 border-white' : 'text-white/35 hover:text-white/60'}`}
            >
              Código
            </button>
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 overflow-hidden">

          {/* Aba Demo */}
          {tab === 'demo' && project.href && (
            <div className="h-full flex flex-col">
              <iframe
                src={project.href}
                title={`Demo — ${project.title}`}
                className="w-full flex-1 min-h-125 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
              <div className="px-4 py-2 border-t border-white/8 flex items-center gap-3 shrink-0">
                <span className="text-xs text-white/25 truncate flex-1">{project.href}</span>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 hover:text-white/70 transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  Abrir em nova aba
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Aba Código */}
          {tab === 'code' && snippets.length > 0 && (
            <div className="flex flex-col h-full">
              {/* Seletor de arquivos */}
              {snippets.length > 1 && (
                <div className="flex gap-1 px-4 pt-3 overflow-x-auto shrink-0">
                  {snippets.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSnippetIndex(i)}
                      className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors ${
                        snippetIndex === i
                          ? 'bg-white/10 text-white'
                          : 'text-white/35 hover:text-white/60'
                      }`}
                    >
                      {s.filename}
                    </button>
                  ))}
                </div>
              )}

              {/* Código */}
              <div className="flex-1 overflow-auto">
                <SyntaxHighlighter
                  language={snippets[snippetIndex]?.language ?? 'javascript'}
                  style={oneDark}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: 'transparent',
                    fontSize: '13px',
                    padding: '20px 24px',
                  }}
                >
                  {snippets[snippetIndex]?.code ?? ''}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {/* Se só tiver demo mas tab for code sem snippets */}
          {tab === 'code' && snippets.length === 0 && (
            <div className="flex items-center justify-center h-48 text-white/25 text-sm">
              Nenhum trecho de código adicionado ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
