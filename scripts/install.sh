#! /bin/bash

echo "#####################################"
echo "### TEGA CEPP ENVIRONMENT BUILDER ###"
echo "#####################################"

sleep 2

red=`tput setaf 1`
ERRORCODE="ERRO! O SCRIPT PRECISA SER EXECUTADO COMO ROOT"
if [ ! "${EUID}" == "0" ]; then
  echo "${red} ${ERRORCODE}"
  exit 1
fi



sudo apt update;
sudo apt upgrade -y;
sudo apt install gcc g++ make -y;


curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -;
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - ;
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list;


sudo apt update;
sudo apt install yarn nodejs -y;
sudo apt install git -y;


cd /tmp/;
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash;
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ];
printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" 
[ -s "$NVM_DIR/nvm.sh" ];
\. "$NVM_DIR/nvm.sh";
nvm install v14.17.3;


mkdir /$HOME/cepp/;
cd /$HOME/cepp/;
git clone https://github.com/pedrozampiroli/TegaCEPPjs.git;
cd TegaCEPPjs;


yarn;
yarn build;
sudo npm install pm2@latest -g;
pm2 start /$HOME/cepp/TegaCEPPjs/dist/server.js --name cepp;
pm2 log;




#nodejs --version;
echo "NPM Version"
npm -v;
echo "YARN Version"
yarn -v;
echo "GIT Version"
git --version;
