import { Link, } from "react-router-dom"
import { Navigate } from "react-router-dom";
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
        <button className="btn" onClick={handleLogout}>Logout</button>
        </section>
      </nav>
    </>
  )
}
