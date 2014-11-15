var openpgp = require('openpgp');

var profanity = require('./profanity.json');
var ur_public_key = require('./your_keys.js').ur_public_key;

var pubKey = openpgp.key.readArmored(ur_public_key).keys[0];

var message = [
"-----BEGIN PGP SIGNED MESSAGE-----",
"Hash: SHA256",
"",
"hello world",
"this is a test",
"what happens next?",
"-----BEGIN PGP SIGNATURE-----",
"Version: Profanity65 VERSION",
"Comment: https://github.com/mapmeld/profanity65",
"",
"dipshit damn dipshit fuck dumbass motherfucking fuck git dumbass dumbfuck dumbass fucker dumbass crap nsa-hugging cunt shit crap dipshit goddamn fuck fuck damn bullshit shit pissant damn horseshit ass cock fanny poppycock dumbass dumbass fanny cunt cuntpunter bitch motherfucker whore motherfucker damn bitch skank turd fuck dongle shitter nsa-hugging darn asshole asshole hellish twat anal nsa-hugging fucking bollocks turd whore",
"git dumbfuck fuckwad cunt piss dick tit douche nsa-hugging hellish voldemort twat shitstorm anal asshat bullshit whore goddamn bullshit shitstain twat piss whore fuck git ass ass horseshit pissant turd wanker shitstain cock dongle fucking slut crappy turd bullshit bitchy motherfucker bastard dumbfuck horseshit damn dumbfuck horseshit piss piss cunt whore hellish tit poppycock asshat dildo fanny tit asshole fuck",
"shitfaced dumbfuck poppycock asshole fanny schmuck ass bitchy twat bollocks hellish dickhead bastard bitch turd cunt dickish shit bastard motherfucker skank turd dickhead git darn balls dongle wanker shitstain fuckwad damn jackass bullshit asshat schmuck poppycock asshat frak asshat bastard jackass bollocks balls shit jackass shitstorm git dumbfuck dumbfuck crap git tit dildo crappy hellish hellish turd bitch hippie schmuck",
"hippie whore skank dongle schmuck fucking darn hipster cunt douchebag shitstain tit wanker motherfucking fucking motherfucking nsa-hugging crap cock hipster fanny fanny frak goddamn dickish crap douche frak pussy dongle asshat whoring",
"whoring dildo santorum crappy fucker",
"-----END PGP SIGNATURE-----"
].join("\n");

var original = message.split('-----BEGIN PGP SIGNATURE-----')[0];
var sig = message.split('-----BEGIN PGP SIGNATURE-----')[1];
var littlesig = sig.split('\n');
var originalSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=';

for(var l = 4; l < littlesig.length - 1; l++) {
  var original_line = littlesig[l].split(' ');
  var new_line = "";
  for(var sym = 0; sym < original_line.length; sym++) {
    var symbol_index = profanity.indexOf(original_line[sym]);
    new_line += originalSymbols[symbol_index];
  }
  littlesig[l] = new_line;
}
sig = littlesig.join('\n');

message = original + '-----BEGIN PGP SIGNATURE-----' + sig;

console.log(message);

var clearMessage = openpgp.cleartext.readArmored(message);

openpgp.verifyClearSignedMessage(pubKey, clearMessage).then(function(sigCheck) {
  if (sigCheck.signatures[0].valid) {
    console.log('looks fucking legit!');
  } else {
    console.log("that's a fake message! holy fucking shit!");
  }
});
