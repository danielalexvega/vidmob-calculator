import React from 'react';

import "./CalculatorDisplay.css";

const CalculatorDisplay = ({display}) => {
    return (
        <div className="calculator-display">
            <p>{display}</p>
        </div>
    )
}

export default CalculatorDisplay;
