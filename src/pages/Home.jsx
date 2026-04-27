import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
