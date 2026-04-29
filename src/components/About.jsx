import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function About() {
  const titleRef = useScrollAnimation('fade-up', 0)
  const photoRef = useScrollAnimation('fade-up', 0.05)
  const textRef  = useScrollAnimation('fade-up', 0.1)

  return (
    <section id="about" className="w-full min-h-screen py-40 flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 text-center">

        <div ref={titleRef} className="mb-16">
          <p className="text-xs dark:text-white/25 text-slate-400 uppercase tracking-[0.2em] mb-3">Sobre mim</p>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 leading-tight">Quem sou eu</h2>
        </div>

        <div ref={photoRef} className="flex justify-center mb-14">
          <img src="/fotoSobre.jpg" alt="Foto sobre mim" className="w-60 h-60 rounded-full object-cover dark:border-white/7 border-slate-200 border" />
        </div>

        <div ref={textRef} className="space-y-6 dark:text-white/45 text-slate-500 text-[15px] leading-loose mb-14">
          <p>
            Desenvolvedor apaixonado por criar soluções digitais elegantes e eficientes.
            Com foco em experiência do usuário e código limpo, transformo ideias em produtos reais.
          </p>
          <p>
            Tenho experiência em projetos Web, com foco em
           interfaces interativas, UX e UI. Gosto de aprender e me manter atualizado com as
            melhores práticas do mercado.
          </p>
        </div>

      </div>
    </section>
  )
}
