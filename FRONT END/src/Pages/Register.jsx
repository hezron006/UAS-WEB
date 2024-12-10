import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import '../style/Sign.css'

export const Register = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const Navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/post/register', {
        email,
        username,
        passwords: password,
      });

      const data = response.data;

      if (data.error) {
        alert(data.message); // Menampilkan pesan error jika username sudah terpakai
      } else {
        alert(data.message); // Menampilkan pesan sukses
        Navigate('/Login');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Terjadi kesalahan saat registrasi.');
    }
  };


  return (
    <>
   <table className='SignUp'>
    <tr>
      <label>
        Email<input name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
      </label>
    </tr>
    <tr>
      <label>
        Username<input name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
      </label>
    </tr>
    <tr>
      <label>
        Password<input name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
      </label>
    </tr>
    <button type='button' onClick={handleRegister}>Daftar</button>
    
   </table>
    </>
  )
}