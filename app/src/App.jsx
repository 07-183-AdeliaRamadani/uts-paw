import { useState } from 'react'
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'

import mahasiswa from '../mahasiswa.json'

import { KoleksiProvider } from './context/KoleksiContext.jsx'
import { useKoleksi } from './hooks/useKoleksi.js'

import Layout from './components/Layout.jsx'
import KartuKoleksi from './components/KartuKoleksi.jsx'
import Pencarian from './components/Pencarian.jsx'


function Beranda() {
  return (
    <section>
      <h1>Ujian Tengah Semester Pengembangan Aplikasi Web</h1>

      <p>
        {mahasiswa.nama || 'Nama belum diisi'} (
        {mahasiswa.nim || 'NIM belum diisi'})
      </p>

      <p>
        <Link to="/koleksi">Lihat Koleksi</Link>
      </p>

      <p>
        <Link to="/tambah">Tambah Inventaris</Link>
      </p>

      <p>
        <Link to="/statistik">Lihat Statistik</Link>
      </p>

      <p>
        <Link to="/tentang">Tentang</Link>
      </p>
    </section>
  )
}


function Koleksi() {
  const { koleksi, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')

  const hasilPencarian = koleksi.filter((item) =>
    item.judul.toLowerCase().includes(cari.toLowerCase()),
  )

  if (loading) {
    return (
      <section>
        <p>Memuat data...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Inventaris Laboratorium</h1>

      <Pencarian
        value={cari}
        onChange={setCari}
      />

      <div className="koleksi-grid">
        {hasilPencarian.map((item) => (
          <KartuKoleksi
            key={item.id}
            item={item}
          />
        ))}
      </div>

      {hasilPencarian.length === 0 && (
        <p>Data yang dicari tidak ditemukan.</p>
      )}
    </section>
  )
}


function DetailKoleksi() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    koleksi,
    loading,
    error,
    hapusKoleksi,
  } = useKoleksi()

  const item = koleksi.find(
    (dataItem) => String(dataItem.id) === String(id),
  )

  function handleHapus() {
    hapusKoleksi(id)
    navigate('/koleksi')
  }

  if (loading) {
    return (
      <section>
        <p>Memuat detail...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    )
  }

  if (!item) {
    return (
      <section>
        <h1>Data tidak ditemukan</h1>

        <p>Item dengan ID tersebut tidak ditemukan.</p>

        <Link to="/koleksi">
          Kembali ke Koleksi
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{item.judul}</h1>

      <p>Kategori: {item.kategori}</p>
      <p>Kode Alat: {item.kodeAlat}</p>
      <p>Jumlah: {item.jumlah}</p>
      <p>Kondisi: {item.kondisi}</p>

      <p>
        <Link to="/koleksi">
          Kembali ke Koleksi
        </Link>
      </p>

      <button
        type="button"
        onClick={handleHapus}
      >
        Hapus
      </button>
    </section>
  )
}


function TambahKoleksi() {
  const navigate = useNavigate()
  const { tambahKoleksi } = useKoleksi()

  const [judul, setJudul] = useState('')
  const [kategori, setKategori] = useState('')
  const [kodeAlat, setKodeAlat] = useState('')
  const [jumlah, setJumlah] = useState('')
  const [kondisi, setKondisi] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!judul.trim()) {
      setError('Judul wajib diisi.')
      return
    }

    const dataBaru = {
      id: `lokal-${Date.now()}`,
      judul: judul.trim(),
      kategori: kategori.trim(),
      kodeAlat: kodeAlat.trim(),
      jumlah: Number(jumlah),
      kondisi,
    }

    try {
      tambahKoleksi(dataBaru)
      navigate('/koleksi')
    } catch {
      setError(
        'Data gagal disimpan. Periksa ruang penyimpanan browser.',
      )
    }
  }

  return (
    <section>
      <h1>Tambah Inventaris</h1>

      <p>
        <Link to="/koleksi">
          Kembali ke Koleksi
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="judul">
            Judul
          </label>

          <br />

          <input
            id="judul"
            name="judul"
            type="text"
            value={judul}
            onChange={(event) =>
              setJudul(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="kategori">
            Kategori
          </label>

          <br />

          <input
            id="kategori"
            name="kategori"
            type="text"
            value={kategori}
            onChange={(event) =>
              setKategori(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="kodeAlat">
            Kode Alat
          </label>

          <br />

          <input
            id="kodeAlat"
            name="kodeAlat"
            type="text"
            value={kodeAlat}
            onChange={(event) =>
              setKodeAlat(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="jumlah">
            Jumlah
          </label>

          <br />

          <input
            id="jumlah"
            name="jumlah"
            type="number"
            min="0"
            value={jumlah}
            onChange={(event) =>
              setJumlah(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="kondisi">
            Kondisi
          </label>

          <br />

          <select
            id="kondisi"
            name="kondisi"
            value={kondisi}
            onChange={(event) =>
              setKondisi(event.target.value)
            }
          >
            <option value="">
              Pilih kondisi
            </option>

            <option value="Baik">
              Baik
            </option>

            <option value="Perlu Servis">
              Perlu Servis
            </option>

            <option value="Rusak">
              Rusak
            </option>
          </select>
        </div>

        <br />

        <button type="submit">
          Simpan
        </button>
      </form>
    </section>
  )
}


function Statistik() {
  const {
    koleksi,
    loading,
    error,
  } = useKoleksi()

  const statistikKategori = koleksi.reduce(
    (hasil, item) => {
      const kategori =
        item.kategori || 'Tanpa Kategori'

      if (!hasil[kategori]) {
        hasil[kategori] = {
          jumlahItem: 0,
          totalAlat: 0,
        }
      }

      hasil[kategori].jumlahItem += 1
      hasil[kategori].totalAlat +=
        Number(item.jumlah) || 0

      return hasil
    },
    {},
  )

  if (loading) {
    return (
      <section>
        <p>Memuat statistik...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Statistik Inventaris</h1>

      <p>
        <Link to="/">
          Beranda
        </Link>

        {' | '}

        <Link to="/koleksi">
          Koleksi
        </Link>
      </p>

      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Jumlah Jenis</th>
            <th>Total Alat</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(
            statistikKategori,
          ).map(([kategori, data]) => (
            <tr key={kategori}>
              <td>{kategori}</td>
              <td>{data.jumlahItem}</td>
              <td>{data.totalAlat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}


function Tentang() {
  return (
    <section>
      <h1>Tentang</h1>

      <h2>Identitas Mahasiswa</h2>

      <p>Nama: {mahasiswa.nama}</p>
      <p>NIM: {mahasiswa.nim}</p>
      <p>Kelas: {mahasiswa.kelas}</p>
      <p>Tema: {mahasiswa.tema}</p>

      <p>
        Aplikasi ini dibuat untuk mengelola data
        Inventaris Laboratorium sebagai bagian
        dari Ujian Tengah Semester Pengembangan
        Aplikasi Web.
      </p>

      <Link to="/">
        Kembali ke Beranda
      </Link>
    </section>
  )
}


function TidakDitemukan() {
  return (
    <section>
      <h1>404</h1>

      <p>Halaman tidak ditemukan.</p>

      <Link to="/">
        Kembali ke Beranda
      </Link>
    </section>
  )
}


export default function App() {
  return (
    <KoleksiProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Beranda />}
          />

          <Route
            path="/koleksi"
            element={<Koleksi />}
          />

          <Route
            path="/koleksi/:id"
            element={<DetailKoleksi />}
          />

          <Route
            path="/tambah"
            element={<TambahKoleksi />}
          />

          <Route
            path="/statistik"
            element={<Statistik />}
          />

          <Route
            path="/tentang"
            element={<Tentang />}
          />

          <Route
            path="*"
            element={<TidakDitemukan />}
          />
        </Routes>
      </Layout>
    </KoleksiProvider>
  )
}