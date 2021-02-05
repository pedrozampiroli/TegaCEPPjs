import LedService from './LedService';

export default {

   async acendeLed(req, res) {
      const { led } = req.body;
      let retorno = await LedService.acendeLed(led.toLowerCase());
      console.log(retorno);
      return res.send(retorno);
   },
   async apagaLed(req, res) {
      const { led } = req.body;
      let retorno = await LedService.apagaLed(led.toLowerCase());
      return res.send(retorno);
   }
};
