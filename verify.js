#! /usr/bin/env node

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
"dipshit dickbag dumbfuck asshat dumbfuck dumbass fuck dumbfuck fanny dumbass dumbass motherfucking dumbfuck motherfucking goddamn poppycock shitfaced turd fuck git fanny nsa-hugging dumbass ass fuckwad hipster dumbfuck dumbfuck nsa-hugging motherfucker hellish fuckwad pissant dipshit dumbass dumbass shitstorm hippie shitstain fuckwad wanker nsa-hugging ass git whore anal pissant douchebag crap cunt pissant fuck jackass dick dick crappy bullshit douchebag shitty bitch",
"voldemort hippie dipshit piss shit hipster hellish hellish bitch fuck slut jackass douche dickhead hellish dickbag frak cock shitter dumbfuck frak asshat motherfucking bullshit frak shitter douche motherfucking ass douchebag piss hipster motherfucking voldemort piss poppycock anal crap dumbfuck asshat ass crap fucker fuck douchebag hippie shitty hipster shitfaced shitstain schmuck tit shitstain slut hipster dongle motherfucker hellish hellish santorum",
"hippie shitter darn dumbfuck anal poppycock bullshit asshat dickbag pussy bitch horseshit damn fucker shitfaced hippie bollocks fanny voldemort piss dick pissant fanny cuntpunter shitfaced crap hippie shitter cunt hippie dumbass nsa-hugging hippie dick schmuck fanny goddamn piss fucker twat balls fanny voldemort pussy douche piss crappy fucking tit schmuck dipshit bitch fanny anal fuckwad shitter wanker darn tit shitty",
"tit hellish shitstorm shitter wanker dickish shit motherfucker fucker fuck dildo fuckwad balls git hippie crappy asshat shitstain ass santorum bitchy fucking shitfaced cuntpunter wanker hellish motherfucker motherfucking douchebag bullshit crap frak bastard crap pussy skank damn wanker motherfucking skank santorum dildo douche git pussy fuckwad asshat twat motherfucker goddamn dongle dickish whore darn darn dipshit asshole fucking motherfucking horseshit",
"bitchy bollocks nsa-hugging nsa-hugging dumbfuck cock crappy shit schmuck twat darn fucking voldemort git frak hellish hippie skank goddamn bollocks ass ass turd bitch voldemort fanny goddamn shitfaced santorum turd shitty balls damn crap fanny santorum dipshit shitter hippie douche fucking douche fuckwad dumbfuck frak asshole fanny motherfucker shitstorm turd slut bitch bitchy jackass frak asshat pussy bollocks pussy dickish",
"goddamn dongle shitstorm fucker pussy fucker anal bitch wanker dick skank ass shitstorm bitchy hipster dumbfuck bollocks douche fuck bullshit damn whore tit shitstain bollocks bullshit asshole shitter cunt shitty slut motherfucker asshat hippie motherfucker jackass slut wanker pissant cock goddamn twat shitfaced fuckwad hellish dickish horseshit shitter cuntpunter voldemort shitstain fuck twat bullshit shitter anal wanker skank bullshit motherfucker",
"dildo goddamn horseshit hellish frak asshole crappy damn pussy motherfucker shitty bollocks shitfaced dickbag fanny horseshit voldemort ass poppycock skank bastard fanny hipster whoring",
"whoring goddamn cunt shit douche",
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
