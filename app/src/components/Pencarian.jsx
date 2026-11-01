export default function Pencarian({ value, onChange }) {
  return <div className="pencarian"><label htmlFor="cari">Cari alat</label><input id="cari" type="search" placeholder="Cari berdasarkan judul..." value={value} onChange={(event) => onChange(event.target.value)} /></div>
}
