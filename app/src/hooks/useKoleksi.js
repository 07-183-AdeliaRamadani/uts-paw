import { useContext } from 'react'
import { KoleksiContext } from '../context/KoleksiContext.jsx'

export function useKoleksi() {
  const context = useContext(KoleksiContext)
  if (!context) throw new Error('useKoleksi harus digunakan di dalam KoleksiProvider')
  return context
}
