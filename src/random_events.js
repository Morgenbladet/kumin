function GameEvent (prmpt, icon, alternatives) {
  this.text = prmpt
  this.icon = icon
  this.alternatives = alternatives
}

var adjust = function (kultur, idrett = 0, medier = 0, kirken = 0, ngoer = 0, sjefen = 0, budsjettet = 0, spillemidler = 0) {
  return function (gamestate) {
    gamestate.pop.kultur += kultur
    gamestate.pop.idrett += idrett
    gamestate.pop.medier += medier
    gamestate.pop.kirken += kirken
    gamestate.pop.ngoer += ngoer
    gamestate.sjefspop += sjefen
    gamestate.budget += budsjettet
    gamestate.spillemidler += spillemidler
  }
}

var gameEvents = [
  new GameEvent('Morgenbladet spør deg hva du har på nattbordet, hva svarer du?',
    'fa-newspaper-o',
    [
      {
        text: 'Lispectors samlede',
        effect: adjust(20, -10, -5, -5, 0, 0)
      },
      {
        text: 'Jo Nesbøs siste',
        effect: adjust(-20, 5, 10, 0, 5, 0)
      },
      {
        text: 'Oi, nå fikk jeg akutt astmaanfall – kommunikasjonsrådgiver, hva er det jeg har på nattbordet mitt?',
        effect: adjust(0, 0, -10, 0, 0, -5)
      }
    ]),

  new GameEvent('Oslofilharmonien, Meråker kommune og Skiforeningen står på telefonlinjen din, og krever at du gjør milliardbevilgninger fordi akkurat de er helt avhengige av nye lokaler.',
    'fa-university',
    [
      {
        text: 'Gjør det stort, penisforlengende, sett mitt navn på grunnsteinen. Nytt konserthus nå! (-500 mill.)',
        effect: adjust(20, -20, 0, 0, 0, 10, -500)
      },
      {
        text: 'Hvorfor skal bare oslofiffen få storstuer? Ny kirke i Meråker!',
        effect: adjust(-20, -20, 0, 40, 0, 0)
      },
      {
        text: 'Vi bruker altfor mye penger på praktbygg, og altfor lite på kunstnerisk ambisiøst innhold i dette landet. Pengene går til friteaterne i stedet!',
        effect: adjust(30, -20, -10, -10, 10, -10)
      },
      {
        text: 'Det Norge trenger er en tredje innendørs skitunnel for å teste ulike glidesmørninger',
        effect: adjust(-20, 20, 10, -10, 0, 0)
      }
    ]),

  new GameEvent('Kultur er...', 'fa-cutlery',
    [
      {
        text: '... vafler, bunad og subtil fremmedfrykt!',
        effect: adjust(-20, 0, 10, -10, -10, 0)
      },
      {
        text: '... NÆRING!',
        effect: adjust(-10, 10, 0, 0, 0, 10)
      },
      {
        text: '... en sjanse til å la unge minoritetsstemmer komme til orde.',
        effect: adjust(10, 0, 10, 5, 5, 0)
      },
      {
        text: '... dødt med en gang du prøver å definere det, din konforme idiot.',
        effect: adjust(20, -10, -10, 0, 0, -10)
      }
    ]),

  new GameEvent('August er hagefestsesong, og det er grenser for hvor mange du rekker å mingle med. Hvem prater du med?', 'fa-glass',
    [
      {
        text: 'Alle som har en formue eller styrer et filantropisk fond med over 100 mill. på bok.',
        effect: adjust(-5, 0, -2, -5, -1, 10)
      },
      {
        text: 'Den hippe, unge R&B-artisten som forhåpentligvis vet hvor det er nach.',
        effect: adjust(10, 0, 2, 0, 0, 0)
      },
      {
        text: 'Dag Solstad.',
        effect: adjust(20, -5, 5, -5, -5, 0)
      },
      {
        text: 'Mamman til Michelle',
        effect: adjust(-20, 0, 20, -10, -5, 10)
      }
    ]),
  new GameEvent('Det er forberedelse til budsjettkonferanse. Statsministeren vil ha et argumentnotat.',
    'fa-file-text',
    [
      {
        text: 'Med all respekt å melde, Statsminister, vi trenger 1 % til kultur ellers vender jeg hele venstresiden i partiet mot deg.',
        effect: adjust(0, 0, 0, 0, 0, -5)
      },
      {
        text: 'Jeg kjenner ganske så mange veldig spennende folk som kommer til å stille seg på Eidsvolls plass og skrike om vi ikke lønnsvekstjusterer kunstnerstipendene!',
        effect: adjust(0, 0, 0, 0, 0, -5)
      },
      {
        text: 'Kutt i vei! Hvis vi bare gaveforsterker investeringene til de rikingene jeg hang med på hagefesten, får vi mer enn nok unge, klassiske fiolinister i dette landet..',
        effect: adjust(0, 0, 0, 0, 0, 20, -1000)
      }
    ]),
  new GameEvent('Høringsrunde for endringer i filmtilskuddsordningen! Kjeeeedeeeliiig!', 'fa-comments',
    [
      {
        text: 'En veldig hyggelig byråkrat som jobber her, Stein Sægrov, sa «bare slapp av du, så skal jeg ta meg av det». Puh!',
        effect: function (gamestate) {
          gamestate.budget -= 1000
          alert('Stein fikset det. En milliard ble øremerket og trukket fra budsjettet')
        }
      },
      {
        text: 'Kjedelig du liksom? Det var for dager som denne at jeg raste gjennom jusutdanningen på halv tid!',
        effect: adjust(0)
      },
      {
        text: 'Ordning schmordning, er det mulig å øremerke noen midler til den veldig dyktige filmskaperen jeg møtte på nach etter hagefesten?',
        effect: adjust(-2, -2, -2, -2, -2, -10, -700)
      }
    ]),
  new GameEvent('Operaen er i ferd med å krøples av pensjonsutgifter, og likevel ber fagforeningen om flere faste stillinger.', 'fa-music',
    [
      {
        text: 'Her gjelder det å plante et styre med tykk hud. Kulturarbeid er ingen menneskerett!',
        effect: adjust(-30, 0, -10, 0, 0, 10, 200)
      },
      {
        text: 'Er det så nøye om vi subsidierer med 500 eller 800 millioner i året, da?',
        effect: adjust(20, 0, -10, 0, 0, 0, -300)
      },
      {
        text: 'Vi må Tenke Nytt! Trenger vi opera 365 dager i året? Kan det ikke også være Justin Bieber-Operaen, Cats-operaen, verdenscup i hopp-operaen?',
        effect: adjust(-15, 10, 10, 0, 0, 0, 100)
      }
    ]),
  new GameEvent('Mediekrisen nærmer seg akutt. Overraskende nok viser det seg at aviser er DITT problem!', 'fa-newspaper-o',
    [
      {
        text: 'Her må det utredes! Og de som vet best og får lede arbeidet, er direktørene for de største mediekonsernene.',
        effect: adjust(0, 0, 20, 0, 0, 0, -200)
      },
      {
        text: '*Dypt innpust*: Det er faktisk på tide å oppdatere pressestøtten så man i det minste tar innover seg at internett er oppfunnet.',
        effect: adjust(0, 0, -20)
      },
      {
        text: 'Jeg tror jammen jeg skal skrive en sint kronikk. «Kjære Mark Zuckerberg ...»',
        effect: adjust(0, 0, -20)
      },
      {
        text: 'Vi lar alt det skure, men sørger for å doble antall ganger vi sier «en mangfoldig medieflora er en grunnleggende forutsetning for et levende demokrati.»',
        effect: adjust(0, 0, -4)
      }
    ]),
  new GameEvent('Norsk Tipping vil tilby pengespill rett i Facebook-feeden til folk. De mener det er nødvendig for å møte konkurransen fra internettgambling.', 'fa-money',
    [
      {
        text: 'Ja! Skattlegg dumhet!',
        effect: adjust(-2, 2, -2, -5, 2, 0, 0, 200)
      },
      {
        text: 'Nei, pengespill er synd.',
        effect: adjust(2, -2, 2, 10, -2, 0, 0, -200)
      }
    ])
]

export { GameEvent, gameEvents }
