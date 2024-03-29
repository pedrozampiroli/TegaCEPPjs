require('dotenv').config();
var rpio  = require('rpio');

const ledverde    = process.env.PORTA_LED_VERDE;
const ledamarelo  = process.env.PORTA_LED_AMARELO;
const ledvermelho = process.env.PORTA_LED_VERMELHO;

rpio.open(ledverde, rpio.OUTPUT, rpio.LOW);
rpio.open(ledamarelo, rpio.OUTPUT, rpio.LOW);
rpio.open(ledvermelho, rpio.OUTPUT, rpio.LOW);

export default {

   async acendeLed(ledName) {
      switch (ledName) {
         case 'ledverde':
            rpio.write(ledverde, rpio.HIGH);
            return 'Led verde acesso!'
         case 'ledamarelo':
            rpio.write(ledamarelo, rpio.HIGH);
            return 'Led amarelo acesso!'
         case 'ledvermelho':
            rpio.write(ledvermelho, rpio.HIGH);
            return 'Led vermelho acesso!'
         case 'todosleds':
            rpio.write(ledverde, rpio.HIGH);
            rpio.write(ledamarelo, rpio.HIGH);
            rpio.write(ledvermelho, rpio.HIGH);
            return 'Todos os leds acessos!'
         default:
            return 'Erro ao identificar led: ' + ledName;
      }
   },

   async apagaLed(ledName) {
      switch (ledName) {
         case 'ledverde':
            rpio.write(ledverde, rpio.LOW);
            return 'Led verde apagado!'
         case 'ledamarelo':
            rpio.write(ledamarelo, rpio.LOW);
            return 'Led amarelo apagado!'
         case 'ledvermelho':
            rpio.write(ledvermelho, rpio.LOW);
            return 'Led vermelho apagado!'
         case 'todosleds':
            rpio.write(ledverde, rpio.LOW);
            rpio.write(ledamarelo, rpio.LOW);
            rpio.write(ledvermelho, rpio.LOW);
            return 'Todos os leds apagados!'
         default:
            return 'Erro ao identificar led: ' + ledName;
      }
   }
};
