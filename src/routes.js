import SensorController from './controller/SensorController';
import LedController from './controller/LedController';
const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.send('OK'));

routes.get('/encerraleitura', SensorController.paraLeitura);
routes.post('/inicialeitura', SensorController.iniciaLeitura);
routes.post('/acendeled', LedController.acendeLed);
routes.post('/apagaled', LedController.apagaLed);

module.exports = routes;