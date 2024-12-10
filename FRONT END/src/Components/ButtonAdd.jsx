import React from 'react'
import { Link } from 'react-router-dom'
import { FaSquarePlus } from "react-icons/fa6"
import { MdAdd } from "react-icons/md";
import '../style/Components.css'

export const ButtonAdd = () => {
  return (
     <div className="TombolTambah"><Link to ="/TambahJadwal"><MdAdd className='icon'/></Link></div>
  )
}
