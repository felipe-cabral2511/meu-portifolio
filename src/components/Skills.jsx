import { useScrollAnimation } from '../hooks/useScrollAnimation'

const skills = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
  { name: 'React',      icon: 'devicon-react-original colored'   },
  { name: 'Node.js',    icon: 'devicon-nodejs-plain colored'     },
  { name: 'Python',    icon: 'devicon-python-plain colored'     },
  { name: 'HTML',       icon: 'devicon-html5-plain colored'      },
  { name: 'CSS',        icon: 'devicon-css3-plain colored'       },
  { name: 'Tailwind',   icon: 'devicon-tailwindcss-plain colored'},
]

export default function Skills() {
  const titleRef = useScrollAnimation('fade-up', 0)

  return (
    <section className="w-full py-24 flex flex-col items-center gap-12">
      <div ref={titleRef} className="text-center">
        <p className="text-xs dark:text-white/25 text-slate-400 uppercase tracking-[0.2em] mb-3">Stack</p>
        <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 leading-tight">Tecnologias</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-xl
             dark:border-white/7 border-slate-200 border dark:bg-white/3 bg-white dark:hover:border-blue-500/35
              hover:border-blue-400/50 dark:hover:bg-blue-950/15 hover:bg-blue-50 transition-colors duration-300"
            style={{
              animation: `skillFloat 3s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <i className={`${skill.icon} text-4xl`} />
            <span className="text-xs dark:text-white/45 text-slate-500">{skill.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes skillFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  )
}
