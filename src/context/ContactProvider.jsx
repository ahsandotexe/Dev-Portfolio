import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContactContext } from './ContactContext.js'

// The contact sheet is global. /contact is a real route (so it can be linked and bookmarked):
// it renders the home page with the sheet open, and closing it returns to /.
export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/contact') setOpen(true)
  }, [pathname])

  const openContact = useCallback(() => setOpen(true), [])
  const closeContact = useCallback(() => {
    setOpen(false)
    if (window.location.pathname === '/contact') navigate('/', { replace: true })
  }, [navigate])

  const value = useMemo(() => ({ open, openContact, closeContact }), [open, openContact, closeContact])
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}
