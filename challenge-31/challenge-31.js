(function ($, doc) {
  "use strict";

  /*
  Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.

  Ao clicar nesse botão, a linha da tabela deve ser removida.

  Faça um pull request no seu repositório, na branch `challenge-31`, e cole
  o link do pull request no `console.log` abaixo.

  Faça um pull request, também com a branch `challenge-31`, mas no repositório
  do curso, para colar o link do pull request do seu repo.
*/

  let app = (function () {
    return {
      init: function init() {
        console.log("app init");
        this.companyInfo();
        this.initEvents();
      },

      initEvents() {
        $('[data-js="form-register"]').on("submit", this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        let $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        const $fragment = doc.createDocumentFragment();
        let $tr = doc.createElement("tr");
        let $tdImage = doc.createElement("td");
        let $image = document.createElement("img");
        let $tdBrand = doc.createElement("td");
        let $tdYear = doc.createElement("td");
        let $tdPlate = doc.createElement("td");
        let $tdColor = doc.createElement("td");
        let $tdRemove = doc.createElement("td");
        let $removeButton = doc.createElement("button");

        $image.setAttribute("src", $('[data-js="image"]').get().value);
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;

        $removeButton.setAttribute("data-js", "removeBtn");
        $removeButton.textContent = "Remover";
        $removeButton.addEventListener("click", () => {
          $tr.removeChild($tdImage);
          $tr.removeChild($tdBrand);
          $tr.removeChild($tdYear);
          $tr.removeChild($tdPlate);
          $tr.removeChild($tdColor);
          $tr.removeChild($tdRemove);
        });

        $tdRemove.appendChild($removeButton);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove);

        return $fragment.appendChild($tr);
      },

      companyInfo: function companyInfo() {
        console.log("company info");
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "company.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this)) {
          return;
        }

        let data = JSON.parse(this.responseText);
        let $companyName = $('[data-js="company-name"]').get();
        let $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
    };
  })();

  app.init();
})(window.DOM, document);
