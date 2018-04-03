import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
    <nav>
      <ul className="NavBar"> 
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/contacts'>Contacts</Link></li>
        <li className="nav-right"><Link to='/about'>About</Link></li>
      </ul>
    </nav>
)

export default NavBar;
