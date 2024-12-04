import { Link, } from "react-router-dom"
import '../style/Navbar.css'

export const Navbar = () => {
  return (
    <>
      <nav>
        <section className="logo">AgendaKu</section>
        <section className="Link">
        <Link to ="/">Home </Link>
        <Link to ="/Login">Login</Link>
        </section>
      </nav>
    </>
  )
}
