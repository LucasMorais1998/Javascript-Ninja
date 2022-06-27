/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/

let input = document.querySelector('[data-js="input"]');
let view = document.querySelector('[data-js="view"]');
let viewOperator = document.querySelector('[data-js="operator"]');

let buttonsNumbers = document.querySelectorAll('[data-js="button-number"]');
let buttonOperators = document.querySelectorAll('[data-js="button-operator"]');

let buttonCE = document.querySelector('[data-js="button-ce"]');
let buttonC = document.querySelector('[data-js="button-c"]');
let buttonDEL = document.querySelector('[data-js="button-del"]');
let buttonEqual = document.querySelector('[data-js="button-equal"]');

Array.prototype.forEach.call(buttonsNumbers, (btn) => {
  btn.addEventListener("click", handleClickNumber, false);
});

Array.prototype.forEach.call(buttonOperators, (btn) => {
  btn.addEventListener("click", handleClickOperation, false);
});

buttonCE.addEventListener("click", handleClickCE, false);
buttonC.addEventListener("click", handleClickC, false);
buttonDEL.addEventListener("click", handleClickDEL, false);

buttonEqual.addEventListener("click", handleClickEqual, false);

function handleClickNumber() {
  if (input.value === "0") {
    input.value = "";
  }

  input.value += this.value;
}

function handleClickOperation() {
  input.value = removeLastItemIfItIsAnOperator(input.value);

  input.value += this.value;
}

function handleClickCE() {
  input.value = "0";
}

function handleClickC() {
  view.innerHTML = "";
  input.value = "0";
}

function handleClickDEL() {
  input.value = input.value.slice(0, -1);

  if (input.value == "") {
    input.value = "0"
  }
}

function handleClickEqual() {
  input.value = removeLastItemIfItIsAnOperator(input.value);

  const allValues = input.value.match(/\d+[+-×÷]?/g);
  input.value = allValues.reduce((accumulated, actual) => {
    let firstValue = accumulated.slice(0, -1);
    let lastValue = removeLastItemIfItIsAnOperator(actual);
    let operator = accumulated.split("").pop();
    let lastOperator = isLastItemAnOperation(actual)
      ? actual.split("").pop()
      : "";

    switch (operator) {
      case "+":
        view.textContent = `${firstValue} ${operator} ${lastValue} =`;
        return Number(firstValue) + Number(lastValue) + lastOperator;


      case "-":
        return Number(firstValue) - Number(lastValue) + lastOperator;

      case "×":
        return Number(firstValue) * Number(lastValue) + lastOperator;

      case "÷":
        return Number(firstValue) / Number(lastValue) + lastOperator;
    }
  });
}

function isLastItemAnOperation(number) {
  const operators = ["÷", "×", "-", "+"];

  let lastItem = number.split("").pop();

  return operators.some((operator) => {
    return operator === lastItem;
  });
}

function removeLastItemIfItIsAnOperator(number) {
  if (isLastItemAnOperation(number)) {
    return number.slice(0, -1);
  }

  return number;
}
