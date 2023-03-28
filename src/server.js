var fs = require("fs");
var lines = fs.readFileSync("./DNIT-Distancias.csv").toString().split("\r\n");
var citynames = lines.shift().split(";");
var cities = new Map();
var prompt = require("prompt-sync")();

function wait() {
  let p = prompt("Pressione Enter para retornar...");
}

lines.forEach((line, index) => {
  var distances = line.split(";");
  var curr = new Map();
  citynames.forEach((city, pos) => {
    //  console.log(city);
    curr.set(city, Number(distances[pos]));
  });
  cities.set(citynames[index], curr);
});

var allCities = citynames;
console.log("Cidades Disponíveis: ", allCities);
var control = false;
var citiesA = [];
function citieConfirmation(text, cities, index) {
  if (cities.includes(text)) {
    citiesA[index] = text;
    return true;
  } else {
    // control = false;

    console.log(
      "A cidade " + text + " não existe no nosso sistema, tente novamente: "
    );
    return false;
  }
}

var firstCity = null;
var secondCity = null;

while (control != true) {
  if (firstCity === null || firstCity == false) {
    var cityName = prompt("Digite a cidade de partida: ");
    firstCity = citieConfirmation(cityName.toUpperCase(), allCities, 0);
  } else {
    if (secondCity === null || secondCity == false) {
      var cityName = prompt("Digite a cidade de destino: ");
      secondCity = citieConfirmation(cityName.toUpperCase(), allCities, 1);
    } else {
      control = true;
    }
  }
}
distance = cities.get(citiesA[1].toUpperCase()).get(citiesA[0].toUpperCase());

const trucks = {
  small_truck: {
    weight: 1000,
    cost: 4.87,
  },

  medium_truck: {
    weight: 4000,
    cost: 11.92,
  },

  large_truck: {
    weight: 10000,
    cost: 27.44,
  },
};

function chooseTruck(weight) {
  if (weight <= trucks.small_truck.weight) {
    var truckCost = trucks.small_truck.cost;
    return {
      message: "Caminhão de pequeno porte",
      cost: truckCost,
    };
  }
  if (weight <= trucks.medium_truck.weight) {
    var truckCost = trucks.medium_truck.cost;
    return {
      message: "Caminhão de médio porte",
      cost: truckCost,
    };
  }
  if (weight <= trucks.large_truck.weight) {
    var truckCost = trucks.large_truck.cost;
    return {
      message: "Caminhão de grande porte",
      cost: truckCost,
    };
  }
  return {
    message: "Não temos caminhão disponível para esse trajeto",
    cost: 0,
  };
}

const truck = chooseTruck(distance);

const totalCost = truck.cost * distance;

console.log(
  "De " +
    citiesA[1].toUpperCase() +
    " para " +
    citiesA[0].toUpperCase() +
    " utilizando um " +
    truck.message +
    " a distância é de " +
    distance +
    "KM " +
    " e o custo será de R$ " +
    totalCost.toLocaleString("pt-BR")
);
