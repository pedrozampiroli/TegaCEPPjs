require("dotenv").config();
const axios = require("axios");
const rpio = require("rpio");
var leituraEmExecucao = false;
var controleLeitura = false;

axios.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
};

const sensor = process.env.PORTA_SENSOR;
rpio.open(sensor, rpio.INPUT, rpio.PULL_UP, rpio.BCM);

export default {
    async iniciaLeitura(req, res) {
        if (!controleLeitura) {
            //console.log("Iniciou");
            const {
                idEquipamento,
                ipServerCEPP,
                nomeAplicacao,
                objetoRequisicaoRest,
                portaServidor,
                protocoloComunicacao,
            } = req.body;

            const data = {
                idEquipamento,
                ipServerCEPP,
                nomeAplicacao,
                objetoRequisicaoRest,
                portaServidor,
                protocoloComunicacao,
            };

            let porta = data.portaServidor == 0 ? "" : ":" + data.portaServidor;
            const url = `${data.protocoloComunicacao}://${data.ipServerCEPP}${porta}/${data.nomeAplicacao}/${data.objetoRequisicaoRest}?1,${data.idEquipamento}`;
            var sensorLock = 0;
            var click = 0;

            controleLeitura = true;
            leituraEmExecucao = true;
            console.log("iniciando");

            const leitura = setInterval(() => {
                //Leitura ao entrar energia no sensor, e bloqueada em seguida.
                if (rpio.read(sensor) == 1 && sensorLock == 1) {
                    sensorLock = 0;
                }
                if (rpio.read(sensor) == 0 && sensorLock == 0) {
                    try {
                        click++;
                        console.log("leitura: " + click);
                        sensorLock = 1;
                        axios.get(url).catch(function (error) {
                            console.log(error);
                        });
                    } catch (ex) {
                        console.log("outer", ex.message);
                    }
                }
                if (!controleLeitura) {
                    console.log("Parando leitura!");
                    leituraEmExecucao = false;
                    clearInterval(leitura);
                }
            }, process.env.TIMER);
            return res.send("Leitura do sensor iniciada");
        } else {
            console.log("Leitura do equipamento já em execução!");
            return res.send("Leitura do equipamento já em execução!");
        }
    },

    async paraLeitura(req, res) {
        controleLeitura = false;
        if (leituraEmExecucao) {
            return res.send("Leitura do sensor pausada");
        } else {
            return res.send("Não existe leitura em andamento!");
        }
    },
};
