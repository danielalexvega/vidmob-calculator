import React from 'react';

import "./CalculatorDisplay.css";

const CalculatorDisplay = ({ display, handleInput, handleSubmit }) => {
    return (
            <input
                className="calculator-display"
                type="test"
                onChange={handleInput}
                value={display}
                onKeyDown={handleSubmit}
            />
    )
}

export default CalculatorDisplay;
