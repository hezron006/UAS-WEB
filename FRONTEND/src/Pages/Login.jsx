import { Link, } from "react-router-dom"
import React, { useState } from 'react';
import axios from "axios";
import '../style/Sign.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/post/login', {
            username,
            passwords: password,
        });

        if (response.data.Status) {
            localStorage.setItem('token', response.data.token); // Simpan token
            window.location.href = '/'; 
        } else {
            toast.error(response.data.Error, {
            position: "top-center",
            }); 
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

  return (
  <div className="sign-container">
    <ToastContainer/>
   <form className='sign'>
   <div className="title">Masuk</div>
      <input placeholder="Nama pengguna"value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input placeholder="Kata sandi"type="password"value={password}onChange={(e) => setPassword(e.target.value)}/>
    <button type='button' className="btn" onClick={handleLogin}>Masuk</button>
    <div className="toRegister">
    <div>Belum punya akun?</div>
    <div><Link to ="/Register">Daftar</Link></div>
    </div>
   </form>
    </div>
  )
}





