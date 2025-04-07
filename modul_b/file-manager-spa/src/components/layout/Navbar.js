import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    };

    return (
        <nav className="navbar">
            <div className='navbar-brand'>
                <img src={logo} alt="logo" width="40px" />
                <span className='logo-title'>File Manager</span>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/user-files" activeClassName="active-link">
                        My Files
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shared-files" activeClassName="active-link">
                        Shared Files
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/upload-files" activeClassName="active-link">
                        Upload Files
                    </NavLink>
                </li>
                {!isAuthenticated && (
                    <>
                        <li>
                            <NavLink to="/login" activeClassName="active-link">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" activeClassName="active-link">
                                Register
                            </NavLink>
                        </li>
                    </>
                )}
                {isAuthenticated && (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
