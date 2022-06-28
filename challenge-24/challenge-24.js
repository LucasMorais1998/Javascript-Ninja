/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/

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

let visor = document.querySelector('[data-js="visor"]');
let smallVisor = document.querySelector('[data-js="small-visor"]');

let buttonsNumbers = document.querySelectorAll('[data-js="button-number"]');
let buttonsOperations = document.querySelectorAll(
  '[data-js="button-operator"]'
);
let buttonC = document.querySelector('[data-js="button-c"]');
let buttonDEL = document.querySelector('[data-js="button-del"]');
let buttonEqual = document.querySelector('[data-js="button-equal"]');

function initialize() {
  initEvents();
}

function initEvents() {
  Array.prototype.forEach.call(buttonsNumbers, (btn) => {
    btn.addEventListener("click", handleClickNumber, false);
  });
  Array.prototype.forEach.call(buttonsOperations, (btn) => {
    btn.addEventListener("click", handleClickOperation, false);
  });

  buttonC.addEventListener("click", handleClickC, false);
  buttonDEL.addEventListener("click", handleClickDEL, false);
  buttonEqual.addEventListener("click", handleClickEqual, false);
}

function handleClickNumber() {
  if (visor.value === "0") visor.value = "";

  visor.value += this.value;
}

function handleClickOperation() {
  visor.value = removeLastItemIfItIsAnOperator(visor.value);
  visor.value += this.value;
}

function handleClickC() {
  smallVisor.innerHTML = "";
  visor.value = "0";
}

function handleClickDEL() {
  visor.value = visor.value.slice(0, -1);

  if (visor.value == "") visor.value = "0";
}

function handleClickEqual() {
  visor.value = removeLastItemIfItIsAnOperator(visor.value);
  const allValues = visor.value.match(getRegexOperations());
  visor.value = allValues.reduce(calculateAllValues);


}

function getOperations() {
  return Array.prototype.map.call(buttonsOperations, (button) => {
    if (button.value === "-") return "\\-";

    return button.value;
  });
}

function getRegexOperations() {
  return new RegExp("\\d+[" + getOperations().join("") + "]?", "g");
}

function isLastItemAnOperation(number) {
  let operators = getOperations();
  let lastItem = number.split("").pop();

  return operators.some((operator) => {
    return operator === lastItem;
  });
}

function removeLastItemIfItIsAnOperator(string) {
  if (isLastItemAnOperation(string)) return string.slice(0, -1);

  return string;
}

function showExpressionInSmallVisor(firstValue, lastValue, operator) {
  smallVisor.textContent = `${firstValue} ${operator} ${lastValue} =`;
}

function doOperation(firstValue, lastValue, operator) {
  switch (operator) {
    case "+":
      showExpressionInSmallVisor(firstValue, lastValue, operator);
      return Number(firstValue) + Number(lastValue);

    case "-":
      showExpressionInSmallVisor(firstValue, lastValue, operator);
      return Number(firstValue) - Number(lastValue);

    case "x":
      showExpressionInSmallVisor(firstValue, lastValue, operator);
      return Number(firstValue) * Number(lastValue);

    case "÷":
      showExpressionInSmallVisor(firstValue, lastValue, operator);
      return Number(firstValue) / Number(lastValue);
  }
}

function getLastOperator(value) {
  return isLastItemAnOperation(value) ? value.split("").pop() : "";
}

function calculateAllValues(accumulated, actual) {
  let firstValue = accumulated.slice(0, -1);
  let lastValue = removeLastItemIfItIsAnOperator(actual);
  let operator = accumulated.split("").pop();
  let lastOperator = getLastOperator(actual);

  return doOperation(firstValue, lastValue, operator) + lastOperator;
}

initialize();
