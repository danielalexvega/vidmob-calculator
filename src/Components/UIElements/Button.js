import React from 'react';

import "./Button.css";

const Button = (props) => {
    const { type, onClick, value, disabled, children, size, inverse, danger } = props;

    const sizeClass = size ? `button--size` : "";
    const inverseClass = inverse ? `button--inverse` : "";
    const dangerClass = danger ? `button--danger` : "";

    return (
        <button
            className={`button ${sizeClass} ${dangerClass} ${inverseClass}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            value={value}
        >
            {children}
        </button>
    )
}

export default Button;
