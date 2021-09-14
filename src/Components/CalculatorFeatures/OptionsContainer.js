import React from 'react';

import Button from '../UIElements/Button';

import "./OptionsContainer.css";

const OptionsContainer = ({handleOptionsClick}) => {

    const optionsArray = [
        { value: "AC", label: "AC" },
        { value: "(", label: "(" },
        { value: ")", label: ")" },
        { value: ".", label: "." }
    ]


    return (
        <div className="optionsKeypad">
            {optionsArray.map(option => (
                <Button
                    className="button--option"
                    key={option.label}
                    onClick={handleOptionsClick}
                    value={option.value}>
                    {option.label}
                </Button>
            ))}
        </div>
    )
}

export default OptionsContainer;
