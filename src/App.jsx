import About from './components/About'
import Background from './components/Background'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Resume from './components/Resume'
import ScrollProgress from './components/ScrollProgress'
import Skills from './components/Skills'

function App() {
  return (
    <div className="portfolio-shell min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Background />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
