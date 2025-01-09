import React from 'react'
import './Footer.css'
import facebook_icon from '../Assets/facebook_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import youtube_icon from '../Assets/youtube_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <p>DARK MOON</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={facebook_icon} alt="Facebook" />
        </div>
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="Instagram" />
        </div>
        <div className="footer-icons-container">
          <img src={youtube_icon} alt="YouTube" />
        </div>
      </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer

