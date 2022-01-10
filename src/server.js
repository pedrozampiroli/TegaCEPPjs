require('dotenv').config();
var rpio  = require('rpio');
const ledvermelho = process.env.PORTA_LED_VERMELHO;


const express = require('express');
const routes  = require('./routes');
const app     = express();

app.use(express.json());
app.use('/', routes);

app.listen(3333, () => {
   console.log('Server start on port: 3333');
   rpio.open(ledvermelho, rpio.OUTPUT, rpio.HIGH);
});
