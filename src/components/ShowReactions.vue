<template>
  <div id="show-reactions">
    <p>Ærede minister, her er presseoppslagene etter fremleggelsen av statsbudsjettet:</p>
    <ul class="fa-ul">
      <li v-for="reaction in gamestate.reactions">
        <i class="fa-li fa fa-newspaper-o"></i>
        {{ reaction }}</li>
    </ul>

    <button @click="proceed">OK. Fortsett!</button>
  </div>
</template>

<script>
  export default {
    name: 'ShowReactions',
    props: ['gamestate'],
    methods: {
      proceed: function () {
        this.$emit('proceed', this.gamestate)
      }
    }
  }
</script>

<style lang="scss">
#show-reactions {
  li {
    margin-bottom: 1em;
  }
}
</style>
