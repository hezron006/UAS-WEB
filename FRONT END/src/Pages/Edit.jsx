import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/Edit.css'

export const Edit = () => {
    const [kegiatan, setKegiatan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jam, setJam] = useState("");
    const { id } = useParams(); // Untuk mendapatkan id dari URL
    const navigate = useNavigate(); // Untuk navigasi ke halaman lain setelah update
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const updatedData = { kegiatan, tanggal, jam };
        await axios.put(`http://localhost:3000/post/update/${id}`, updatedData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Pastikan token valid
        });
        navigate("/"); 
      } catch (error) {
        console.error("Error updating data: ", error);
        
      }
    };
  
    return (
      <div className='edit-container'>
        <form onSubmit={handleSubmit} className='edit'>
        <div className="title">Ubah jadwal kegiatan anda</div>
        <input className="kegiatan" type="text" maxLength={50} placeholder="Kegiatan" value={kegiatan}
                  onChange={(e) => setKegiatan(e.target.value)}/>
      <div className="date-time">
      <input type='date' value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}/>
      <input type='time' value={jam}
                  onChange={(e) => setJam(e.target.value)}/>
          <button type="submit" className='ubah'>UBAH</button>
          </div>
        </form>
      </div>
    );
  };
