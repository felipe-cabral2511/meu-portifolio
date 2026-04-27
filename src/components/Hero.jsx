import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Hero() {
  const photoRef = useScrollAnimation('fade-up', 0)
  const textRef  = useScrollAnimation('fade-up', 0.1)
  const btnsRef  = useScrollAnimation('fade-up', 0.2)

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      {/* Grade de fundo sutil */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Brilho central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        {/* Avatar / foto */}
        <div
          ref={photoRef}
          className="mx-auto mb-8 w-34 h-34 rounded-full bg-[#161616] border border-white/10 flex items-center justify-center text-white/20 text-xs"
        >
          foto
        </div>

        <div ref={textRef}>
          <span className="inline-block mb-5 px-4 py-10 text-xs text-white/30 border border-white/10 rounded-full tracking-wide w-30 h-9">
            Disponível para projetos
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Seu Nome
          </h1>
          <p className="text-lg md:text-xl text-white/40 mx-auto text-center h-10">
            Desenvolvedor Full Stack
          </p>
        </div>

        <div ref={btnsRef} className="mt-10 flex gap-3 justify-center ">
          <a
            href="#projects"
            className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors w-25 h-5.5"
          >
            Ver projetos
          </a>
          <a
            href="#contact"
            className="px-6 w-35 text-white/60 text-sm font-medium rounded-lg border border-white/10 hover:border-white/25 hover:text-white/80 transition-colors"
          >
            Entrar em contato
          </a>
        </div>
      </div>

    </section>
  )
}
