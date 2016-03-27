sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
npm i bleno
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
npm i eddystone-beacon
sudo node eddy-demo.js