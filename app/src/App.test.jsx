import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

const dataKoleksi = [
  {
    id: '1',
    judul: 'Komputer Desktop Dell OptiPlex',
    kategori: 'Komputer',
    kodeAlat: 'LAB-KOM-001',
    jumlah: 20,
    kondisi: 'Baik',
  },
  {
    id: '2',
    judul: 'Monitor LED Samsung 24 Inch',
    kategori: 'Komputer',
    kodeAlat: 'LAB-MON-002',
    jumlah: 20,
    kondisi: 'Baik',
  },
]

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()

  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dataKoleksi),
      }),
    ),
  )
})

describe('Aplikasi Inventaris Laboratorium', () => {
  it('menampilkan identitas mahasiswa di beranda', () => {
    renderApp('/')

    expect(
      screen.getByText(/Adelia Ramadani/i),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/123140183/i),
    ).toBeInTheDocument()
  })

  it('halaman koleksi menampilkan data inventaris', async () => {
    renderApp('/koleksi')

    expect(
      await screen.findByText(/Komputer Desktop Dell OptiPlex/i),
    ).toBeInTheDocument()
  })

  it('halaman koleksi memiliki kotak pencarian', async () => {
    renderApp('/koleksi')

    const searchbox = await screen.findByRole('searchbox')

    expect(searchbox).toBeInTheDocument()
  })

  it('halaman detail menampilkan informasi item', async () => {
    renderApp('/koleksi/1')

    expect(
      await screen.findByText(/Komputer Desktop Dell OptiPlex/i),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/LAB-KOM-001/i),
    ).toBeInTheDocument()
  })

  it('route yang tidak dikenali menampilkan 404', () => {
    renderApp('/halaman-yang-tidak-ada')

    expect(
      screen.getByRole('heading', { name: /404/i }),
    ).toBeInTheDocument()
  })

  it('halaman tentang menampilkan nama mahasiswa', () => {
    renderApp('/tentang')

    expect(
      screen.getByText(/Nama: Adelia Ramadani/i),
    ).toBeInTheDocument()
  })
})