import { useScrollAnimation } from '../hooks/useScrollAnimation'
import NeuralBackground from './NeuralBackground'

export default function Hero() {
  const photoRef = useScrollAnimation('fade-up', 0)
  const textRef  = useScrollAnimation('fade-up', 0.1)
  const btnsRef  = useScrollAnimation('fade-up', 0.2)

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <NeuralBackground />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        <img src="/fotoPerfil.jpg" alt="Foto de perfil" className="mx-auto mb-8 w-34 h-34 rounded-full object-cover dark:border-white/10 border-slate-300 border" />

        <div ref={textRef}>
          <span className="text-xs dark:text-white/30 text-slate-400 dark:border-white/10 border-slate-300 border rounded-full px-3 py-1 inline-block mb-4 w-25">
            Disponível para projetos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white text-slate-900 leading-[1.05] tracking-tight mb-4">
            Felipe Cabral de Aquino
          </h1>
          <p className="text-lg md:text-xl dark:text-white/40 text-slate-500 mx-auto text-center">
            Estudante de Engenharia de Software
          </p>
        </div>

        <div ref={btnsRef} className="mt-10 flex gap-3 justify-center">
          <a
            href="#projects"
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors w-22"
          >
            Ver projetos
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5
             dark:text-white/60 text-slate-600 text-sm font-medium rounded-lg
              dark:border-white/10 border-slate-300 border dark:hover:border-blue-500/40 hover:border-blue-400 dark:hover:text-white/80 hover:text-slate-900 transition-colors w-33"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  )
}
