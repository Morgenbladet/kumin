<template>
  <div id="budget">
    <h2>Statsbudsjettet {{ gamestate.year + 2022 }}</h2>
    <p>Det er på tide å sette opp statsbudsjettet for neste år.</p>

    <p>Sjefen, altså statsministeren, har bestemt at du får
      <span v-if="gamestate.budgetChange < 0">et kutt på {{ gamestate.budgetChange * -1 }} millioner.</span>
      <span v-if="gamestate.budgetChange === 0">beholde samme budsjett som i fjor.</span>
      <span v-if="gamestate.budgetChange > 0">{{ gamestate.budgetChange }} friske millioner.</span>
      Dermed har du <strong>{{ gamestate.budget | mrd | round(1) }}&nbsp;milliarder</strong> å fordele.
    </p>

    <p>Bruk glidebryterne for å fordele penger mellom de fem sektorene i kulturbudsjettet. Vi har satt dem opp slik de var i forrige statsbudsjett. Pass på! Sektorer som får kutt, blir misfornøyde. Om de blir for misfornøyde, kommer de til å forsøke å få deg sparket.</p>

    <h3>Direkte bevilgninger</h3>

    <p class="budget-status">
      <i class="fa fa-exclamation-triangle" v-if="remainingBudget < 0"></i>
      <span v-bind:class="{ deficit: remainingBudget < 0 }">{{ remainingBudget }}</span>
      mill. gjenstår.
    </p>

    <div class="slider-group">
      <template v-for="budget in budgets">
        <h4>
          <i class="fa fa-minus-square fa-pull-left"
             @click="gamestate.currentBudget.direkte[budget[1]] -= 100"></i>
          
          {{ budget[0] }}
          {{ gamestate.currentBudget.direkte[budget[1]] / 1000 | round(1) }} mrd.
          <i class="fa fa-plus-square fa-pull-right"
             @click="gamestate.currentBudget.direkte[budget[1]] += 100"></i>
        </h4>
        <vue-slider ref="slider"
                    v-model="gamestate.currentBudget.direkte[budget[1]]"
                   :max="gamestate.budget"
                   tooltip="false"
                   tooltipDir="bottom"
                   :interval="100"></vue-slider>
      </template>
    </div>

    <h3>Tippemidlene</h3>
    <p>Det er kulturministerens jobb å fordele overskuddet fra Norsk Tipping. Overskuddet for neste år er beregnet til <strong>{{ gamestate.spillemidler | mrd | round(1) }} mrd</strong>.</p>

    <p class="budget-status">
      <i class="fa fa-exclamation-triangle" v-if="remainingSpillemidler < 0"></i>
      <span v-bind:class="{ deficit: remainingSpillemidler < 0 }">{{ remainingSpillemidler }}</span>
      mill. gjenstår.
    </p>
    <div class="slider-group">
      <template v-for="budget in spillemidler">
        <h4>
          <i class="fa fa-minus-square fa-pull-left"
             @click="gamestate.currentBudget.spillemidler[budget[1]] -= 100"></i>
          
          {{ budget[0] }}
          {{ gamestate.currentBudget.spillemidler[budget[1]] | mrd | round(1) }} mrd.
          <i class="fa fa-plus-square fa-pull-right"
             @click="gamestate.currentBudget.spillemidler[budget[1]] += 100"></i>
        </h4>
        <vue-slider ref="slider"
                    v-model="gamestate.currentBudget.spillemidler[budget[1]]"
                   :max="gamestate.spillemidler"
                   tooltip="false"
                   tooltipDir="bottom"
                   :interval="100"></vue-slider>
      </template>
    </div>

    <p class="alert" v-if="! budgetValid">
      <i class="fa fa-alert"></i>
      Budsjettet kan ikke godkjennes før det er i null!
    </p>

    <button @click="proceed" :disabled="! budgetValid">Godkjenn statsbudsjettet</button>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'SetupBudget',
  props: ['gamestate'],
  components: {
    vueSlider
  },
  filters: {
    round: function (value, accuracy, keep) {
      if (typeof value !== 'number') {
        return value
      }

      var fixed = value.toFixed(accuracy)
      return keep ? fixed : +fixed
    },
    mrd: function (mill) { return (mill / 1000.0) }
  },
  methods: {
    proceed: function () {
      this.$emit('commitBudget', this.gamestate)
    }
  },
  data: function () {
    return {
      budgets: [
        [ 'Kultur', 'kultur' ],
        [ 'Idrett', 'idrett' ],
        [ 'Frivillige', 'ngoer' ],
        [ 'Tro', 'kirken' ],
        [ 'Medier', 'medier' ]
      ],
      spillemidler: [
        [ 'Idrett', 'idrett' ],
        [ 'Kultur', 'kultur' ],
        [ 'Frivillighet', 'ngoer' ]
      ]
    }
  },
  computed: {
    remainingBudget: function () {
      var bud = this.gamestate.currentBudget.direkte
      var sum = bud.idrett + bud.kirken + bud.kultur + bud.medier + bud.ngoer
      return this.gamestate.budget - sum
    },
    remainingSpillemidler: function () {
      var bud = this.gamestate.currentBudget.spillemidler
      var sum = bud.idrett + bud.ngoer + bud.kultur
      return this.gamestate.spillemidler - sum
    },
    budgetValid: function () {
      return (this.remainingBudget === 0) && (this.remainingSpillemidler === 0)
    }
  }
}
</script>

<style lang="scss">
#app {
  #budget {
    h4 {
      margin-bottom: 0;
      margin-top: 6px;
    }
    .budget-status {

    }
    .deficit {
      color: #e63332;
    }
    button.tiny {
      display: inline-block;
      min-width: 0;
      background: none;
      box-shadow: none;
      border: none;
      padding: 4px;
    }
    .slider-group {
      margin: 1em 0;
      padding: 1em;
      background: rgba(#009870, 0.10);
    }
  }

  .alert {
    text-align: center;
    color: #e63332;
  }
}
</style>
