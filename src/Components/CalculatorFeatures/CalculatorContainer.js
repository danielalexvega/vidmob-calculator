import React, { useState } from 'react';

import IntegerKeypad from './IntegerKeypad';
import OptionsContainer from './OptionsContainer';
import OperationContainer from './OperationContainer';
import CalculatorDisplay from './CalculatorDisplay';

import "./CalculatorContainer.css";

import OPERATION_ARR from '../SharedStatic/OPERATION_ARR';

const CalculatorContainer = () => {
    const [display, setDisplay] = useState('');


    function findOperations(valueArr) {
        let modifiedOperationsArr = [...OPERATION_ARR];
        modifiedOperationsArr.push("(");
        modifiedOperationsArr.push(")");
        let opertionsArr = [];
        console.log(modifiedOperationsArr);
        valueArr.forEach((value, index) => {
            if (modifiedOperationsArr.includes(value)) {
                opertionsArr.push(index);
            }
        });

        return opertionsArr;
    }

    function findIntegerOperationArr(valueArr, operationsIndexArr) {
        let integerArr = [];
        let operationArr = [];
        let tempInt = "";
        // console.log(valueArr);
        // console.log(valueArr.length);
        for (let i = 0; i < valueArr.length; i++) {
            if (!operationsIndexArr.includes(i) && !operationsIndexArr.includes(i + 1)) {
                tempInt += valueArr[i];
            } else if (!operationsIndexArr.includes(i)) {
                tempInt += valueArr[i];
                integerArr.push(parseInt(tempInt, 10));
                tempInt = "";
            } else {
                operationArr.push(valueArr[i])
            }
        }
        integerArr.push(parseInt(tempInt, 10));

        return { integerArr, operationArr };
    }

    function calculuate(valueArr) {
        let operationsIndexArr = findOperations(valueArr);
        let { integerArr, operationArr } = findIntegerOperationArr(valueArr, operationsIndexArr);

        console.log(integerArr);  // integer array
        console.log(operationArr);  //operation array

        // Need to check for double negatives
        // need to check for parenthesis
        // do the math

    }

    const handleIntegerClick = (event) => {

        switch (event.target.value) {
            case 'AC':
                setDisplay('');
                break;
            case '=':
                calculuate(display.split(""));
                break;


            default:
                setDisplay(() => display + event.target.value);
                break;

        }
    }


    return (
        <div className="calculator__container">
            <CalculatorDisplay display={display} />
            <div className="integer-operation__container">
                <OptionsContainer handleOptionsClick={handleIntegerClick} />
                <IntegerKeypad handleButtonClick={handleIntegerClick} />
                <OperationContainer handleButtonClick={handleIntegerClick} />
            </div>
        </div>
    )
}

export default CalculatorContainer;
