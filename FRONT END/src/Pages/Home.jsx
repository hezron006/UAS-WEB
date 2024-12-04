import "../style/Home.css"
import { Link, } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {

  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    
    axios
      .get("http://localhost:3000/post/data")
      .then((response) => {
        setTasks(response.data); 
      })
      .catch((error) => {
        console.error(" data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/post/delete/${id}`) 
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
   <>
     <section className="Agenda">
       <section className="Tugas-container">
       <h4>Tugas</h4>
       {tasks.map((task) => (
       <section className="Tugas" key={task.id}>
        <div className="Nama">{task.Nama}</div>
        <div  className="Date">Deadline : {task.Date} </div>
        <div className="btn">
        <button onClick={() => handleDelete(task.id)}>Delete</button>
        <button><Link to ="/TambahData">Tambah Tugas</Link></button>
       </div>
       </section>
       ))}
       </section>
     </section>
   </>
  )
}
