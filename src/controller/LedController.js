var rpio = require('rpio');
const LEDverde    = 35;
const LEDamarelo  = 37;
const LEDvermelho = 33;

rpio.open(LEDverde, rpio.OUTPUT, rpio.LOW);
rpio.open(LEDamarelo, rpio.OUTPUT, rpio.LOW);
rpio.open(LEDvermelho, rpio.OUTPUT, rpio.LOW);
//rpio.open(sensor, rpio.INPUT, rpio.PULL_UP_DOWN, rpio.BCM);

export default {

  async acendeVerde(req, res) {
    rpio.write(LEDverde, rpio.HIGH);
    return res.send('Acendendo Led Verde');
  },

  async apagaVerde(req, res) {
    rpio.write(LEDverde, rpio.LOW);
    return res.send("Apagando Led Verde");
  },

  async acendeAmarelo(req, res) {
    rpio.write(LEDamarelo, rpio.HIGH);
    res.send('Acendendo Led Amarelo');
  },

  async apagaAmarelo(req, res) {
    rpio.write(LEDamarelo, rpio.LOW);
    return res.send("Apagando Led Amarelo");
  },

  async acendeVermelho(req, res) {
    rpio.write(LEDvermelho, rpio.HIGH);
    res.send('Acendendo Led Vermelho');
  },

  async apagaVermelho(req, res) {
    rpio.write(LEDvermelho, rpio.LOW);
    return res.send("Apagando Led Vermelho");
  },

  async acendeTodos(req, res) {
    rpio.write(LEDverde, rpio.HIGH);
    rpio.write(LEDamarelo, rpio.HIGH);
    rpio.write(LEDvermelho, rpio.HIGH);
    res.send('Acendendo Todos os Leds');
  },

  async apagaTodos(req, res) {
    rpio.write(LEDverde, rpio.LOW);
    rpio.write(LEDamarelo, rpio.LOW);
    rpio.write(LEDvermelho, rpio.LOW);
    return res.send("Apagando Todos os Leds");
  },

};