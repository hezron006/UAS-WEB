import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { TombolTambah } from "../Components/TombolTambah";
import { Navbar } from "../Components/Navbar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "../style/Dashboard.css"
import "../style/index.css"

export const Dashboard = () => {

  const [get, setGet] = useState([]); 
 

  const Navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    console.log("Token:", token);
    if (!token ) {
      setShowModal(true);
      return;
    }
      axios.get("http://localhost:3000/post/data", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setGet(response.data);
      })
      .catch((error) => {
        console.error("Gagal", error);
        
      });
    
}, []);

const handleLoginRedirect = () => {
  setShowModal(false);
  Navigate("/Login");
};

const handleDelete = (id) => {
  axios.delete(`http://localhost:3000/post/delete/${id}`) 
    .then(() => {
      setGet(get.filter((get) => get.id !== id));
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

  return (
   <>
   {showModal && (
        <div className="modal-Masuk">
            <div className="title">Silahkan Masuk!</div>
            <button className='btn' onClick={handleLoginRedirect}>Masuk</button>
          </div>
   )}
   {!showModal && (
     <>
     <Navbar/>
   <TombolTambah/>
      </>
    )}


     <section className="Jadwal-container">
      {get.map((data) => {
        
        const formatTanggal = new Date(data.tanggal).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',

        });

        const formatWaktu = new Date(`2024-01-01T${data.jam}`).toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // ubah ke true jika ingin format 12 jam (AM/PM)
        }).replace('.', ':');
        return (
          <section className="Jadwal" key={data.id}>
            <div className="kegiatan">{data.kegiatan}</div>
            <div className="date-time">
            <div className="tanggal">{formatTanggal},</div>
            <div className="jam">{formatWaktu}</div>
            </div>
            <div className="edit-delete">
              <Link className="Edit" to={`/edit/${data.id}`}><MdEdit /></Link>
              <div className="delete" onClick={() => handleDelete(data.id)}><MdDelete /></div>
            </div>
          </section>
        );
      })}
    </section>
   </>
  )
}
