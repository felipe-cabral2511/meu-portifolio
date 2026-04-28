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
        <div
          ref={photoRef}
          className="mx-auto mb-8 w-34 h-34 rounded-full bg-[#161616] border border-white/10 flex items-center justify-center text-white/20 text-xs"
        >
          foto
        </div>

        <div ref={textRef}>
          <span className=" text-xs text-white/30 border border-white/10 rounded-full ">
            Disponível para projetos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Felipe Cabral de Aquino
          </h1>
          <p className="text-lg md:text-xl text-white/40 mx-auto text-center">
            Estudante de Engenharia de Software
          </p>
        </div>

        <div ref={btnsRef} className="mt-10 flex gap-3 justify-center">
          <a
            href="#projects"
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors w-25 h-5.5"
          >
            Ver projetos
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 text-white/60 text-sm font-medium rounded-lg border border-white/10 hover:border-blue-500/40 hover:text-white/80 transition-colors w-33"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  )
}
