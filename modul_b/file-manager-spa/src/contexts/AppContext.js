import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const clearError = () => {
        setError(null);
    };

    const clearSuccess = () => {
        setSuccess(null);
    };

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                error,
                setError,
                success,
                setSuccess,
                clearError,
                clearSuccess,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
