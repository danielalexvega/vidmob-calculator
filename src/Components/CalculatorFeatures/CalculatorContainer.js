import React, { useState } from 'react';

import IntegerKeypad from './IntegerKeypad';
import OptionsContainer from './OptionsContainer';
import OperationContainer from './OperationContainer';
import CalculatorDisplay from './CalculatorDisplay';

import "./CalculatorContainer.css";

import OPERATION_ARR from '../SharedStatic/OPERATION_ARR';

import {
    removeDoubleNegatives,
    leadingNegative,
    plusMinus, findOperations,
    findIntegerOperationArr,
    solveSetup,
    solve,
    handleDecimals,
    handleFactorial
} from "../Functions/functions";

const CalculatorContainer = () => {
    const [display, setDisplay] = useState('');
    const [containsError, setContainsError] = useState(false);

    function containsParenthesis(equation) {
        let validEquation = false;
        let containsFrontParenthesis = false;
        for (let i = 0; i < equation.length - 1; i++) {
            if (equation[i] === ")" && !containsFrontParenthesis) {
                displayError();
                return;
            }

            if (equation[i] === "(") {
                containsFrontParenthesis = true;
                for (let j = i + 1; j < equation.length; j++) {
                    if (equation[j] === ")") {
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

    function displayError() {
        setContainsError(true);
        setDisplay("Error");
    }

    function checkForMultipleOperations(equation) {
        for (let i = 0; i < equation.length - 1; i++) {
            if (OPERATION_ARR.includes(equation[i])
                && (equation[i] !== "-" && equation[i] !== "!")
                && OPERATION_ARR.includes(equation[i + 1])
                && equation[i + 1] !== "-") {
                displayError();
            }
        }
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

    //This function is called when the "=" is pressed
    function calculuate(display) {
        //turn the display state into a string
        let equation = display.split("");

        //if the last value is an operation, throw an error
        if (OPERATION_ARR.includes(equation[equation.length - 1])
            && equation[equation.length - 1] !== "!") {
            displayError();
            return;
        }

        checkForMultipleOperations(equation);

        equation = removeDoubleNegatives(equation); //remove double negatives
        equation = leadingNegative(equation); //remove leading negative
        equation = plusMinus(equation); // turn any "+-" to -
        equation = handleDecimals(equation);

        if(equation.includes("!")) {
            handleFactorial(equation);
        }


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

        if(isNaN(solution)) {
            displayError();
            return;
        }
        setDisplay(solution);

    }

    const handleInput = event => {
        setDisplay(() => event.target.value);
    }

    const handleSubmit = (event) => {
        console.log(event.key);
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
            case 'Del':
                setDisplay(()=> display.toString().substring(0, display.length - 1));
                break;
            default:
                setDisplay(() => display + event.target.value);
                break;
        }
    }


    return (
        <div className="calculator__container">
            <CalculatorDisplay display={display} handleInput={handleInput} onSubmit={handleSubmit} />
            <div className="integer-operation__container">
                <OptionsContainer handleOptionsClick={handleIntegerClick} />
                <IntegerKeypad handleButtonClick={handleIntegerClick} />
                <OperationContainer handleButtonClick={handleIntegerClick} />
            </div>
            {containsError && <div className="error">
                <h4>ERROR</h4>
                <p>No worries, just hit "AC" and try again!</p>
            </div>}
        </div>
    )
}

export default CalculatorContainer;
