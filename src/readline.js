const prompt = require("prompt-sync")();
const readline = require("readline");
var fs = require("fs");
var lines = fs.readFileSync("./DNIT-Distancias.csv").toString().split("\r\n");
var citynames = lines.shift().split(";");
var cities = new Map();

function message(msg, timems) {
  var time = timems == undefined ? 900 : timems;
  console.log("\nSistema:", msg);
  sleep(time);
}

function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

function wait() {
  let p = prompt("Pressione Enter para retornar...");
}

do {
  console.clear();
  console.log("- Selecione uma opção: \n");
  console.log("1 - Consultar Trechos x Modalidade");
  console.log("2 - Cadastrar Transporte");
  console.log("3 - Dados Estatísticos");
  console.log("4 - Finalizar o Programa\n");
  var select = Number(prompt("Opção: "));

  const itens = {
    Celular: { peso: 0.5 },
    Geladeira: { peso: 60 },
    Freezer: { peso: 100 },
    Cadeira: { peso: 5 },
    Luminaria: { peso: 0.8 },
    LavaRoupas: { peso: 120 },
  };
  const quantities = {};

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
  const trucks = {
    small_truck: {
      weight: 1000,
      cost: 4.87,
      name: "Pequeno porte ",
    },

    medium_truck: {
      weight: 4000,
      cost: 11.92,
      name: "Médio porte ",
    },

    large_truck: {
      weight: 10000,
      cost: 27.44,
      name: "Grande porte ",
    },
  };

  lines.forEach((line, index) => {
    var distances = line.split(";");
    var curr = new Map();
    citynames.forEach((city, pos) => {
      //  console.log(city);
      curr.set(city, Number(distances[pos]));
    });
    cities.set(citynames[index], curr);
  });
  switch (select) {
    case 1:
      var allCities = citynames;
      console.log(
        "Caminhões disponíveis: ",
        "[1] ",
        trucks.small_truck.name,
        ",",
        "[2] ",
        trucks.medium_truck.name,
        ",",
        "[3] ",
        trucks.large_truck.name
      );
      var chose = Number(prompt("Escolha uma modalidade de transporte: "));
      switch (chose) {
        case 1:
          var truckName = trucks.small_truck.name;
          var truckSelected = trucks.small_truck.cost;
          break;
        case 2:
          var truckName = trucks.medium_truck.name;
          var truckSelected = trucks.medium_truck.cost;
          break;
        case 3:
          var truckName = trucks.large_truck.name;
          var truckSelected = trucks.large_truck.cost;
          break;
      }
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
            "A cidade " +
              text +
              " não existe no nosso sistema, tente novamente: "
          );
          return false;
        }
      }

      var firstCity = null;
      var secondCity = null;
      var stopCity = null;

      while (control != true) {
        if (firstCity === null || firstCity == false) {
          var cityName = prompt("Digite a cidade de partida: ");
          firstCity = citieConfirmation(cityName.toUpperCase(), allCities, 0);
        } else {
          if (secondCity === null || secondCity == false) {
            var cityName = prompt("Digite a cidade de destino: ");
            secondCity = citieConfirmation(
              cityName.toUpperCase(),
              allCities,
              1
            );
          } else {
            control = true;
          }
        }
      }
      distance = cities
        .get(citiesA[1].toUpperCase())
        .get(citiesA[0].toUpperCase());

      // const truck = chooseTruck(distance);
      const totalCost = truckSelected * distance;

      console.log(
        "De " +
          citiesA[0].toUpperCase() +
          " para " +
          citiesA[1].toUpperCase() +
          " utilizando um " +
          truckName +
          " a distância é de " +
          distance +
          "KM " +
          " e o custo será de R$ " +
          totalCost.toLocaleString("pt-BR")
      );
      sleep(1000);
      wait();
      break;

    case 2:
      var allCities = citynames;
      console.log("Cidades Disponíveis: ", allCities);
      var control = false;
      var citiesA = [];
      function citieConfirmation(text, cities, index) {
        if (cities.includes(text)) {
          citiesA[index] = text;
          return true;
        } else {
          control = false;

          console.log(
            "A cidade " +
              text +
              " não existe no nosso sistema, tente novamente: "
          );
          return false;
        }
      }

      // let quantidade = prompt("Quantas paradas vai fazer?:");

      // quantidade = parseInt(quantidade);

      // let contCity = 0;
      // while (contCity <= quantidade) {
      //   contCity++;
      // }

      while (control != true) {
        if (firstCity === null || firstCity == false) {
          var cityName = prompt("Digite a cidade de partida: ");
          firstCity = citieConfirmation(cityName.toUpperCase(), allCities, 0);
        } else if (secondCity === null || secondCity == false) {
          var cityName = prompt("Digite a parada: ");
          secondCity = citieConfirmation(cityName.toUpperCase(), allCities, 1);
        } else if (stopCity === null || stopCity == false) {
          var cityName = prompt("Digite a cidade de destino final: ");
          stopCity = citieConfirmation(cityName.toUpperCase(), allCities, 2);
        } else {
          control = true;
        }
      }
      distance = cities
        .get(citiesA[1].toUpperCase())
        .get(citiesA[0].toUpperCase());

      distanceStopToFinal = cities
        .get(citiesA[1].toUpperCase())
        .get(citiesA[2].toUpperCase());

      distanceTotal = distance + distanceStopToFinal;
      console.log(distanceTotal);
      sleep(1000);

      console.log("\n -- Cadastra: \n");
      var controle = true;
      while (controle) {
        for (const item of Object.keys(itens)) {
          const quantitie = parseInt(
            prompt(
              "- Qual a quantidade do item: " +
                "{" +
                item +
                "}" +
                " você irá transportar? "
            )
          );
          quantities[item] = quantitie;
        }
        var total = 0;

        for (const item of Object.keys(itens)) {
          total += itens[item].peso * quantities[item];
        }
        wait();
        controle = false;
      }

      // console.log(
      //   "De " +
      //     citiesA[1].toUpperCase() +
      //     " para " +
      //     citiesA[0].toUpperCase() +
      //     " a distância a ser percorrida é de " +
      //     distance +
      //     "KM" +
      //     " para os transportes dos produtos: (need)" +
      //     " será necessário utilizar um " +
      //     chooseTruck(total).message +
      //     " o valor para o transporte dos itens é de: R$" +
      //     chooseTruck(total).cost * distance.toLocaleString("pt-BR")
      // );

      wait();
      break;

    case 3:
      break;

    case 4:
      console.clear();
      process.exit(0);
      break;
    default:
      message("Pedido Inválido, tente novamente...");
  }
} while ((option = 4));
