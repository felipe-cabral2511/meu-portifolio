import { useScrollAnimation } from '../hooks/useScrollAnimation'

const skills = [
  'React', 'Node.js', 'TypeScript', 'Python',
  'PostgreSQL', 'Docker', 'Git', 'REST APIs',
]

export default function About() {
  const titleRef  = useScrollAnimation('fade-up', 0)
  const photoRef  = useScrollAnimation('fade-up', 0.05)
  const textRef   = useScrollAnimation('fade-up', 0.1)
  const skillsRef = useScrollAnimation('fade-up', 0.15)

  return (
    <section id="about" className="w-full min-h-screen py-40 flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 text-center">

        <div ref={titleRef} className="mb-16">
          <p className="text-xs text-white/25 uppercase tracking-[0.2em] mb-3">Sobre mim</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Quem sou eu</h2>
        </div>

        {/* Foto */}
        <div ref={photoRef} className="flex justify-center mb-14">
          <div className="w-60 h-60 rounded-full bg-white/3 border border-white/7 flex items-center justify-center text-white/20 text-sm">
            sua foto aqui
          </div>
        </div>

        {/* Texto */}
        <div ref={textRef} className="space-y-6 text-white/45 text-[15px] leading-loose mb-14">
          <p>
            Desenvolvedor apaixonado por criar soluções digitais elegantes e eficientes.
            Com foco em experiência do usuário e código limpo, transformo ideias em produtos reais.
          </p>
          <p>
            Tenho experiência em projetos de ponta a ponta, desde o design de banco de dados
            até interfaces interativas. Gosto de aprender e me manter atualizado com as
            melhores práticas do mercado.
          </p>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="pb-16">
          <p className="text-xs text-white/25 uppercase tracking-[0.2em] mb-5">Tecnologias</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map(skill => (
              <span
                key={skill}
                className="px-4 py-2 text-sm text-white/50 bg-white/4 border border-white/8 rounded-md hover:border-white/20 hover:text-white/70 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
