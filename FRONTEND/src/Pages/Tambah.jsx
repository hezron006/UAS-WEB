import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../style/Tambah.css"


export const Tambah = () => {
  const [kegiatan,setKegiatan] = useState('')
  const [tanggal,setTanggal] = useState('')
  const [jam,setJam] = useState('')

  const Navigate = useNavigate()

  const handletambah = async (e) => {

    e.preventDefault();
 
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('http://localhost:3000/post/create', {
            kegiatan,
            tanggal,
            jam,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Kirim token di header Authorization
            },
        });
        Navigate('/')
    } catch (error) {
      console.log('error')
        console.error("Error:", error);
    }
};

  return (
    <>
    <div className="add-container">
     <form className="add">
      <div className="title">Tambah jadwal kegiatan anda</div>
      <input className="kegiatan" type="text" maxLength={50} placeholder="Kegiatan" value={kegiatan}
                  onChange={(e) => setKegiatan(e.target.value)}/>
      <div className="date-time">
      <input type='date' value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}/>
      <input type='time' value={jam}
                  onChange={(e) => setJam(e.target.value)}/>
      <button className="additem" onClick={handletambah}>TAMBAH</button>
      </div>            
     </form>
    </div>
    </>
  )
}
