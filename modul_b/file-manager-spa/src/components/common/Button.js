import React from 'react';

const Button = ({ children, onClick, type = 'button', disabled }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
