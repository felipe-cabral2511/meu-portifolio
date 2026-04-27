import { useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CodeView from '../components/CodeView'
import DemoView from '../components/DemoView'

export default function Home() {
  const [codeProject, setCodeProject] = useState(null)
  const [demoProject, setDemoProject] = useState(null)

  const activeOverlay = codeProject ? 'code' : demoProject ? 'demo' : null

  return (
    <main className="w-full flex flex-col items-center">
      {activeOverlay === 'code' && (
        <CodeView project={codeProject} onClose={() => setCodeProject(null)} />
      )}
      {activeOverlay === 'demo' && (
        <DemoView project={demoProject} onClose={() => setDemoProject(null)} />
      )}
      {!activeOverlay && <Hero />}
      <About />
      <Projects onOpenCode={setCodeProject} onOpenDemo={setDemoProject} />
      <Contact />
      <Footer />
    </main>
  )
}
