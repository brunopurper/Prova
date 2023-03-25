var fs = require("fs");
var lines = fs.readFileSync("./DNIT-Distancias.csv").toString().split('\r\n');
var citynames = lines.shift().split(';');
var cities = new Map();
// console.log(citynames);

lines.forEach((line, index) => {
    var distances = line.split(';');
    var curr = new Map();
    citynames.forEach((city, pos) => {
         console.log(city);
        curr.set(city, Number(distances[pos]));
    });
    cities.set(citynames[index], curr);
})

 console.log(cities);

var allCities = citynames;
console.log(allCities)

function citieConfirmation(text, array) {
  if (array.includes(text)) {
    console.log('O texto ' + text + ' existe no array.');
  } else {
    console.log('O texto ' + text + ' não existe no array.');
  }
}

//console.log(citieConfirmation('Porto Alegre', allCities))


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
