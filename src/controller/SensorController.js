import LedController from './LedController'
const axios = require('axios');
const rpio = require('rpio');
var leituraEmExecucao = false;
var controleLeitura = false;
const sensor = 3;
rpio.open(sensor, rpio.INPUT, rpio.PULL_UP_DOWN, rpio.BCM);


/* remover futuramente */
const LEDverde   = 35;
const LEDamarelo = 37;
rpio.open(LEDverde, rpio.OUTPUT, rpio.LOW);
rpio.open(LEDamarelo, rpio.OUTPUT, rpio.LOW);
/**********************/

export default {

  async iniciaLeitura(req, res) {
    console.log('Iniciou');
    if (!controleLeitura) {
      const { idEquipamento, ipServerCEPP, nomeAplicacao, objetoRequisicaoRest, portaServidor, protocoloComunicacao } = req.body;
      const data = { idEquipamento, ipServerCEPP, nomeAplicacao, objetoRequisicaoRest, portaServidor, protocoloComunicacao };
      let porta = data.portaServidor == 0 ? '' : ':' + data.portaServidor
      const url = `${data.protocoloComunicacao}://${data.ipServerCEPP}${porta}/${data.nomeAplicacao}/${data.objetoRequisicaoRest}?1,${data.idEquipamento}`;
      var sensorState = 0;
      var sensorLock = 1;
      var click = 0;
      controleLeitura = true;
      leituraEmExecucao = true;

      const leitura = setInterval(() => {
        sensorState = rpio.read(sensor)
        if (sensorState == 0 && sensorLock == 0) {
          try {
            //LedController.acendeVerde();
            rpio.write(LEDverde, rpio.HIGH);
            click++;
            console.log('clicou no botão ' + click);
            sensorLock = 1;
            axios.get(url)
              .catch(function (error) {
                console.log(error);
              });
              //LedController.apagaVerde();
              rpio.write(LEDverde, rpio.LOW);
          } catch (ex) {
            console.error("outer", ex.message);
          }
        }
        if (sensorState == 1 && sensorLock == 1) {
          sensorLock = 0
        }
        if (!controleLeitura) {
          console.log('Parando leitura!');
          leituraEmExecucao = false;
          clearInterval(leitura);
        }
      }, 10);
      return res.send('Leitura do sensor iniciada');
    } else {
      return res.send('Leitura do equipamento já em execução!');
    }
  },

  async paraLeitura(req, res) {
    controleLeitura = false;
    if (leituraEmExecucao) {
      //LedController.acendeAmarelo();
      rpio.write(LEDamarelo, rpio.HIGH);
      return res.send('Leitura do sensor pausada');
    } else {
      return res.send('Não existe leitura em andamento!');
    }
  }
};
