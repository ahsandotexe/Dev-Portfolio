import { useContext } from 'react'
import { ContactContext } from '../context/ContactContext.js'

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used inside ContactProvider')
  return ctx
}
