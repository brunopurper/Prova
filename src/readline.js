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

function getStringCaminhoes(cntSmall, cntMedium, cntLarge) {
  var ret = "";
  if (cntSmall > 0) {
    ret +=
      cntSmall > 1
        ? `${cntSmall} caminhões pequenos`
        : `${cntSmall} caminhão pequeno`;
  }
  if (cntMedium > 0) {
    ret += ret.length > 0 ? ", " : "";
    ret +=
      cntMedium > 1
        ? `${cntMedium} caminhões médios`
        : `${cntMedium} caminhão médio`;
  }
  if (cntLarge > 0) {
    ret += ret.length > 0 ? ", " : "";
    ret +=
      cntLarge > 1
        ? `${cntLarge} caminhões grandes`
        : `${cntLarge} caminhão grande`;
  }
  return ret;
}

function citieConfirmation(text, cities, index) {
  if (cities.includes(text)) {
    citiesA[index] = text;
    return true;
  } else {
    console.log(
      `A cidade ${text} não existe no nosso sistema, tente novamente: `
    );
    return false;
  }
}
const arrayEstatistc = [];
const itens = {
  Celular: { peso: 0.5 },
  Geladeira: { peso: 60 },
  Freezer: { peso: 100 },
  Cadeira: { peso: 5 },
  Luminaria: { peso: 0.8 },
  LavaRoupas: { peso: 120 },
};
const quantities = {};


const trucks = {
  small_truck: {
    weight: 1000,
    cost: 4.87,
    name: "Pequeno porte",
  },

  medium_truck: {
    weight: 4000,
    cost: 11.92,
    name: "Médio porte",
  },

  large_truck: {
    weight: 10000,
    cost: 27.44,
    name: "Grande porte",
  },
};

do {
  console.clear();
  console.log("- Selecione uma opção: \n");
  console.log("1 - Consultar Trechos x Modalidade");
  console.log("2 - Cadastrar Transporte");
  console.log("3 - Dados Estatísticos");
  console.log("4 - Finalizar o Programa\n");
  var select = Number(prompt("Opção escolhida => "));
  console.log("\n")

  lines.forEach((line, index) => {
    var distances = line.split(";");
    var curr = new Map();
    citynames.forEach((city, pos) => {
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
        trucks.large_truck.name ,"\n"
      );
      var chose = Number(prompt("Escolha uma modalidade de transporte disponível acima: "));
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
      console.log("\n")
      console.log("Cidades Disponíveis para trajeto: ", allCities);
      var control = false;
      var citiesA = [];
      var firstCity = null;
      var secondCity = null;

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
      console.log("\n")
      distance = cities
        .get(citiesA[1].toUpperCase())
        .get(citiesA[0].toUpperCase());

      const totalCost = truckSelected * distance;

      console.log(
      `De ${citiesA[0].toUpperCase()} para ${citiesA[1].toUpperCase()} utilizando um Caminhão de ${truckName} a distância é de ${distance} KM, e o custo total da viagem será de R$ ${totalCost.toLocaleString("pt-BR")}`
      );
      sleep(1000);
      wait();
      break;

    case 2:
      var allCities = citynames;
      console.log("Cidades Disponíveis: ", allCities);
      var control = false;
      var citiesA = [];


      let quantidade = prompt("Quantas paradas vai fazer?:");
      let arrayMultipleCities = [];
      let arrayMultipleDistances = [];
      let arrayMultipleProducts = [];
      let arrayProductQuantities = [];
      // console.log(cities.get("ARACAJU"));
      for (var i = 0; i <= quantidade; i++) {
        var multipleCities = prompt("Qual a cidade: ");
        var aa = citieConfirmation(multipleCities.toUpperCase(), allCities);
        if (aa) {
          arrayMultipleCities.push(multipleCities.toString().toUpperCase());

          if (arrayMultipleCities.length >= 2) {
            arrayMultipleDistances.push(
              cities
                .get(arrayMultipleCities[arrayMultipleCities.length - 2])
                .get(multipleCities.toString().toUpperCase())
            );
          }
        } else {
          i--;
        }
      }
      const fullDistance = arrayMultipleDistances.reduce((a, b) => a + b);

      sleep(1000);

      console.log("\n -- Cadastra: \n");
      var controle = true;
      while (controle) {
        for (const item of Object.keys(itens)) {
          const quantitie = parseInt(
            prompt(
              `Qual a quantidade do (${item}), você irá transportar? `
            )
          );
          quantities[item] = quantitie;
          if (quantities[item] > 0) {
            arrayMultipleProducts.push(item);
          }
          arrayProductQuantities.push(quantitie);
        }
        var total = 0;

        for (const item of Object.keys(itens)) {
          total += itens[item].peso * quantities[item];
        }
        wait();
        controle = false;
      }
      for (i = 0; i < arrayMultipleCities.length - 1; i++) {
        console.log(`De ${arrayMultipleCities[i]} => ${arrayMultipleCities[i + 1]} a Distância é de: ${arrayMultipleDistances[i]}`);}

      //Verificação do melhor custo de transporte
      var cntSmall = 0;
      var cntMedium = 0;
      var cntLarge = 0;

      if (total % 10000 == 0) {
        cntLarge = total / 10000;
        total = 0;
      }

      if (total % 4000 == 0) {
        cntMedium = total / 4000;
        total = 0;
      }

      while (total > 0) {
        if (total > 8000) {
          cntLarge++;
          // bestTruck = "1" + large_truck.name;
          total -= 10000;
        } else if (total > 2000) {
          cntMedium++;
          // bestTruck = "1" + medium_truck.name;
          total -= 4000;
        } else {
          cntSmall++;
          // bestTruck = "2" + small_truck.name;
          total -= 1000;
        }
      }
      var finalCost = cntSmall * 4.87 + cntMedium * 11.92 + cntLarge * 27.44;
      var costPart = [];

      for (var distParts of arrayMultipleDistances) {
          costPart.push(distParts*finalCost);
      }
      var fullCost = finalCost * fullDistance
      var estatistc = `De ${arrayMultipleCities[0]} para ${arrayMultipleCities[arrayMultipleCities.length - 1]} a distância a ser percorrida é de ${fullDistance} KM para transporte dos produtos ${arrayMultipleProducts.toString()} será necessário utilizar ${getStringCaminhoes(cntSmall, cntMedium, cntLarge)} de forma a resultar o menor custo de transporte por km rodado. O valor total do transporte dos itens é de R$ ${(fullCost).toLocaleString("pt-BR")} sendo R$ ${finalCost} é o custo unitário médio por KM.`;
      console.log(estatistc);
      var dataEstatstic = {
        total: fullCost, // Total gasto
        parts: costPart, // Custo total de cada trecho
        averageKm: finalCost, // Custo media por quilometro
        averageParts: fullCost / arrayMultipleDistances.length, // Media de custo por trecho
        averageType: fullCost / arrayMultipleProducts.length, // Media de custo por tipo de produto
        totalSmall: cntSmall * 4.87, // custo Total de caminhaos pequenos
        totalMed: cntMedium * 11.92, // custo Total de caminhao medio
        totalLar: cntLarge * 27.44, // custo Total de caminhao grande
        small: cntSmall, // caminhao pequeno
        medium: cntMedium, // caminhao medio
        large: cntLarge, // caminhao grande
        totalProducts: arrayProductQuantities.reduce((partialSum, a) => partialSum + a, 0), // Quantidade de produtos
      }
      arrayEstatistc.push(dataEstatstic);
      wait();
      break;

    case 3:
      // console.log(arrayEstatistc);
      for (var estatistica of arrayEstatistc) {
        console.log(`
        Custo Total: ${estatistica.total}

        Custo de cada trecho: ${estatistica.parts}

        Custo médio do quilometro: ${estatistica.averageKm}

        Custo medio por trecho: ${estatistica.averageParts}

        Custo medio por tipo de produto: ${estatistica.averageType}

        Custo dos caminhões pequenos: ${estatistica.totalSmall}

        Custo dos caminhões médios: ${estatistica.totalMed}

        Custo dos caminhões grandes: ${estatistica.totalLar}

        Total de caminhões pequenos: ${estatistica.small}

        Total de caminhões  médios: ${estatistica.medium}

        Total de caminhões grandes: ${estatistica.large}

        Quantidade total de produtos: ${estatistica.totalProducts}`)
        }
      wait();
      break;

    case 4:
      console.clear();
      process.exit(0);
      break;
    default:
      message("Pedido Inválido, tente novamente...");
  }
} while ((option = 4));
