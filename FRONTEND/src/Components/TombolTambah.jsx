import { Link } from 'react-router-dom'
import { MdAdd } from "react-icons/md";
import '../style/Components.css'

export const TombolTambah = () => {
  return (
     <div className="TombolTambah"><Link to ="/TambahJadwal"><MdAdd className='icon'/></Link></div>
  )
}
