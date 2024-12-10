import { Link, } from "react-router-dom"
import React, { useState } from 'react';
import axios from "axios";
import '../style/Sign.css'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/post/login', {
            username,
            passwords: password,
        });

        if (response.data.Status === "Login berhasil") {
            alert("Login berhasil");
            localStorage.setItem('token', response.data.token); // Simpan token
            window.location.href = '/'; 
        } else {
            alert(response.data.Error || "Login gagal");
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        alert('Terjadi kesalahan saat login');
    }
};

  return (
    <>
   <form className='SignIn'>
    
      <input 
                  placeholder="nama pengguna"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
    
    
      <input
                  placeholder="kata sandi"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>

    
    <button type='button' onClick={handleLogin}>Masuk</button>
    <button><Link to ="/Register">Daftar</Link></button>
   </form>
    </>
  )
}





