<template>
  <div id="performance-review">
    <h2>Nytt år</h2>

    <p>Velkommen til {{ gamestate.year + 2021 }}. Her er en oppsummering av din popularitet så langt:</p>

    <dl>
      <template v-for="(pop, area) in gamestate.pop">
        <dt>{{ gamestate.poplabels[area] }}:</dt>
        <dd>{{ pop | pop_in_words }}</dd>
      </template>
    </dl>

    <p v-if="gamestate.review">{{ gamestate.review }}</p>

    <button @click="proceed">Ja, ja, ta meg videre!</button>
  </div>
</template>

<script>
export default {
  name: 'NewYears',
  props: ['gamestate'],
  methods: {
    proceed: function () {
      this.$emit('proceed', this.gamestate)
    }
  },
  filters: {
    pop_in_words: function (value) {
      if (value < 25) return 'Kritisk! De vil ha deg sparket.'
      else if (value < 50) return 'Dypt uopulær. Det ulmer i sektoren.'
      else if (value < 75) return 'De liker deg ikke, men de vil gi deg litt mer tid før de sliper knivene.'
      else if (value < 90) return 'Du mangler tillit i sektoren.'
      else if (value < 110) return 'Hverken fornøyd eller misfornøyd.'
      else if (value < 140) return 'Du nyter enorm respekt og tillit i sektoren.'
      else return 'Du er deres store helt!'
    },
    capitalize: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style lang="scss">
#performance-review {
  dt {
    clear: left;
    float: left;
    font-family: 'IM Fell English SC';
    font-weight: bold;
    text-align: right;
    line-height: 20px;
    padding-right: 1em; 
    font-size: 18px;
  }
  dd {
    padding: 0;
    margin: 0;
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
