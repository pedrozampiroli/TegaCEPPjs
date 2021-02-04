import SensorController from './controller/SensorController';
import LedController from './controller/LedController';
const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.send('OK'));

routes.get('/acendeverde', LedController.acendeVerde);
routes.get('/acendeamarelo', LedController.acendeAmarelo);
routes.get('/acendevermelho', LedController.acendeVermelho);
routes.get('/apagaverde', LedController.apagaVerde);
routes.get('/apagaamarelo', LedController.apagaAmarelo);
routes.get('/apagavermelho', LedController.apagaVermelho);
routes.get('/encerraleitura', SensorController.paraLeitura);
routes.post('/inicialeitura', SensorController.iniciaLeitura);

module.exports = routes;

// routes.post('/inicialeitura', (req, res) => {

//   const {
//     idEquipamento,
//     ipServerCEPP,
//     nomeAplicacao,
//     objetoRequisicaoRest,
//     portaServidor,
//     protocoloComunicacao
//   } = req.body;

//   const data = {
//     idEquipamento,
//     ipServerCEPP,
//     nomeAplicacao,
//     objetoRequisicaoRest,
//     portaServidor,
//     protocoloComunicacao
//   };

//   var sensorState = 0;
//   var sensorLock = 1;
//   var click = 0;

//   rpio.write(LEDverde, rpio.LOW)
//   rpio.write(LEDamarelo, rpio.LOW)
//   rpio.write(LEDvermelho, rpio.LOW)
//   rpio.write(ligaRele, rpio.LOW)
//   ledStateControll = false;
//   controleLeitura = true;
//   leituraEmExecucao = true;

//   console.log(req.body);

//   const leitura = setInterval(() => {
//     sensorState = rpio.read(sensor)
//     if (sensorState == 0 && sensorLock == 0) {
//       try {
//         rpio.write(LEDverde, rpio.HIGH);
//         click++;
//         console.log('clicou no botão ' + click);
//         rpio.write(LEDverde, rpio.LOW)
//         sensorLock = 1;
//         axios.get('http://192.168.100.87:8081/TegaCEPPJava/servlet/com.tegacepp.core.atualizadistancia?1,33')
//           .then(function (response) {
//             //console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           })
//           .then(function () {
//           });
//         rpio.write(LEDverde, rpio.LOW);
//       } catch (ex) {
//         console.error("outer", ex.message);
//       }
//     }

//     if (sensorState == 1 && sensorLock == 1) {
//       sensorLock = 0
//     }

//     if (!controleLeitura) {
//       console.log('Parando leitura!');
//       rpio.write(ligaRele, rpio.LOW)
//       leituraEmExecucao = false;
//       clearInterval(leitura);
//     }
//   }, 10);

//   res.send('Leitura do sensor iniciada');

// });

// routes.get('/encerraleitura', (req, res) => {
//   controleLeitura = false;
//   if (leituraEmExecucao) {
//     rpio.write(LEDamarelo, rpio.HIGH)
//     res.send('Leitura do sensor pausada');
//   } else {
//     res.send('Não existe leitura em andamento!');
//   }
// });