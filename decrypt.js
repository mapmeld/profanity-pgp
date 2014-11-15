var openpgp = require('openpgp');

var profanity = require('./profanity.json');
var ur_private_key = require('./your_keys.js').ur_private_key;
var ur_private_key_pass = require('./your_keys.js').ur_private_key_pass;
var ur_public_key = require('./your_keys.js').ur_public_key;

var pubKey = openpgp.key.readArmored(ur_public_key).keys[0];
var privKey = openpgp.key.readArmored(ur_private_key).keys[0];
privKey.getSigningKeyPacket().decrypt(ur_private_key_pass);

var originalSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=';

var encrypted = ["-----BEGIN PGP MESSAGE-----",
"Version: OpenPGP.js VERSION",
"Comment: http://openpgpjs.org",
"",
"dipshit shit dipshit frak skank git pissant shitty nsa-hugging fucking dipshit bitch hippie goddamn asshat dumbfuck dumbfuck dumbass fanny goddamn hellish asshat hipster dipshit douchebag motherfucking pussy dildo turd balls fanny shitstorm frak dickbag dumbfuck shitfaced dickhead cuntpunter bullshit shitstain jackass fuck git fuck asshole cock fucking bollocks shitfaced bitchy shitty dildo turd git crappy poppycock wanker crappy hippie git",
"dickhead skank dumbfuck jackass asshole crappy damn dickish cunt motherfucker anal slut poppycock crappy bitchy cunt poppycock bitchy git motherfucking jackass frak bitchy fuck dipshit tit twat shitfaced twat nsa-hugging pissant nsa-hugging twat voldemort twat fucker hipster balls shitstorm bastard jackass frak dickish poppycock asshat dickbag schmuck balls dipshit dickish jackass pissant whore cunt nsa-hugging poppycock dongle bullshit damn bastard",
"crappy cock schmuck piss darn pussy schmuck poppycock horseshit damn piss pussy anal turd bollocks git shitstain bollocks douche cock bollocks schmuck shitter goddamn shitty shitstain whore dickhead cock bitch bitchy git crappy shitty douche dickbag motherfucker shitstain bitchy cock tit nsa-hugging goddamn dumbfuck hippie git dickbag balls hellish cunt dickish pissant shitstain voldemort pussy voldemort fuck whore bitchy dumbfuck",
"santorum schmuck shitstain motherfucking dumbfuck darn jackass fuck dickish horseshit goddamn cunt dumbass shitfaced bastard anal slut schmuck hipster dildo motherfucker dongle shitfaced motherfucking asshole frak piss douche voldemort asshole cock dipshit voldemort cock dickhead jackass twat fuckwad santorum shitty bollocks hellish motherfucker bollocks piss douche darn balls shitter voldemort crappy twat bitch darn turd dick dickish goddamn shit darn",
"douche nsa-hugging shitfaced bitch douchebag dickhead horseshit anal cock twat damn hipster hippie ass dickish asshat fuck pissant turd fucker goddamn fucker cock crappy douchebag hellish whore bollocks fucking asshole dongle bollocks shit balls whore crappy balls whore horseshit horseshit pissant shit bullshit shitstain dumbass shitstorm pissant douche hippie pussy piss fucker piss git fucker balls shitter shitstorm dongle damn",
"git dongle skank fucker pissant douchebag asshat shitfaced cunt goddamn asshole cuntpunter fucker shitstorm dumbass shitter cuntpunter jackass fanny ass bastard turd bitchy hipster pissant twat cuntpunter dickish douchebag dumbass whoring whoring",
"whoring douche dick damn piss",
"-----END PGP MESSAGE-----"].join("\n");

var deprofaned = encrypted.split("\n");
for(var l = 4; l < deprofaned.length - 1; l++) {
  var original_line = deprofaned[l].split(' ');
  var new_line = "";
  for(var sym = 0; sym < original_line.length; sym++) {
    var symbol_index = profanity.indexOf(original_line[sym]);
    new_line += originalSymbols[symbol_index];
  }
  deprofaned[l] = new_line;
}
deprofaned = deprofaned.join('\n');

var message = openpgp.message.readArmored(deprofaned);

openpgp.decryptMessage(privKey, message).then(function(pgpMessage) {
  console.log(pgpMessage);
}).catch(function(err) {
  throw err;
});
