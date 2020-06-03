//querySelector => Busca o elemento select no html com o nome requerido
//addEventListener => Fica "escutando" qualquer evento emitido (selecionar o campo, mudar o campo, etc)


function getUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => response.json())
      .then(states => {
        
        for(const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
      });
}

getUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;

  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  fetch(url)
    .then(response => response.json())
    .then(cities => {
      
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }

      citySelect.disabled = false;
    });
}

document.querySelector('select[name=uf]').addEventListener("change", getCities);