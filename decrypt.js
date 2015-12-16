#! /usr/bin/env node

var fs = require('fs');
var openpgp = require('openpgp');

var profanity = require('./profanity.json');
var originalSymbols = require('./originalSymbols.json');

var ur_private_key = require('./your_keys.js').ur_private_key;
var ur_private_key_pass = require('./your_keys.js').ur_private_key_pass;

var privKey = openpgp.key.readArmored(ur_private_key).keys[0];

if (process.argv.length > 2) {
  var fileName = process.argv[2];
  fs.readFile(fileName, {encoding: 'utf-8'}, function(err, data) {
    if (err) {
      throw err;
    } else {
      doDecrypt(data);
    }
  });
} else {
  var encrypted = ["-----BEGIN PGP MESSAGE-----",
  "Version: Profanity-PGP VERSION",
  "Comment: https://github.com/mapmeld/profanity-pgp",
  "",
  "dipshit asshat dumbfuck hipster dumbass tit douchebag damn asshole schmuck horseshit bastard ass douchebag shitfaced dickhead dumbass motherfucking bitch dumbass damn ass dickhead fuckwad frak fucker twat damn dumbfuck bitch dildo poppycock dickhead shitstorm pissant douche cunt cunt piss piss slut wanker dumbfuck balls twat bitchy bastard fuckwad nsa-hugging tit douchebag fuck shitty motherfucker dickhead jackass shitter slut skank shitstorm",
  "fuck fuck asshole santorum balls dick dumbfuck dickish whore motherfucking bitchy whore asshole dickbag horseshit voldemort fuck wanker fucker darn frak shitstain fucking asshat anal bitchy ass git asshole dongle dumbfuck dickhead motherfucking dickish bitch fuckwad douche horseshit bitch fanny dick santorum balls fuckwad hippie ass dick bitch turd asshat fucking shitfaced darn dickbag douchebag ass whore asshat fucking bastard",
  "wanker fucker bullshit dongle whore dildo shit shitty fuck dumbass bitch pissant crap slut bitchy damn slut shitter shit schmuck motherfucker santorum balls fucker asshat crap wanker bitch hipster bitch hippie pussy balls pussy cunt dipshit crappy pissant shit pussy asshole jackass motherfucker ass dildo skank shitstain shitty bullshit pussy nsa-hugging pussy goddamn shit dickhead voldemort tit goddamn frak damn",
  "dickish dongle git darn bullshit dick shitstain shitfaced dildo hipster fucker schmuck motherfucking tit balls jackass crappy hipster twat motherfucker horseshit piss dumbfuck fuck anal motherfucking fanny dildo douche dumbass horseshit pissant bollocks tit hellish crap dongle shitter dickhead horseshit dongle asshat voldemort skank cuntpunter goddamn santorum turd motherfucking shitter twat anal anal jackass poppycock voldemort shitstorm crap hippie motherfucker",
  "whore voldemort cuntpunter asshole dipshit bitch balls douchebag bullshit fanny dumbass nsa-hugging asshole damn santorum bitch cuntpunter bastard crappy anal cuntpunter darn dickhead anal piss pissant shitter turd hippie jackass shitstain schmuck shitfaced asshat nsa-hugging dumbass hipster crappy cunt pissant hippie santorum bullshit asshat asshole bitchy jackass bitch fucker douche shitstain skank wanker shitstain douchebag bastard shitter pussy voldemort slut",
  "asshole dongle schmuck hellish cunt frak hipster ass dickish fucking balls dumbfuck bullshit shitty dickish hippie crap dipshit turd git hippie schmuck dumbass cuntpunter poppycock shitstorm cunt fuck dickbag turd jackass cock fuck twat nsa-hugging shit bitch cunt douchebag crap damn asshole douchebag dickhead asshat bullshit slut asshole nsa-hugging wanker hellish fuckwad tit dickhead schmuck motherfucking darn darn dickhead shitstorm",
  "crappy dickhead goddamn cunt dumbass santorum shit shitstorm shitstain fuck anal shitty dildo shitty turd pussy bitchy shitstorm bollocks motherfucking bullshit darn shitty bastard fucker asshat git dickish dickish schmuck goddamn jackass fucking hippie dick schmuck bastard wanker turd ass fanny cock goddamn pussy slut shitstorm turd fuck hipster motherfucker dickhead schmuck dipshit schmuck dumbfuck douchebag damn shitstorm dickbag twat",
  "asshole twat dumbfuck dickbag fucker poppycock frak fuck wanker frak hippie turd schmuck shitty whore dipshit dipshit dickish dick bullshit skank damn shit cunt ass skank bullshit schmuck pussy git git dongle shit schmuck fucker shitstain crap bitchy dumbass piss piss dickhead fuckwad tit nsa-hugging whore pussy dickbag turd balls asshat crap wanker dumbfuck hipster wanker bullshit bastard cunt bitch",
  "shitty ass twat cunt cuntpunter bitchy shit damn pissant dongle twat dick bastard douchebag hippie fuck frak hipster douchebag bitchy douchebag bitch whoring whoring",
  "whoring hipster dickish crappy pissant",
  "-----END PGP MESSAGE-----"].join("\n");
  doDecrypt(encrypted);
}

function doDecrypt(encrypted) {
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
  var keyids = message.getEncryptionKeyIds();
  privKey.decryptKeyPacket(keyids, ur_private_key_pass);

  openpgp.decryptMessage(privKey, message).then(function(pgpMessage) {
    console.log(pgpMessage);
  }).catch(function(err) {
    throw err;
  });
}
