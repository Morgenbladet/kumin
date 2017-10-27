<template>
  <div id="app">
    <h1>
      <i class="fa fa-ticket fa-pull-left fa-spin"></i>
      {{ gamestate.name || 'Kulturminister' }}
      <i class="fa fa-futbol-o fa-pull-right fa-spin"></i><br>
      <span class="title" v-if="gamestate.name">Kulturminister</span>
    </h1>
    <p class="date">
      {{ displayDate | moment("dddd D. MMMM YYYY") | capitalize }}<br>
      Budsjett: {{ gamestate.budget / 1000.0 }} mrd.
    </p>

    <div v-if="gamestate.display_pop" class="pop">
      <ul>
        <li v-for="(value, area) in gamestate.pop">
          <i v-bind:class="popicon(value)"></i><br/>
          {{ gamestate.poplabels[area] }}
        </li>
      </ul>
    </div>

    <transition name="component-fade" mode="out-in">
      <component :is="phase" :gamestate="gamestate"
        @proceed="proceed" @start="start" @commitBudget="commitBudget" @restart="restart"></component>
    </transition>


  </div>
</template>

<script>
import InitGame from './components/InitGame'
import RandomEvent from './components/RandomEvent'
import SetupBudget from './components/SetupBudget'
import ShowReactions from './components/ShowReactions'
import NewYears from './components/NewYears'
import YoureFired from './components/YoureFired'
import GameOver from './components/GameOver'
import { gameEvents } from './random_events'

var shuffle = function (a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

var defaults = function () {
  return {
    name: null,
    budget: 14000,
    spillemidler: 4000,
    lastBudget: {
      direkte: {
        kultur: 8200,
        medier: 1500,
        kirken: 2700,
        idrett: 0,
        ngoer: 1600
      },
      spillemidler: {
        kultur: 700,
        ngoer: 700,
        idrett: 2600
      }
    },
    currentBudget: null,
    display_pop: false,
    year: 0,
    season: -1,
    randoms: shuffle(gameEvents).slice(0),
    sjefspop: 0,
    pop: {
      kultur: 100.0,
      medier: 100.0,
      kirken: 100.0,
      idrett: 100.0,
      ngoer: 100.0
    },
    poplabels: {
      kultur: 'Kultur',
      medier: 'Mediene',
      kirken: 'Tro',
      idrett: 'Idretten',
      ngoer: 'Frivillige'
    }
  }
}

export default {
  name: 'app',
  components: { InitGame, RandomEvent, SetupBudget, ShowReactions, NewYears, YoureFired, GameOver },
  data: function () {
    return {
      gamestate: defaults(),
      phase: 'InitGame'
    }
  },
  methods: {
    finished: function () {
      this.phase = 'GameOver'
    },
    newYears: function () {
      this.gamestate.review = ''
      if (this.gamestate.pop.idrett < 0) {
        this.gamestate.fireReason = 'Idretten fikk nok av din fiiinkultur. Og da fikk også statsministeren nok, gitt.'
        this.phase = 'YoureFired'
      } else if (this.gamestate.pop.kirken < 0) {
        this.gamestate.fireReason = 'Dine angrep på kirken og religion ble for drøye, i en tid der alle politikere må Kjempe Kulturkampen.'
        this.phase = 'YoureFired'
      } else if (this.gamestate.pop.medier < 0) {
        this.gamestate.fireReason = 'Mediene har begynt å se på deg som en djevel. Det går ut over regjeringens kommunikasjonsstrategi.'
        this.phase = 'YoureFired'
      } else if (this.gamestate.pop.ngoer < 0) {
        this.gamestate.fireReason = 'Frivillige organisasjoner ser ut som en enkel salderingspost. Men de har visst kontakter, de jævlene.'
        this.phase = 'YoureFired'
      } else if (this.gamestate.pop.kultur < 0) {
        this.gamestate.review = 'Kulturfolket er i harnisk. Det hagler kronikker, performanceforestillinger, fakkeltog og flammatoriske dikt. Det er riktignok ikke noe man får fyken for – hvem bryr seg? – men ryktene skal ha det til at statsministeren liker det dårlig.'
        this.gamestate.sjefspop -= 20
        this.phase = 'NewYears'
      } else {
        this.phase = 'NewYears'
      }
    },
    randomEvent: function () {
      var newRandom = this.gamestate.randoms.pop()
      this.gamestate.currentRandom = newRandom
      this.phase = 'RandomEvent'
    },
    setupBudget: function () {
      // This number is uniformly distributed between -12 and 8, avg. -2
      var baseChange = (Math.floor(Math.random() * 20) - 12)
      // Adjustment due to boss pop
      var fullChange = baseChange + Math.floor(this.gamestate.sjefspop / 10.0)
      this.gamestate.budgetChange = fullChange * 100
      this.gamestate.budget = this.gamestate.budget + this.gamestate.budgetChange
      this.gamestate.currentBudget = JSON.parse(JSON.stringify(this.gamestate.lastBudget))
      this.phase = 'SetupBudget'
    },
    commitBudget: function (newstate) {
      this.gamestate = newstate
      this.gamestate.reactions = this.generateReactions(newstate.currentBudget, newstate.lastBudget)
      this.gamestate.lastBudget = JSON.parse(JSON.stringify(this.gamestate.currentBudget))
      this.phase = 'ShowReactions'
    },
    mergeBudsjett: function (bud) {
      return {
        kultur: bud.direkte.kultur + bud.spillemidler.kultur,
        idrett: bud.direkte.idrett + bud.spillemidler.idrett,
        ngoer: bud.direkte.ngoer + bud.spillemidler.ngoer,
        medier: bud.direkte.medier,
        kirken: bud.direkte.kirken
      }
    },
    generateReaction: function (key, ch, pops) {
      var descs = {
        kultur: [ 'Kulturfolket', 'Kunstmalere', 'Scenekunstnerne', 'Litteratene', 'Forfatterforeningen', 'Teatergjengere', 'Kunstfilmelskere', 'Filmbransjen', 'Kulturkjerringer' ],
        idrett: [ 'Idrettsforbundet', 'Idretten', 'Sportselskere', 'Fotballsupportere', 'Håndballjentene', 'Olympiatoppen', 'Skistjerne', 'Knickersadelen' ],
        ngoer: [ 'Redd Barna', 'Frivillige', 'Organisasjonslivet', 'LNU', 'Norsk forbund for særinteresser' ],
        kirken: [ 'De geistlige', 'Kirken', 'Muslimske forbund', 'Kristenfolket', 'Livssynsforskere' ],
        medier: [ 'Redaktørforeningen', 'Journalistene', 'Ytringsfrihetseksperter', 'En redaktør', 'Presse-Norge', 'Kommentariatet', 'Morgenbladet' ]
      }

      var handling = ''
      var pop = pops[key]

      if (pop < -20) {
        handling = this.sample(['raser mot statsbudsjettet', 'frykter rasering av tilbudet', 'krever kulturministerens avgang', 'varsler demonstrasjoner', 'mobiliserer mot statsbudsjettet'])
      } else if (pop < 0) {
        handling = this.sample(['misfornøyd med statsbudsjettet', 'ikke fornøyd med budsjettet', 'hadde trodd de skulle få mer', 'forventet mer av ministeren', 'er bekymret', 'vil ha slutt på hvileskjærene'])
      } else if (pop === 0) {
        handling = this.sample(['har ingen kommentarer til statsbudsjettet', 'skjønner prioriteringene', 'beskriver budsjettet som «grått»', 'mener statsbudsjettet mangler gode illustrasjoner'])
      } else if (pop > 20) {
        handling = this.sample(['inviterer kulturministeren på fest', 'varsler opptrapping av tilbudet', 'erklærer at de endelig har blitt hørt', 'spretter sjampanjen'])
      } else if (pop > 0) {
        handling = this.sample(['gir tommelen opp', 'har stor tillit til kulturministeren', 'skal bruke pengene godt', 'hadde håpet på enda mer, men er fornøyd'])
      }

      return this.sample(descs[key]) + ' ' + handling
    },
    generateReactions: function (newBud, oldBud) {
      var ob = this.mergeBudsjett(oldBud)
      var nb = this.mergeBudsjett(newBud)
      var change = {
        kultur: nb.kultur - ob.kultur,
        medier: nb.medier - ob.medier,
        idrett: nb.idrett - ob.idrett,
        ngoer: nb.ngoer - ob.ngoer,
        kirken: nb.kirken - ob.kirken
      }
      var bracket = function (num) {
        const MAX_CHANGE = 60
        return Math.min(Math.max(num, MAX_CHANGE * -1), MAX_CHANGE)
      }
      var popchange = {
        kultur: bracket((change.kultur - 100) / 20),
        idrett: bracket((change.idrett - 100) / 20),
        medier: bracket((change.medier) / 10),
        kirken: bracket((change.kirken) / 10),
        ngoer: bracket((change.ngoer) / 10)
      }
      this.gamestate.pop.kultur += popchange.kultur
      this.gamestate.pop.idrett += popchange.idrett
      this.gamestate.pop.medier += popchange.medier
      this.gamestate.pop.kirken += popchange.kirken
      this.gamestate.pop.ngoer += popchange.ngoer

      var reactions = [
        this.generateReaction('kultur', change, popchange),
        this.generateReaction('idrett', change, popchange),
        this.generateReaction('ngoer', change, popchange),
        this.generateReaction('medier', change, popchange),
        this.generateReaction('kirken', change, popchange)
      ]
      return reactions
    },
    popicon: function (pop) {
      return {
        fa: true,
        'fa-2x': true,
        'fa-frown-o': pop <= 80,
        'fa-smile-o': pop >= 120,
        'fa-meh-o': pop > 80 && pop < 120
      }
    },
    start: function (newState) {
      this.gamestate.season = 1
      this.gamestate.display_pop = true
      this.proceed(newState)
    },
    restart: function () {
      this.gamestate = defaults()
      this.phase = 'InitGame'
    },
    proceed: function (newState) {
      const NEWYEARS = 0
      const SPRING_RE = 1
      const BUDGET = 2
      const WINTER_RE = 3

      this.gamestate = newState
      this.gamestate.season += 1
      if (this.gamestate.season > WINTER_RE) {
        this.gamestate.year += 1
        this.gamestate.season = NEWYEARS
        this.newYears()
      } else if (this.gamestate.season === BUDGET && this.gamestate.year === 4) {
        this.finished()
      } else if (this.gamestate.season === WINTER_RE || this.gamestate.season === SPRING_RE) {
        this.randomEvent()
      } else { // then it has to be BUDGET
        this.setupBudget()
      }
    }
  },
  computed: {
    displayYear: function () { return 2021 + this.gamestate.year },
    displaySeason: function () {
      function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }

      function getRandomIntAsString (min, max) {
        var num = getRandomInt(min, max)
        if (num < 100) {
          return '0' + num.toString()
        } else {
          return num.toString()
        }
      }

      function getDay (season) {
        switch (season) {
          case -1: return '256'
          case 0: return '001'
          case 1: return getRandomIntAsString(1, 167)
          case 2: return getRandomIntAsString(260, 280)
          case 3: return getRandomIntAsString(290, 350)
        }
      }

      return getDay(this.gamestate.season)
    },
    displayDate: function () { return this.displayYear + '-' + this.displaySeason }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fanwood+Text|IM+Fell+English+SC|Sacramento');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
$highlight: #e63332;
$serif: 'Fanwood Text';
$sans-serif: 'IM Fell English SC';
#app {
  border-top: 4px groove black;
  background-image: url('https://s3.eu-central-1.amazonaws.com/morgenbladet-static/kumin/static/creampaper.png');
  border-bottom: 4px groove black;
  padding: 1em;
  font-family: $serif, serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 700px;
  h1, h2, h3, h4, h5, h6 { 
    font-family: $sans-serif; 
    text-align: center;
  }
  h1 {
    font-size: 24px;
    line-height: 22px;
    .title {
      font-size: 14px;
    }
  }
  p.date {
    font-family: $sans-serif;
    font-size: medium;
    text-align: center;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    padding: 4px 0;
  }
  div.pop {
    font-size: small;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: inline-block;
      padding: 4px;
      text-align: center;
      width: 15%;
    }
  }
  button {
    display: block;
    margin: auto auto;
    min-width: 200px;
    font-family: $sans-serif;
    border: 2px solid $highlight;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px black;
    padding: 8px;
    background: transparentize($highlight, 0.9);
    &:hover {
      background: transparentize($highlight, 0.75);
    }
    &:active {
      box-shadow: inset 1px 1px 5px #e63332;
    }
    &:disabled {
      background: #eee;
      box-shadow: none;
      border-color: #aaa;
    }
  }
}
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
