<template>
  <div id="init-game">
    <p>Hurra! Ditt parti har akkurat vunnet valget, og <em>du</em> er ny kulturminister!</p>

    <p>Klarer du å holde medier, sportsfolk, kirken, frivillige organisasjoner og &ndash; ikke minst &ndash; det fryktede kulturfolket i sjakk i en hel stortingsperiode?</p>

    <p>Vi får begynne med det enkleste, i hvert fall. Hva heter du? Signer her:</p>

    <input v-model="gamestate.name" class="signature" autofocus>
    <button @click="proceed">Gå videre</button>

  </div>
</template>

<script>
export default {
  name: 'InitGame',
  props: ['gamestate'],
  methods: {
    proceed: function () {
      this.$emit('start', this.gamestate)
    }
  }
}
</script>

<style lang="scss">
#init-game {
  input.signature {
    font-size: 32px;
    border: 0;
    border-bottom: 6px dotted black;
    margin: 2em auto 0.5em auto;
    padding: 0.5em;
    background: transparent;
    width: 75%;
    text-align: center;
    font-family: 'Sacramento';
    display: block;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
