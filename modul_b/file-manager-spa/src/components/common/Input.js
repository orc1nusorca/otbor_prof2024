import React from 'react';

const Input = ({ type, name, value, onChange, placeholder, error }) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? 'error-input' : ''}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Input;
