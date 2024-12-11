import { useNavigate } from "react-router-dom";
import "../style/Components.css"

export const Navbar = () => {

   const Navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate('/')
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
