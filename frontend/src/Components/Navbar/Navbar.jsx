import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isMenuActive, setIsMenuActive] = useState(false);
    const {getTotalCartItems} = useContext(ShopContext);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>DARK MOON</p>
            </div>
            <div className={`hamburger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`nav-menu ${isMenuActive ? 'active' : ''}`}>
                <li onClick={() => {setMenu("shop"); setIsMenuActive(false)}}>
                    <Link style={{ textDecoration: 'none'}} to="/">HOME</Link> {menu === "shop" && <hr />}
                </li>
                <li onClick={() => {setMenu("books"); setIsMenuActive(false)}}>
                    <Link style={{ textDecoration: 'none'}} to="/books">BOOKS</Link> {menu === "books" && <hr />}
                </li>
                <li onClick={() => {setMenu("merch"); setIsMenuActive(false)}}>
                    <Link style={{ textDecoration: 'none'}} to="/merch">MERCH</Link> {menu === "merch" && <hr />}
                </li>
                <li onClick={() => {setMenu("albums"); setIsMenuActive(false)}}>
                    <Link style={{ textDecoration: 'none'}} to="/albums">ALBUMS</Link> {menu === "albums" && <hr />}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link to="/login">
                    <button>Login</button>
                </Link>}
                
                <div className="cart-container">
                    <Link to="/cart">
                        <img src={cart_icon} alt="Cart Icon" />
                    </Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
