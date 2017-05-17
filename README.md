# mqtt-boot-ctrl

Control your linux box via MQTT messages to reboot or shutdown.

## Usage
The script offers some simple parameters which are used to build the connection URL and the identification of your linux box.

```
node index.js host=192.168.1.1 username=myUser password=myPass namespace=myNamespace playerId=myPlayer
```

### MQTT messages

*reboot*
topic: myNamespace/can/be/what/ever/you/like/myPlayer/reboot

*shutdown*
topic: myNamespace/can/be/what/ever/you/like/myPlayer/shutdown

### Setup

*Download / Clone GIT Repo*

`git clone https://github.com/Sherlock-GmbH/mqtt-boot-ctrl.git`

*Install dependencies*

`npm install`

*Start script*

`npm start`

*sudoers*
Giving nodejs the rights to execute sudo commands we need to add a config file to `/etc/sudoers.d/`.

You need to check which user is running your nodejs script and change nodejsUser with the one of your system.

```
sudo nano /etc/sudoers.d/mqtt-boot-ctrl

nodejsUser ALL=/sbin/shutdown
nodejsUser ALL=NOPASSWD: /sbin/shutdown
```
