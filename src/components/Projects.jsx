import { useScrollAnimation } from '../hooks/useScrollAnimation'

const projects = [
  {
    title: 'Projeto Alpha',
    description: 'Descrição curta do projeto. O que foi feito, qual problema resolve e as tecnologias utilizadas.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    href: 'https://example.com', // URL da demo — troque pelo seu site
    codeSnippets: [
      {
        filename: 'server.js',
        language: 'javascript',
        code: `import express from 'express'
import { db } from './database.js'

const app = express()
app.use(express.json())

app.get('/api/items', async (req, res) => {
  const items = await db.query('SELECT * FROM items')
  res.json(items.rows)
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))`,
      },
      {
        filename: 'App.jsx',
        language: 'jsx',
        code: `import { useEffect, useState } from 'react'

export default function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/items')
      .then(r => r.json())
      .then(setItems)
  }, [])

  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}`,
      },
    ],
  },
  {
    title: 'Projeto Beta',
    description: 'Descrição curta do projeto. O que foi feito, qual problema resolve e as tecnologias utilizadas.',
    tags: ['Python', 'FastAPI', 'Docker'],
    href: null, // sem demo pública
    codeSnippets: [
      {
        filename: 'main.py',
        language: 'python',
        code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.get("/items")
async def list_items():
    return [{"name": "Item A", "price": 10.0}]

@app.post("/items")
async def create_item(item: Item):
    return {"created": item}`,
      },
    ],
  },
  {
    title: 'Projeto Gamma',
    description: 'Descrição curta do projeto. O que foi feito, qual problema resolve e as tecnologias utilizadas.',
    tags: ['TypeScript', 'Next.js', 'Tailwind'],
    href: 'https://example.com',
    codeSnippets: [],
  },
  {
    title: 'Projeto Delta',
    description: 'Descrição curta do projeto. O que foi feito, qual problema resolve e as tecnologias utilizadas.',
    tags: ['React Native', 'Expo'],
    href: 'https://example.com',
    codeSnippets: [],
  },
]

function ProjectCard({ project, index, onOpenDemo, onOpenCode, onOpenCodePage }) {
  const ref = useScrollAnimation('fade-up', index * 0.07)
  const hasSnippets = project.codeSnippets?.length > 0

  return (
    <div
      ref={ref}
      className="group flex flex-col bg-white/2 border border-white/7 rounded-xl p-6 hover:bg-white/4 hover:border-white/15 transition-all duration-300"
    >
      <span className="text-xs text-white/20 font-mono mb-4">0{index + 1}</span>

      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm border-t border-white/5 pt-4">
        {project.href && (
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Demo
          </button>
        )}
        {hasSnippets && (
          <button
            onClick={onOpenCodePage}
            className="flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Código
          </button>
        )}
      </div>
    </div>
  )
}

export default function Projects({ onOpenCode, onOpenDemo }) {
  const titleRef = useScrollAnimation('fade-up', 0)

  return (
    <section id="projects" className="w-full min-h-screen py-40 bg-[#070707] flex flex-col items-center">
      <div className="w-full max-w-3xl py-30">

        <div ref={titleRef} className="mb-16 text-center">
          <p className="text-xs text-white/25 uppercase tracking-[0.2em] mb-30 h-10 mt-10">Portfólio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight h-20">Projetos em destaque</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenDemo={() => onOpenDemo?.(project)}
              onOpenCode={() => onOpenCode?.(project)}
              onOpenCodePage={() => onOpenCode?.(project)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
