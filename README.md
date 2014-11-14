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

jackass dumbfuck jackass shitty piss CUNT shitty ASS piss shit piss skank piss dick CUNTPUNTER dickish piss fuck shitty ASSHAT shitty shitty dumbfuck cuntpunter FUCK DICK dumbfuck BITCHY asshat damn shitstain DICKISH piss piss shit FUCKING MOTHERFUCKING piss CUNT piss HIPPIE hippie asshat shit MOTHERFUCKER bitchy MOTHERFUCKER FUCK hippie JACKASS DUMBASS nsa-hugging fucker bullshit jackass ASS SHITTER MOTHERFUCKER FUCKING PISS
DAMN BASTARD BASTARD dumbass asshole piss ass dumbfuck asshat dipshit BITCH asshat FUCKING DICKISH SHIT HIPPIE ASS BITCHY skank BITCHY BITCHY bullshit DAMN BITCHY dumbass BULLSHIT CUNTPUNTER ass DAMN piss BITCHY skank slut DUMBFUCK BULLSHIT DUMBASS SHIT damn DIPSHIT DIPSHIT GODDAMN HIPPIE hippie BITCHY FUCKING COCKSUCKER cunt DUMBASS DUMBASS BASTARD CUNT COCKSUCKER HIPPIE JACKASS DAMN shitstain whore MOTHERFUCKER bullshit nsa-hugging
bastard fuck dickish hippie COCKSUCKER whore DICKISH whore DICKISH FUCK dumbass skank DUMBASS shitter ass whore DAMN HIPPIE SHITSTAIN SHITSTAIN FUCKING cocksucker bitchy DAMN FUCK FUCKING BULLSHIT cunt BULLSHIT piss NSA-HUGGING BULLSHIT PISS slut dumbass CUNT shit dick bullshit cunt BULLSHIT fucking ASS ASSHOLE goddamn DIPSHIT JACKASS motherfucking DAMN shitstain asshat HIPSTER NSA-HUGGING fucking shitter slut ASS piss CUNT piss
GODDAMN cocksucker bitch ASSHOLE motherfucker BITCHY DAMN slut DUMBFUCK cuntpunter shitter DIPSHIT hippie bitch SHIT dipshit fucking fucking cocksucker ASS shitter HIPPIE BITCH SHITSTAIN SHITSTAIN COCKSUCKER dumbfuck dick DUMBASS dick JACKASS SHITTY
SHITTY ASSHAT piss FUCKER bitch
-----END PGP SIGNATURE-----
```

## License

GPLv3+ -- based on OpenPGP.js which is LGPL
