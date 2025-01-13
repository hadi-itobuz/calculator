const input = document.getElementById("input");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const ac = document.getElementById("ac");
const evaluate = document.getElementById("evaluate");
const decimal = document.getElementById("decimal");
const clear = document.getElementById("clear");
const changeSign = document.getElementById("changeSign");
const percentage = document.getElementById("percentage");
let expression = [];

const evaluateExpression = () => {
    if (expression.length === 3) {
        const a = Number(expression[0]);
        const op = expression[1];
        const b = Number(expression[2]);
        let ret;
        if (op === "+") ret = a + b;
        else if (op === "-") ret = a - b;
        else if (op === "X") ret = a * b;
        else ret = a / b;
        return ret.toFixed(5);
    }
};

Array.from(numbers).forEach((number) => {
    number.addEventListener("click", () => {
        if (expression.length !== 1) {
            if (expression.length === 3) {
                console.log("expression :>> ", expression);
                input.value = "";
                expression = [];
            }
            if (
                (isNaN(input.value) || input.value === "Infinity") &&
                input.value !== "."
            ) {
                input.value = "";
            }

            if (number.innerHTML === "." && String(input.value).includes(".")) {
                console.log("double decimal");
                return;
            }
            input.value = input.value + number.innerHTML;
        } else {
            expression.push(input.value);
            input.value = number.innerHTML;
        }
    });
});

Array.from(operators).forEach((operator) =>
    operator.addEventListener("click", () => {
        if (expression.length === 0 && input.value !== "") {
            expression.push(input.value);
            input.value = operator.innerHTML;
        } else if (expression.length === 1) {
            input.value = operator.innerHTML;
        } else if (expression.length === 2) {
            expression.push(input.value);
            const ans = evaluateExpression();
            expression = []
            expression.push(ans)
            input.value = operator.innerHTML;
        }
        else if (
            expression.length === 3 &&
            input.value !== "Infinity" &&
            !isNaN(input.value)
        ) {
            expression = [];
            expression.push(input.value);
            input.value = operator.innerHTML;
        }
    })
);

evaluate.addEventListener("click", () => {
    if (expression.length === 2 && input.value !== "") {
        expression.push(input.value);
        const ans = evaluateExpression();
        input.value = ans;
    }
});

ac.addEventListener("click", () => {
    expression = [];
    input.value = "";
});

clear.addEventListener('click', () => {
    if (isNaN(input.value) || input.value === "Infinity") {
        ac.click();
    }
    else {
        input.value = String(input.value).slice(0, -1);
    }
})

changeSign.addEventListener('click', () => {
    if (!isNaN(input.value)) {
        input.value = -(Number(input.value));
    }
})

percentage.addEventListener('click', () => {
    if (!isNaN(input.value)) {
        input.value = Number(input.value) / 100;
    }
})