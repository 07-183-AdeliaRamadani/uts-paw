import { createContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

export const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [awal, setAwal] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tambahan, simpanTambahan] = useLocalStorage('koleksiTambahan', [])
  const [terhapus, simpanTerhapus] = useLocalStorage('koleksiTerhapus', [])

  useEffect(() => {
    let aktif = true
    async function ambilKoleksiAwal() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/koleksi.json`,
        )
        if (!response.ok) throw new Error('Data koleksi gagal dimuat')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Format data koleksi tidak valid')
        if (aktif) setAwal(data)
      } catch (err) {
        if (aktif) setError(err.message)
      } finally {
        if (aktif) setLoading(false)
      }
    }
    ambilKoleksiAwal()
    return () => { aktif = false }
  }, [])

  const koleksi = [...awal, ...tambahan].filter(
    (item) => !terhapus.map(String).includes(String(item.id)),
  )
  function tambahKoleksi(item) { simpanTambahan([...tambahan, item]) }
  function hapusKoleksi(id) {
    simpanTerhapus([...new Set([...terhapus.map(String), String(id)])])
  }

  return (
    <KoleksiContext.Provider value={{ koleksi, loading, error, tambahKoleksi, hapusKoleksi }}>
      {children}
    </KoleksiContext.Provider>
  )
}
