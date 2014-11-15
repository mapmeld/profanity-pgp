# Profanity65

Anyone can use PGP to make their e-mail more secure. Using a pair of public and private keys, you either encrypt the entire
message for a user, or add a signature to your e-mail for others to verify that it is your original content.

Unfortunately, PGP signatures usually look kinda boring:

```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.15 (Darwin)
Comment: Using GnuPG with Thunderbird - http://www.enigmail.net/

iQEcBAEBAgAGBQJTHnwVAAoJEDWbjndSKzRJFeUH/RtAHtZsUhHpxMxvekLhCEYP
oZn1E7wq1F0I5/4yaQlma3I/v+NdyMiorFQpv3x2YjoleZtnmHN7CR11ZIE66YWT
uyZnFSTuYh6K5SJkfFQs2SKchI0D9MPPoaUYF/m0l2XAwIxs2EdBuxbRryzR8VBj
QmDEeb/fGTnRArJlWlM6KO2rFtUWNdL30zbVZfmxNsr3s7i+/f6ku4duVgtBWXFt
bq114qAFCD4YWM/Ho+T7OfgTUIgxgPjKWeYKovR81nomDxsiyAGHVCe5MR0TL2P9
S3kJEerIdpDNubW7ta4v9X1L1ZzuPJHLvlgRjHMy2N/31sQTrfaPnA9hjTOcyFw=
=rXOK
-----END PGP SIGNATURE-----
```

Let's make them more interesting!

## Concept

profanity.json includes a list of swears which map to valid PGP characters, a-z, A-Z, 0-9, +, /, and =

Using OpenPGP.js, messages are encrpyted or signed using the same globally-trusted GPG client. Then Profanity65
replaces the message's characters with a much more profane system:

```
-----BEGIN PGP SIGNATURE-----
Version: Profanity65 VERSION
Comment: https://github.com/mapmeld/profanity65

dipshit damn dipshit fuck dumbass motherfucking fuck git dumbass dumbfuck dumbass fucker dumbass crap nsa-hugging cunt shit crap dipshit goddamn fuck fuck damn bullshit shit pissant damn horseshit ass cock fanny poppycock dumbass dumbass fanny cunt cuntpunter bitch motherfucker whore motherfucker damn bitch skank turd fuck dongle shitter nsa-hugging darn asshole asshole hellish twat anal nsa-hugging fucking bollocks turd whore
git dumbfuck fuckwad cunt piss dick tit douche nsa-hugging hellish voldemort twat shitstorm anal asshat bullshit whore goddamn bullshit shitstain twat piss whore fuck git ass ass horseshit pissant turd wanker shitstain cock dongle fucking slut crappy turd bullshit bitchy motherfucker bastard dumbfuck horseshit damn dumbfuck horseshit piss piss cunt whore hellish tit poppycock asshat dildo fanny tit asshole fuck
shitfaced dumbfuck poppycock asshole fanny schmuck ass bitchy twat bollocks hellish dickhead bastard bitch turd cunt dickish shit bastard motherfucker skank turd dickhead git darn balls dongle wanker shitstain fuckwad damn jackass bullshit asshat schmuck poppycock asshat frak asshat bastard jackass bollocks balls shit jackass shitstorm git dumbfuck dumbfuck crap git tit dildo crappy hellish hellish turd bitch hippie schmuck
hippie whore skank dongle schmuck fucking darn hipster cunt douchebag shitstain tit wanker motherfucking fucking motherfucking nsa-hugging crap cock hipster fanny fanny frak goddamn dickish crap douche frak pussy dongle asshat whoring
whoring dildo santorum crappy fucker
-----END PGP SIGNATURE-----
```

## Install and Use

```
npm install -g profanity65

profanity-encrypt SnowdenDocs.txt > GreenwaldMail.txt
profanity-decrypt KryptosSculpture.txt > LizardPeopleConstitution.txt

profanity-sign HackThePlanet.txt > Hackers.txt
profanity-verify SketchyEmail.txt
```

## License

GPLv3+ -- based on OpenPGP.js which is LGPL
