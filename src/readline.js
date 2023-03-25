const prompt = require('prompt-sync')()
const readline = require('readline');


function message(msg, timems) {
    var time = timems == undefined ? 900 : timems
    console.log("\nSistema:", msg)
    sleep(time)
}

function sleep(ms) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < ms);
}

function wait() {
    let p = prompt("Pressione Enter para retornar...")
}

do {
    console.clear()
    console.log("- Selecione uma opção: \n")
    console.log("1 - Consultar Trechos x Modalidade")
    console.log("2 - Cadastrar Transporte")
    console.log("3 - Dados Estatísticos")
    console.log("4 - Finalizar o Programa\n")
    var select = Number(prompt("Opção: "))


    const itens = {
      Celular: { peso: 0.5 },
      Geladeira: { peso : 60 },
      Freezer : { peso : 100 },
      Cadeira: { peso : 5 },
      Luminaria: { peso :0.8 },
      LavaRoupas: { peso :120 }
    }
    const quantities = {};

    switch(select) {
        case 1:
          console.log('-- Para melhor atender suas necessidades, primeiro me diga: \n')
          var controle = true;
          while(controle){
        for (const item of Object.keys(itens)) {
          const quantitie = parseInt(prompt('- Qual a quantidade do item: ' + item + ' você irá transportar? '));
          quantities[item] = quantitie
        }
        var total = 0;


          for(const item of Object.keys(itens)) {

            total += (itens[item].peso) * quantities[item];
          }
          console.log('O total de peso é ' + total + 'KG');
          wait()
          controle = false
        }

          break
        case 2:
            console.log("Exemplo: ")
            break
        case 3:
            break
        case 4:
            console.clear()
            process.exit(0);
            break
        default:
            message('Pedido Inválido, tente novamente...')
    }

} while (option = 4)


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



function sections(city1, city2, ) {

  }