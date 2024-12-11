
import "../style/Components.css"

export const Navbar = () => {


  
  const handleLogout = () => {
    localStorage.removeItem('token')
    
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
