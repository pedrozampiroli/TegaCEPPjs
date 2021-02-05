var rpio = require('rpio');
const ledverde = 35;
const ledamarelo = 37;
const ledvermelho = 33;

rpio.open(ledverde, rpio.OUTPUT, rpio.LOW);
rpio.open(ledamarelo, rpio.OUTPUT, rpio.LOW);
rpio.open(ledvermelho, rpio.OUTPUT, rpio.LOW);

export default {

   async acendeLed(ledName) {
      let message = '';
      switch (ledName) {
         case 'ledverde':
            rpio.write(ledverde, rpio.HIGH);
            message = 'Led verde acesso!'
            break;
         case 'ledamarelo':
            rpio.write(ledamarelo, rpio.HIGH);
            message = 'Led amarelo acesso!'
            break;
         case 'ledvermelho':
            rpio.write(ledvermelho, rpio.HIGH);
            message = 'Led vermelho acesso!'
            break;
         case 'todosleds':
            rpio.write(ledverde, rpio.HIGH);
            rpio.write(ledamarelo, rpio.HIGH);
            rpio.write(ledvermelho, rpio.HIGH);
            message = 'Todos os leds acessos!'
            break;
         default:
            message = 'Erro ao identificar led: ' + ledName;
            break;
      }
      return message;
   },

   async acendeLed(ledName) {
      let message = '';
      switch (ledName) {
         case 'ledverde':
            rpio.write(ledverde, rpio.LOW);
            message = 'Led verde acesso!'
            break;
         case 'ledamarelo':
            rpio.write(ledamarelo, rpio.LOW);
            message = 'Led amarelo acesso!'
            break;
         case 'ledvermelho':
            rpio.write(ledvermelho, rpio.LOW);
            message = 'Led vermelho acesso!'
            break;
         case 'todosleds':
            rpio.write(ledverde, rpio.LOW);
            rpio.write(ledamarelo, rpio.LOW);
            rpio.write(ledvermelho, rpio.LOW);
            message = 'Todos os leds acessos!'
            break;
         default:
            message = 'Erro ao identificar led: ' + ledName;
            break;
      }
      return message;
   }
};
