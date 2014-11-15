#! /usr/bin/env node

var openpgp = require('openpgp');

var profanity = require('./profanity.json');
var ur_private_key = require('./your_keys.js').ur_private_key;
var ur_private_key_pass = require('./your_keys.js').ur_private_key_pass;

var privKey = openpgp.key.readArmored(ur_private_key).keys[0];
privKey.getSigningKeyPacket().decrypt(ur_private_key_pass);

var plaintext = 'hello world\nthis is a test\nwhat happens next?';

var originalSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=';

var clearSignedArmor = openpgp.signClearMessage(privKey, plaintext).then(function(pgpMessage) {
  var original = pgpMessage.split('-----BEGIN PGP SIGNATURE-----')[0];
  var sig = pgpMessage.split('-----BEGIN PGP SIGNATURE-----')[1];
  sig = sig.replace('OpenPGP.js', 'Profanity65');
  sig = sig.replace('http://openpgpjs.org', 'https://github.com/mapmeld/profanity65');
  var littlesig = sig.split('\n');
  for(var l = 3; l < littlesig.length - 2; l++) {
    var original_line = littlesig[l];
    var new_line = [];
    for(var sym = 0; sym < original_line.length; sym++) {
      var symbol_index = originalSymbols.indexOf(original_line[sym]);
      if(symbol_index >= profanity.length) {
        new_line.push(profanity[symbol_index - profanity.length].toUpperCase());
      } else {
        new_line.push(profanity[symbol_index]);
      }
    }
    littlesig[l] = new_line.join(' ');
  }
  sig = littlesig.join('\n');
  console.log(original + '-----BEGIN PGP SIGNATURE-----' + sig);

}).catch(function(err) {
  throw err;
});
