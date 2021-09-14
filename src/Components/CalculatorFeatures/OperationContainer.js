import React from 'react';

import Button from '../UIElements/Button';
import OPERATION_ARR from '../SharedStatic/OPERATION_ARR';

import "./OperationContainer.css";

const OperationContainer = ({ handleButtonClick }) => {

    return (
        <div className="operationKeypad">
            {OPERATION_ARR.map(operation => (
                <Button
                    className="button--operation"
                    key={operation}
                    onClick={handleButtonClick}
                    value={operation}>
                    {operation}
                </Button>
            ))}
        </div>
    )
}

export default OperationContainer
