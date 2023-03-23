const trucks = {

    small_truck: {
        weight: "1000",
        cost: "4.87"
    },

    medium_truck: {
        weight: "4000",
        cost: "11.92"
    },

    large_truck: {
        weight: "10000",
        cost: "27.44"
    }
}

const itens = {
    phone: "0.5",
    refrigerator: "60",
    freezer: "100",
    chair: "5",
    lamps: "0.8",
    washingMachine: "120"
}


function chooseTruck(weight) {
    if (weight <= 1000) {
      return 'Caminhão de pequeno porte';
    } else if (weight <= 4000) {
      return 'Caminhão de médio porte';
    } else if (weight <= 10000) {
      return 'Caminhão de grande porte';
    } else {
      return 'Não temos frota disponível para esse peso.';
    }
  }

  const loadWeight = 2500;
  const truck = chooseTruck(loadWeight);
  console.log(truck);



function sections(city1, city2, ) {

  }