import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/profile.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" /><h1>Dark Moon</h1>
        <img src={navProfile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar