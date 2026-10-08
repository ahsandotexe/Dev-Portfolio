import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import ContactSheet from './components/ContactSheet.jsx'
import CornerNav from './components/CornerNav.jsx'
import Footer from './components/Footer.jsx'
import MobileTypeMenu from './components/MobileTypeMenu.jsx'
import PageRail from './components/PageRail.jsx'
import SkipLink from './components/SkipLink.jsx'
import { ContactProvider } from './context/ContactProvider.jsx'
import About from './pages/About.jsx'
import Experience from './pages/Experience.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'

export default function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const firstRender = useRef(true)
  // Cross-fade between pages only; /projects/:slug changes animate inside the Projects page.
  const pageKey = '/' + location.pathname.split('/')[1]

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    // Move focus to the page on route change so screen readers announce the new content.
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <ContactProvider>
        <SkipLink />
        <CornerNav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
        <PageRail />
        <MobileTypeMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="relative mx-auto min-h-screen max-w-frame overflow-x-clip">
          <main id="main" tabIndex={-1} className="outline-none">
            <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, left: 0 })}>
              <motion.div
                key={pageKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<Projects />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <ContactSheet />
      </ContactProvider>
    </MotionConfig>
  )
}
