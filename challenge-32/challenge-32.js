(function ($, doc) {
  "use strict";

  /*
    Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados,
    salvando-os temporariamente na memória de um servidor.

    Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para
    que possamos utilizar para salvar as informações dos nossos carros.

    Para utilizá-lo, você vai precisar fazer o seguinte:

    - Via terminal, acesse o diretório `server`;
    - execute o comando `npm install` para instalar as dependências;
    - execute `node app.js` para iniciar o servidor.

    Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço:
    `http://localhost:3000`

    O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
    As mudanças que você irá precisar fazer no seu projeto são:

    - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
    `http://localhost:3000/car`
    - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
    os seguintes campos:
      - `image` com a URL da imagem do carro;
      - `brandModel`, com a marca e modelo do carro;
      - `year`, com o ano do carro;
      - `plate`, com a placa do carro;
      - `color`, com a cor do carro.

    Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

    Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
    do pull request.
  */

  let app = (function () {
    return {
      init: function init() {
        //console.log("app init");
        this.companyInfo();
        this.initEvents();
        this.apiGet();
      },

      initEvents() {
        $('[data-js="form-register"]').on("submit", this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        //console.log("submit");
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

        /* $tdRemove.appendChild($removeButton);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove); */

        this.apiPost(
          $tdImage.children.item(0).getAttribute("src"),
          $tdBrand.textContent,
          $tdYear.textContent,
          $tdPlate.textContent,
          $tdColor.textContent
        );

        return $fragment.appendChild($tr);
      },

      companyInfo: function companyInfo() {
        //console.log("company info");
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

      apiGet: function apiGet() {
        const ajax = new XMLHttpRequest();

        ajax.open("GET", "http://localhost:3000/car");
        ajax.send();

        ajax.addEventListener(
          "readystatechange",
          (e) => {
            if (this.isReady) {
              const data = JSON.parse(ajax.responseText);

              data.map((car) => {
                console.log(car);
                const fragment = document.createDocumentFragment();

                let tr = document.createElement("tr");
                let tdImage = document.createElement("td");
                let image = document.createElement("img");
                let tdBrand = document.createElement("td");
                let tdYear = document.createElement("td");
                let tdPlate = document.createElement("td");
                let tdColor = document.createElement("td");
                let tdRemove = document.createElement("td");
                let removeButton = document.createElement("button");

                let tableCar = document.querySelector('[data-js="table-car"]');

                removeButton.setAttribute("data-js", "removeBtn");
                removeButton.textContent = "Remover";
                removeButton.addEventListener("click", () => {
                  tr.removeChild(tdImage);
                  tr.removeChild(tdBrand);
                  tr.removeChild(tdYear);
                  tr.removeChild(tdPlate);
                  tr.removeChild(tdColor);
                  tr.removeChild(tdRemove);
                });

                image.setAttribute("src", car.image);

                tdImage.appendChild(image);
                tdBrand.textContent = car.brandModel;
                tdYear.textContent = car.year;
                tdPlate.textContent = car.plate;
                tdColor.textContent = car.color;

                tdRemove.appendChild(removeButton);

                tr.appendChild(tdImage);
                tr.appendChild(tdBrand);
                tr.appendChild(tdYear);
                tr.appendChild(tdPlate);
                tr.appendChild(tdColor);
                tr.appendChild(tdRemove);

                fragment.appendChild(tr);
                tableCar.appendChild(fragment);
              });
            }
          },
          false
        );
      },

      apiPost: function apiPost(image, brandModel, year, plate, color) {
        const ajax = new XMLHttpRequest();

        ajax.open("POST", "http://localhost:3000/car");
        ajax.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        ajax.send(
          `image=${image}&brandModel=${brandModel}&year=${year}&plate=${plate}&color=${color}`
        );


      },
    };
  })();

  app.init();

})(window.DOM, document);
