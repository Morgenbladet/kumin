<template>
  <div id="game-over">
    <p style="text-align: center">
      <i class="fa fa-trophy fa-4x"></i>
    </p>
    <h2>Perioden er over</h2>

    <p>Et nytt valg er rett rundt hjørnet, og du sitter fortsatt som kulturminister. Dette er jo helt utrolig! Du er et naturtalent. Eller veldig heldig. Eller mer opptatt av idrett enn kunst.</p>

    <p>I en kåring i Morgenbladet blir du omtalt som den «drøyeste politiske spilleren» i Kulturdepartementet siden Trond Giske. Du klipper ut artikkelen, rammer den inn og henger den på veggen.</p>

    <p>Nå er du klar for nye utfordringer. Hmm... Kanskje utdanning? Eller finans? Eller... statsminister!</p>

    <button @click="restart">Prøv en gang til!</button>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  props: ['gamestate'],
  methods: {
    restart: function () {
      this.$emit('restart')
    }
  }
}
</script>
