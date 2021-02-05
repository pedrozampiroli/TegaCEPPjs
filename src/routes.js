import SensorController from './controller/SensorController';
import LedController from './controller/LedController';
const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.send('OK'));

// routes.get('/acendeverde', LedController.acendeVerde);
// routes.get('/acendeamarelo', LedController.acendeAmarelo);
// routes.get('/acendevermelho', LedController.acendeVermelho);
// routes.get('/apagaverde', LedController.apagaVerde);
// routes.get('/apagaamarelo', LedController.apagaAmarelo);
// routes.get('/apagavermelho', LedController.apagaVermelho);
routes.get('/encerraleitura', SensorController.paraLeitura);
routes.post('/inicialeitura', SensorController.iniciaLeitura);
routes.post('/acendeled', LedController.acendeLed);
routes.post('/apagaled', LedController.apagaLed);

module.exports = routes;
