import { Link } from 'react-router-dom'

export default function KartuKoleksi({ item }) {
  return <article className="kartu"><h2>{item.judul}</h2><p>Kategori: {item.kategori}</p><p>Kode Alat: {item.kodeAlat}</p><p>Jumlah: {item.jumlah}</p><p>Kondisi: {item.kondisi}</p><Link to={`/koleksi/${item.id}`}>Lihat Detail</Link></article>
}
