import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import CodeView from './CodeView'
import DemoView from './DemoView'

const projects = [
  {
    title: 'Serviço de Streaming',
    description: 'Diretório Privado, projeto feito para faculdade afim de estudar APIs públicas e Banco de Dados',
    tags: ['React+Vite', 'Node.js', 'Tailwind', 'MongoDB', ''],
    href: 'http://meu-streaming-anime.vercel.app/', // URL da demo 
    codeSnippets: [
      {
        filename: 'server.js',
        language: 'javascript',
        code: `import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import mongoose from 'mongoose';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conecta ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Schema do episódio
const episodioSchema = new mongoose.Schema({
  animeId: { type: String, required: true },
  episodeNum: { type: String, required: true },
  driveId: { type: String, required: true },
});
episodioSchema.index({ animeId: 1, episodeNum: 1 }, { unique: true });

const Episodio = mongoose.model('Episodio', episodioSchema);

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://meu-streaming-anime.vercel.app'
  ]
}));
app.use(express.json());

// Salva ou atualiza um episódio
app.post('/salvar-episodio', async (req, res) => {
  const { animeId, episodeNum, driveId } = req.body;

  try {
    await Episodio.findOneAndUpdate(
      { animeId, episodeNum },
      { driveId },
      { upsert: true }
    );
    res.json({ message: 'Episódio salvo com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar episódio.' });
  }
});

// Busca o driveId de um episódio específico
app.get('/episodio/:animeId/:episodeNum', async (req, res) => {
  const { animeId, episodeNum } = req.params;

  try {
    const episodio = await Episodio.findOne({ animeId, episodeNum });
    res.json({ driveId: episodio?.driveId || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar episódio.' });
  }
});

// Proxy de streaming do Google Drive (sem API)
app.get('/stream/:driveId', async (req, res) => {
  const { driveId } = req.params;
  const url = 'https://drive.usercontent.google.com/download?id=&export=download&authuser=0&confirm=t';

  try {
    const headers = { 'User-Agent': 'Mozilla/5.0' };
    if (req.headers.range) headers['Range'] = req.headers.range;

    const response = await fetch(url, { headers });

    res.setHeader('Content-Type', response.headers.get('content-type') || 'video/mp4');
    res.setHeader('Accept-Ranges', 'bytes');

    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');
    if (contentLength) res.setHeader('Content-Length', contentLength);
    if (contentRange) res.setHeader('Content-Range', contentRange);

    res.status(response.status);
    Readable.fromWeb(response.body).pipe(res);
  } catch (err) {
    console.error('Erro no stream:', err);
    res.status(500).send('Erro ao carregar vídeo');
  }
});

// Login admin
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || '12345';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true, token: 'admin-autenticado' });
  } else {
    res.status(401).json({ success: false, message: 'Usuário ou senha incorretos!' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta');
});
`,
      },
      {
        filename: 'Home.jsx',
        language: 'jsx',
        code: `import React, { useEffect, useState } from 'react';
import AnimeCarousel from '../components/AnimeCarousel';

const Home = () => {
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const seasonResponse = await fetch('https://api.jikan.moe/v4/seasons/now?limit=15');
        if (seasonResponse.ok) {
          const seasonData = await seasonResponse.json();
          setSeasonAnimes(seasonData.data);
        }

            await delay(1000);
            
            const topResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=15');
        if (topResponse.ok) {
          const topData = await topResponse.json();
          setTopAnimes(topData.data);
        }


        const topData = await topResponse.json();
        const seasonData = await seasonResponse.json();

        setTopAnimes(topData.data);
        setSeasonAnimes(seasonData.data);
      } catch (error) {
        console.error("Erro ao buscar os animes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  return (
    <div className="pt-24 pb-10 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Explore o <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Catálogo</span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">Os melhores animes da temporada em Full HD.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-opacity-75"></div>
        </div>
      ) : (
        <>
          <AnimeCarousel title="Lançamentos da Temporada" animes={seasonAnimes} />
          <AnimeCarousel title="Mais Populares" animes={topAnimes} />
        </>
      )}
    </div>
  );
};

export default Home;`,
      },
      {
        filename: 'Watch.jsx',
        language: 'jsx',
        code: `import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const Watch = () => {
  const { episodeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const animeId = searchParams.get('animeId')
   const [videoData, setVideoData] = useState({ url: null });
  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    // 1. Busca informações completas do anime na Jikan
    fetch(https://api.jikan.moe/v4/anime/{animeId})
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setAnimeData(data.data);
        }
      })
      .catch(err => console.error("Erro ao buscar Jikan:", err));

    // 2. Busca o episódio diretamente do servidor (sempre atualizado)
    fetch({import.meta.env.VITE_API_URL}/episodio/{animeId}/{episodeId})
      .then(res => res.json())
      .then(data => {
        if (data.driveId) {
          setVideoData({ url: {import.meta.env.VITE_API_URL}/stream/{data.driveId} });
        } else {
          setVideoData({ url: null });
        }
      })
      .catch(err => {
        console.error("Erro ao buscar episódio:", err);
        setVideoData({ url: null, isDrive: false });
      });
  }, [animeId, episodeId]);

  // Transformamos o episodeId da URL (que é string) em número para fazer os cálculos
  const currentEp = parseInt(episodeId);
  
  // Pegamos o total de episódios.
  // Nesse caso, usamos Infinity para não bloquear o botão de animes que ainda estão a lançar.
  const totalEpisodes = animeData?.episodes || Infinity; 
  
  // Lógica de desativação: É o último episódio se o atual for maior ou igual ao total
  const isLastEpisode = currentEp >= totalEpisodes;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* BOTÃO VOLTAR */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-orange-500 font-bold bg-orange-500/10 px-4 py-2 rounded-lg hover:bg-orange-500/20 transition-all border border-orange-500/20"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Voltar
        </button>

        {/* ÁREA DO VÍDEO */}
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          {videoData.url ? (
            <VideoPlayer videoSource={videoData.url} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-900">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <p className="text-lg font-medium text-gray-400">Episódio indisponível no servidor.</p>
              <p className="text-sm mt-2 text-gray-600">Utilize o Painel Admin para adicionar o link do Google Drive.</p>
            </div>
          )}
        </div>

        {/* INFORMAÇÕES DO ANIME E NAVEGAÇÃO ENTRE EPISÓDIOS */}
        <div className="mt-8 p-6 bg-gray-900 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-white">{animeData?.title || "Carregando..."}</h1>
            <p className="text-orange-500 font-bold mt-1 text-lg">Episódio {currentEp}</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => { window.location.href = /watch/{currentEp - 1}?animeId={animeId}; }}
              disabled={currentEp <= 1}
              className="flex-1 md:flex-none bg-gray-800 px-8 py-3 rounded-xl text-white font-bold disabled:opacity-20 transition-all hover:bg-gray-700"
            >
              Anterior
            </button>

            <button
              onClick={() => { window.location.href = "/watch/{currentEp + 1}?animeId={animeId}"; }}
              disabled={isLastEpisode}
              className={flex-1 md:flex-none px-8 py-3 rounded-xl font-black transition-all {
                isLastEpisode 
                  ? 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed' 
                  : 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600'
              }}
            >
              Próximo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Watch;`

      
      }

    ],
  },
  {
    title: 'Projeto Beta',
    description: 'Descrição curta do projeto. O que foi feito, qual problema resolve e as tecnologias utilizadas.',
    tags: ['Python', 'FastAPI', 'Docker'],
    href: 'https://example.com', // sem demo pública
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
    codeSnippets: [
      {
        filename: 'server.js',
        language: 'javascript',
        code:''}
      ],
  },
  {
    title: 'Projeto Delta',
    description: 'Descrição curta do projeto. O que foi feito, qual problema resolve e as tecnologias utilizadas.',
    tags: ['React Native', 'Expo'],
    href: 'https://example.com',
    codeSnippets: [
      {
        filename: 'server.js',
        language: 'javascript',
        code:''}
    ],
  },
]

function ProjectCard({ project, index, onOpenDemo, onOpenCode, onOpenCodePage }) {
  const ref = useScrollAnimation('fade-up', index * 0.07)
  const hasSnippets = project.codeSnippets?.length > 0

  return (
    <div
      ref={ref}
      className="group flex flex-col bg-white/2 border border-white/7 rounded-xl hover:bg-blue-950/20 hover:border-blue-500/25 transition-all duration-300"
    >
      <span className="text-xs text-white/20 font-mono">0{index + 1}</span>

      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-white/90 transition-colors ">
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
            className="flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors "
          >
            <svg className="w-5.5 h-3.5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <svg className="w-5.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Código
          </button>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const titleRef = useScrollAnimation('fade-up', 0)
  const [codeProject, setCodeProject] = useState(null)
  const [demoProject, setDemoProject] = useState(null)

  return (
    <section id="projects" className="w-full bg-[#070707] flex flex-col items-center px-6" style={{ paddingTop: '160px', paddingBottom: '220px' }}>
      <div className="w-full max-w-3xl">

        <div ref={titleRef} className="mb-16 text-center">
          <p className="text-xs text-white/25 uppercase tracking-[0.2em] mb-4">Portfólio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Projetos em destaque</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenDemo={() => { setDemoProject(project); setCodeProject(null) }}
              onOpenCode={() => { setCodeProject(project); setDemoProject(null) }}
              onOpenCodePage={() => { setCodeProject(project); setDemoProject(null) }}
            />
          ))}
        </div>

        {codeProject && (
          <div className="mt-6">
            <CodeView project={codeProject} onClose={() => setCodeProject(null)} inline />
          </div>
        )}

        {demoProject && (
          <div className="mt-6">
            <DemoView project={demoProject} onClose={() => setDemoProject(null)} inline />
          </div>
        )}

      </div>
    </section>
  )
}
