if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi
apt-get install bluetooth bluez libbluetooth-dev libudev-dev
apt-get install -y build-essential
service bluetooth stop
update-rc.d bluetooth remove
systemctl stop bluetooth
systemctl disable bluetooth
npm i --unsafe-perm
reboot