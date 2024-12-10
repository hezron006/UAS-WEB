import { Link, } from "react-router-dom"
import "../style/Components.css"

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
};

  return (
    <>
      <nav>
        <section className="logo">JadwalKu</section>
        <section className="Link">
        <Link to ="/">dashboard </Link>
        <Link to ="/Login">Login</Link>
        <button onClick={handleLogout}>Logout</button>
        </section>
      </nav>
    </>
  )
}
