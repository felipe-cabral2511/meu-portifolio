import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ProjectModal({ project, onClose }) {
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState(project.href ? 'demo' : 'code')
  const [snippetIndex, setSnippetIndex] = useState(0)
  const hasDemo = !!project.href
  const snippets = project.codeSnippets?.filter(s => s.code) ?? []
  const hasCode = snippets.length > 0

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.28s ease' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 dark:bg-black/75 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-5xl h-full max-h-[88vh] flex flex-col rounded-2xl overflow-hidden dark:bg-[#0f0f0f] bg-white dark:border-white/8 border-slate-200 border shadow-2xl"
        style={{
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
          transition: 'transform 0.28s ease',
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 px-6 py-5 dark:border-white/7 border-slate-100 border-b shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold dark:text-white text-slate-900">{project.title}</h2>
            <p className="text-sm dark:text-white/40 text-slate-500 mt-1 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.filter(Boolean).map(tag => (
                <span key={tag} className="text-xs dark:text-white/30 text-slate-500 dark:bg-white/5 bg-slate-100 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg dark:text-white/30 text-slate-400 dark:hover:text-white/70 hover:text-slate-700 dark:hover:bg-white/5 hover:bg-slate-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        {(hasDemo || hasCode) && (
          <div className="flex gap-0 px-6 dark:border-white/7 border-slate-100 border-b shrink-0">
            {hasDemo && (
              <button
                onClick={() => setTab('demo')}
                className={`px-5 py-3 text-xs font-medium border-b-2 -mb-px transition-all ${
                  tab === 'demo'
                    ? 'dark:text-white text-slate-900 border-blue-500'
                    : 'dark:text-white/35 text-slate-400 border-transparent dark:hover:text-white/60 hover:text-slate-600'
                }`}
              >
                Demo
              </button>
            )}
            {hasCode && (
              <button
                onClick={() => setTab('code')}
                className={`px-5 py-3 text-xs font-medium border-b-2 -mb-px transition-all ${
                  tab === 'code'
                    ? 'dark:text-white text-slate-900 border-blue-500'
                    : 'dark:text-white/35 text-slate-400 border-transparent dark:hover:text-white/60 hover:text-slate-600'
                }`}
              >
                Código
              </button>
            )}
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 overflow-hidden">

          {/* Demo */}
          {tab === 'demo' && hasDemo && (
            <div className="flex flex-col h-full">
              <iframe
                src={project.href}
                title={`Demo — ${project.title}`}
                className="flex-1 w-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
              <div className="px-4 py-2 dark:border-white/7 border-slate-100 border-t flex items-center gap-3 shrink-0">
                <span className="text-xs dark:text-white/20 text-slate-400 truncate flex-1">{project.href}</span>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs dark:text-white/35 text-slate-500 dark:hover:text-white/70 hover:text-slate-800 transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  Abrir em nova aba
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Código */}
          {tab === 'code' && (
            <div className="flex flex-col h-full bg-[#0d0d0d]">
              {snippets.length > 1 && (
                <div className="flex gap-1 px-6 pt-3 pb-2 border-b border-white/5 overflow-x-auto shrink-0">
                  {snippets.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSnippetIndex(i)}
                      className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors ${
                        snippetIndex === i ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/60'
                      }`}
                    >
                      {s.filename}
                    </button>
                  ))}
                </div>
              )}
              {snippets.length === 1 && (
                <div className="px-6 py-2 border-b border-white/5 shrink-0">
                  <span className="text-xs text-white/25 font-mono">{snippets[0].filename}</span>
                </div>
              )}
              <div className="flex-1 overflow-auto">
                {snippets.length > 0 ? (
                  <SyntaxHighlighter
                    language={snippets[snippetIndex]?.language ?? 'javascript'}
                    style={oneDark}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: 'transparent',
                      fontSize: '13px',
                      lineHeight: '1.7',
                      padding: '24px 32px',
                      minHeight: '100%',
                    }}
                  >
                    {snippets[snippetIndex]?.code ?? ''}
                  </SyntaxHighlighter>
                ) : (
                  <div className="flex items-center justify-center h-64 text-white/25 text-sm">
                    Nenhum trecho de código adicionado.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
