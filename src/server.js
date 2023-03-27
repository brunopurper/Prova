var fs = require("fs");
var lines = fs.readFileSync("./DNIT-Distancias.csv").toString().split('\r\n');
var citynames = lines.shift().split(';');
var cities = new Map();
var prompt = require('prompt-sync')();

// console.log(citynames);

lines.forEach((line, index) => {
    var distances = line.split(';');
    var curr = new Map();
    citynames.forEach((city, pos) => {
        //  console.log(city);
        curr.set(city, Number(distances[pos]));
    });
    cities.set(citynames[index], curr);
})

//  console.log(cities.get('ARACAJU'));

var allCities = citynames;
console.log('Cidades Disponíveis: ',allCities)
var control = false;

function citieConfirmation(text, array) {
  if (array.includes(text)) {
    control = true;
  } else {
    control = false;
    console.log('A cidade ' + text + ' não existe no nosso sistema, tente novamente: ');
  }
}



while (control != true) {
  var firstCity  =  prompt('Digite a cidade de partida: ');
  citieConfirmation(firstCity.toUpperCase(), allCities)
  var secondCity = prompt('Digite a cidade de destino: ');
  citieConfirmation(secondCity.toUpperCase(), allCities)
}









  // ARACAJU
  // BELEM
  // BELO HORIZONTE
  // BRASILIA
  // CAMPO GRANDE
  // CUIABA
  // CURITIBA
  // FLORIANOPOLIS
  // FORTALEZA
  // GOIANIA
  // JOAO PESSOA
  // MACEIO
  // MANAUS
  // NATAL
  // PORTO ALEGRE
  // PORTO VELHO
  // RECIFE
  // RIO BRANCO
  // RIO DE JANEIRO
  // SALVADOR
  // SAO LUIS
  // SAO PAULO
  // TERESINA
  // VITORIA
