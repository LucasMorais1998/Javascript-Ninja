/*
Essa semana você terá dois desafios:
1) Revisar todo o contéudo passado até aqui, e ver se você realmente entendeu
tudo o que foi passado! Se tiver dúvidas, anote, e então abra issues,
ou comente no seu pull request mesmo, que eu irei ajudá-lo a entender
o que não ficou tão claro das aulas anteriores.
É essencial que você entenda todo o conteúdo que foi passado até aqui,
para que possamos prosseguir para a parte mais avançada do curso :D

2) Estudar eventos!
Acesse a página do MDN:
https://developer.mozilla.org/en-US/docs/Web/Events#Categories

Tente aplicar na prática alguns dos eventos que estão ali e coloque nesse
desafio os experimentos legais que você conseguir desenvolver :D
*/

let changeBtn = document.querySelector('[data-js="change-btn"]');
let hideBtn = document.querySelector('[data-js="hide-btn"]');
let showBtn = document.querySelector('[data-js="show-btn"]');

let img = document.querySelector('[data-js="image"]');

changeBtn.addEventListener("click", () => {
  window.location.reload();
});

hideBtn.addEventListener("click", () => {
  img.style.visibility = "hidden";
});

showBtn.addEventListener("click", () => {
  img.style.visibility = "visible";
});
