import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.warning(data.message, {
          position: "top-center",
          }); 
      } else {
        Navigate('/Login');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };


  return (
  <div className='sign-container'>
    <ToastContainer/>
   <form className='sign'>
   <h3 className="title">Daftar</h3>
       <input type='email' placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
       <input type='text' placeholder='nama pengguna'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
   
      <input  type="password" placeholder='kata sandi'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
   
    <button type='button' className='btn' onClick={handleRegister}>Daftar</button>
    
   </form>
    </div>
  )
}