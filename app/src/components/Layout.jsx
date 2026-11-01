import Header from './Header.jsx'
import Navigasi from './Navigasi.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  return <><Header /><Navigasi /><main id="konten">{children}</main><Footer /></>
}
