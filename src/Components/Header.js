import React from 'react';
import '../style/Header.css';
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <div className='header'>
            <Link to={'/'}>
                <img className='logo' alt='' />
            </Link>
            <div className='login-button'>
                <p className='login-text'>Login</p>
            </div>
        </div>
    )
}

export default Header;