import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeView({ project, onClose }) {
  const [visible, setVisible] = useState(false)
  const [snippetIndex, setSnippetIndex] = useState(0)
  const snippets = project.codeSnippets ?? []

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
          <span className="text-white/25 text-xs ml-2">— código fonte</span>
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

      {/* File tabs */}
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

      {/* Code */}
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
              fontSize: '14px',
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
    </section>
  )
}
