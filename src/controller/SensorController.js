import LedService from './LedService';
const axios = require('axios');
const rpio = require('rpio');
var leituraEmExecucao = false;
var controleLeitura = false;
const sensor = 3;
rpio.open(sensor, rpio.INPUT, rpio.PULL_UP, rpio.BCM);

export default {

   async iniciaLeitura(req, res) {
      console.log('Iniciou');
      if (!controleLeitura) {
         const { idEquipamento, ipServerCEPP, nomeAplicacao, objetoRequisicaoRest, portaServidor, protocoloComunicacao } = req.body;
         const data = { idEquipamento, ipServerCEPP, nomeAplicacao, objetoRequisicaoRest, portaServidor, protocoloComunicacao };
         console.log(data);
         let porta = data.portaServidor == 0 ? '' : ':' + data.portaServidor
         const url = `${data.protocoloComunicacao}://${data.ipServerCEPP}${porta}/${data.nomeAplicacao}/${data.objetoRequisicaoRest}?1,${data.idEquipamento}`;
         console.log('URL: ' + url);
         var sensorState = 0;
         var sensorLock = 1;
         var click = 0;
         controleLeitura = true;
         leituraEmExecucao = true;

         const leitura = setInterval(() => {
            sensorState = rpio.read(sensor)
            if (sensorState == 0 && sensorLock == 0) {
               try {
                  LedService.acendeLed('ledverde');
                  click++;
                  console.log('clicou no botão ' + click);
                  sensorLock = 1;
                  axios.get(url)
                     .catch(function (error) {
                        console.log(error);
                     });
               } catch (ex) {
                  console.error("outer", ex.message);
                  LedService.acendeLed('ledvermelho');
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
         return res.send('Leitura do sensor pausada');
      } else {
         return res.send('Não existe leitura em andamento!');
      }
   }
};
