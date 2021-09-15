import React, { useState } from 'react';

import IntegerKeypad from './IntegerKeypad';
import OptionsContainer from './OptionsContainer';
import OperationContainer from './OperationContainer';
import CalculatorDisplay from './CalculatorDisplay';

import "./CalculatorContainer.css";

import OPERATION_ARR from '../SharedStatic/OPERATION_ARR';

const CalculatorContainer = () => {
    const [display, setDisplay] = useState('');
    const [containsError, setContainsError] = useState(false);

    function removeDoubleNegatives(valueArr) {
        for (let i = 0; i < valueArr.length - 1; i++) {
            if (valueArr[i] === "-" && valueArr[i + 1] === "-") {
                valueArr[i] = "+";
                valueArr.splice(i + 1, 1);
            }
        }

        return valueArr;
    }

    function leadingNegative(valueArr) {
        if (valueArr.length > 1 && valueArr[0] === "-" && valueArr[1] !== "-") {
            let updatedValue = "-" + valueArr[1]
            valueArr.splice(0, 2, updatedValue);
        }

        console.log(valueArr);
        return valueArr;
    }

    function plusMinus(valueArr) {
        for (let i = 0; i < valueArr.length - 1; i++) {
            if (valueArr[i] === "+" && valueArr[i + 1] === "-") {
                valueArr[i] = "-";
                valueArr.splice(i + 1, 1);
            }
        }

        return valueArr;
    }

    function containsParenthesis(valueArr) {
        let validEquation = false;
        let containsFrontParenthesis = false;
        for (let i = 0; i < valueArr.length - 1; i++) {
            if (valueArr[i] === ")" && !containsFrontParenthesis) {
                displayError();
                return;
            }

            if (valueArr[i] === "(") {
                containsFrontParenthesis = true;
                for (let j = i + 1; j < valueArr.length; j++) {
                    if (valueArr[j] === ")") {
                        validEquation = true;
                    }
                }
                if (!validEquation) {
                    displayError();
                    return;
                }
            }
        }

        return validEquation;
    }


    function findOperations(valueArr) {
        let modifiedOperationsArr = [...OPERATION_ARR];
        modifiedOperationsArr.push("(");
        modifiedOperationsArr.push(")");
        let opertionsArr = [];
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

    function displayError() {
        setContainsError(true);
        setDisplay("Error");
    }

    function simplifyEquation(equation) {

        let frontParenthesis = equation.findIndex(value => value === "(");
        let closingParenthesis = equation.lastIndexOf(")");

        if (closingParenthesis === -1) {
            displayError();
        }

        let insideEquation = equation.filter((integer, index) => (index > frontParenthesis && index < closingParenthesis));
        if (containsParenthesis(insideEquation)) {
            do {
                insideEquation = simplifyEquation(insideEquation);

            } while (containsParenthesis(insideEquation))
        }

        let solution = solveSetup(insideEquation);

        equation.splice(frontParenthesis, (closingParenthesis - frontParenthesis + 1), solution);
        console.log(equation);
        return equation;
    }

    function solveSetup(equation) {
        let operationsIndexArr = findOperations(equation);
        let integerArr = [];
        let operationArr = [];
        let tempInt = "";
        for (let i = 0; i < equation.length; i++) {
            if (!operationsIndexArr.includes(i) && !operationsIndexArr.includes(i + 1)) {
                tempInt += equation[i];
            } else if (!operationsIndexArr.includes(i)) {
                tempInt += equation[i];
                integerArr.push(parseInt(tempInt, 10));
                tempInt = "";
            } else {
                operationArr.push(equation[i])
            }
        }
        integerArr.push(parseInt(tempInt, 10));

        console.log(integerArr);
        console.log(operationArr);

        let solution = solve(integerArr, operationArr);
        return solution;
    }

    function solve(integerArr, operationArr) {
        let first_order = ["*", "/", "%"];
        let second_order = ["+", "-"];

        console.log("before everything");
        console.log(integerArr);
        console.log(operationArr);

        //first order operations
        for (let i = 0; i < integerArr.length - 1; i++) {
            if (first_order.includes(operationArr[i])) {
                let tempSolution = operate(operationArr[i], integerArr[i], integerArr[i + 1]);

                operationArr.splice(i, 1);
                integerArr.splice(i, 2, tempSolution)
                i--;

                console.log(`We got here`);
                console.log(operationArr);
                console.log(integerArr);
            }
        }
        if (integerArr.length === 1) {
            return integerArr[0];
        }

        let solution = 0;

        for (let i = 0; i < integerArr.length - 1; i++) {
            if (second_order.includes(operationArr[i]) && solution === 0) {
                solution = operate(operationArr[i], integerArr[i], integerArr[i + 1]);
            } else {
                solution = operate(operationArr[i], solution, integerArr[i + 1]);
            }
        }

        console.log(`the solution is ${solution}`);

        return solution;
    }

    function operate(operation, value1, value2) {
        let solution;
        switch (operation) {
            case "+":
                solution = value1 + value2;
                break;
            case "-":
                solution = value1 - value2;
                break;
            case "*":
                solution = value1 * value2;
                break;
            case "/":
                solution = value1 / value2;
                break;
            case "%":
                solution = value1 % value2;
                break;
            default:
        }
        return solution;
    }

    function calculuate(display) {
        let equation = display.split("");

        if (OPERATION_ARR.includes(equation[equation.length - 1])) {
            displayError();
            return;
        }

        equation = removeDoubleNegatives(equation);
        equation = leadingNegative(equation);
        equation = plusMinus(equation);

        //check for parenthesis
        if (containsParenthesis(equation)) {
            do {
                equation = simplifyEquation(equation);

            } while (containsParenthesis(equation))
            //if there are double parenthesis, then we have to preform those operations first
        }

        //at this point there are no parenthesis


        let operationsIndexArr = findOperations(equation);
        let { integerArr, operationArr } = findIntegerOperationArr(equation, operationsIndexArr);
        let solution = solve(integerArr, operationArr);

        console.log(`This is the final solution: ${solution}`);

    }

    const handleIntegerClick = (event) => {

        switch (event.target.value) {
            case 'AC':
                setDisplay('');
                setContainsError(false);
                break;
            case '=':
                calculuate(display);
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
            {containsError && <div>ERROR</div>}
        </div>
    )
}

export default CalculatorContainer;
