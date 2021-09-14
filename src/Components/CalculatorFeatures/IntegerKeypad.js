import React from 'react';

import Button from '../UIElements/Button';

import "./IntegerKeypad.css";


const IntegerKeypad = ({ handleButtonClick }) => {
    const buttonArray = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 0, label: "0" },
        { value: ".", label: "." }
    ]


    return (
        <div className="integerKeypad">
            {buttonArray.map(button => (
                <Button key={button.label} onClick={handleButtonClick} value={button.value}>
                    {button.label}
                </Button>
            ))}
        </div>
    )
}

export default IntegerKeypad;
