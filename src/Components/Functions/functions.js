import OPERATION_ARR from "../SharedStatic/OPERATION_ARR";

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

function handleDecimals(equation) {
    for (let i = 0; i < equation.length - 1; i++) {
        if (equation[i] === ".") {
            //find the start of the decimal
            let startIndex = i - 1;
            if (startIndex >= 0) {
                while (startIndex > 0 && !OPERATION_ARR.includes(equation[startIndex])) {
                    startIndex--;
                }
            }
            let endIndex = i + 1;
            console.log(`ENDINDEX IS ${endIndex}`);
            while (endIndex < equation.length && !OPERATION_ARR.includes(equation[endIndex])) {
                endIndex++;
            }

            console.log(equation);
            console.log("DECIMAL");
            console.log(startIndex);
            console.log(endIndex);
            let decimal = "";
            for (let k = startIndex + 1; k < endIndex; k++) {
                decimal += equation[k];
            }
            equation.splice((startIndex + 1), (endIndex - startIndex - 1), decimal);
            console.log(equation);

            return equation;
        }
    }
    return equation;
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
            integerArr.push(parseFloat(tempInt, 10));
            tempInt = "";
        } else {
            operationArr.push(valueArr[i])
        }
    }
    integerArr.push(parseFloat(tempInt, 10));

    return { integerArr, operationArr };
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
            integerArr.push(parseFloat(tempInt, 10));
            tempInt = "";
        } else {
            operationArr.push(equation[i])
        }
    }
    integerArr.push(parseFloat(tempInt, 10));

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

function handleFactorial(equation) {
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === "!") {
            let startIndex = i - 1;
            if (startIndex >= 0) {
                while (startIndex > 0 && !OPERATION_ARR.includes(equation[startIndex])) {
                    startIndex--;
                }
            }

            let value = "";

            for(let j = startIndex; j < i; j++) {
                value += equation[j];
            }
            let length = value.length;
            value = parseFloat(value);
            let factorial = value;
            console.log(`the value is ${value}`);

            while(value > 2) {
                value--;
                factorial = factorial * value;
            }
            console.log(`the factorial is ${factorial}`);
            console.log(value.length);

            equation.splice((startIndex), length + 1, factorial);
            console.log(equation);

            return equation;
        }
    }
    return equation;
}



export { removeDoubleNegatives, leadingNegative, plusMinus, findOperations, findIntegerOperationArr, solveSetup, solve, handleDecimals, handleFactorial }