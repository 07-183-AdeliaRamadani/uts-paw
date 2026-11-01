import { NavLink } from 'react-router-dom'

export default function Navigasi() {
  return <nav aria-label="Navigasi utama"><NavLink to="/" end>Beranda</NavLink><NavLink to="/koleksi">Koleksi</NavLink><NavLink to="/tambah">Tambah Inventaris</NavLink><NavLink to="/statistik">Statistik</NavLink><NavLink to="/tentang">Tentang</NavLink></nav>
}
