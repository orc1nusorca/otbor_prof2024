import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className="loading-spinner-overlay">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;

