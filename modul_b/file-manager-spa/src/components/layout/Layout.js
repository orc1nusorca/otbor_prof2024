import React from 'react';
import Navbar from './Navbar';
import useAppContext from '../../hooks/useAppContext';
import LoadingSpinner from '../common/LoadingSpinner';

const Layout = ({ children }) => {
    const { isLoading } = useAppContext();
    return (
        <div className="app-container">
            <Navbar />
            <LoadingSpinner isLoading={isLoading} />
            <main className="main-content">{children}</main>
        </div>
    );
};

export default Layout;
