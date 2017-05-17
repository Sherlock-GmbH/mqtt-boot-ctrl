var mqtt = require('mqtt');
var exec = require('child_process').exec;

var myLog = function(lbl, vars) {
  if (verbose) console.log(lbl, vars);
}

// check for command line arguments
var args = process.argv.slice(2);
var opts = {};
for(var i = 0; i < args.length; i++) {
  if(args[i].indexOf('=') > 0) {
    var parts = args[i].split('=');
    opts[parts[0]] = parts[1];
  }
}

myLog('Command parameters: ', opts);

var verbose = (opts.verbose) ? true : false;
var url = 'tcp://';
if (opts.username && opts.password) {
  url += opts.username + ':' + opts.password + '@';
}
url += (opts.host) ? opts.host : 'localhost';
myLog('MQTT subscriber connecting: ', url);
var client = mqtt.connect(url);
var sref = null;
var namespace = opts.namespace || 'namespace';
var playerId = opts.playerId || 'player01';

client.on('connect', function () {
  myLog('MQTT subscriber connected: ', url);
  var topicSubscription = namespace + '/' + playerId + '/#';
  myLog('MQTT subscribe to: ', topicSubscription);
  client.subscribe(topicSubscription);
  client.publish(namespace + '/' + playerId + '/status', 'started');
});

client.on('message', function (topic, message) {
  var action = topic.toString().split('/').pop();
  myLog('MQTT subscriber action: ', action);
  var payload = message.toString();
  myLog('MQTT subscriber payload: ', payload);

  switch (action) {
    case 'reboot':
      client.publish(namespace + '/' + playerId + '/status', 'rebooting');
      exec('sudo /sbin/shutdown -r now');
      break;
    case 'shutdown':
      client.publish(namespace + '/' + playerId + '/status', 'shutting down');
      exec('sudo /sbin/shutdown now');
      break;
  }
});
