var openpgp = require('openpgp');

var profanity = require('./profanity.json');
var ur_private_key = require('./your_keys.js').ur_private_key;
var ur_private_key_pass = require('./your_keys.js').ur_private_key_pass;
var ur_public_key = require('./your_keys.js').ur_public_key;

var pubKey = openpgp.key.readArmored(ur_public_key).keys[0];
var privKey = openpgp.key.readArmored(ur_private_key).keys[0];
privKey.getSigningKeyPacket().decrypt(ur_private_key_pass);

var plaintext = 'hello world\nthis is a test\nwhat happens next?';

var originalSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=';

openpgp.encryptMessage(pubKey, plaintext).then(function(pgpMessage) {
  pgpMessage = pgpMessage.replace('OpenPGP.js', 'Profanity65');
  pgpMessage = pgpMessage.replace('http://openpgpjs.org', 'https://github.com/mapmeld/profanity65');
  var msg = pgpMessage.split('\n');
  for(var l = 4; l < msg.length - 2; l++) {
    var original_line = msg[l];
    var new_line = [];
    for(var sym = 0; sym < original_line.length; sym++) {
      var symbol_index = originalSymbols.indexOf(original_line[sym]);
      new_line.push(profanity[symbol_index]);
    }
    msg[l] = new_line.join(' ');
  }
  console.log(msg.join('\n'));
}).catch(function(err) {
  throw err;
});
