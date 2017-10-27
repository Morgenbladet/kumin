<template>
  <div class="random-event">
    <div>
        <i class="fa fa-pull-right fa-4x" :class="gamestate.currentRandom.icon"></i>
        <span class="prompt">
          {{ gamestate.currentRandom.text }}
        </span>
    </div>

    <ul class="button-list">
      <template v-for="(alternative, index) in gamestate.currentRandom.alternatives">
        <li class="alternative">
          <button v-on:click="chosen(index)">
            <i class="fa fa-arrow-circle-right"></i>
            {{ alternative.text }}
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RandomEvent',
  props: ['gamestate'],
  methods: {
    chosen: function (index) {
      var alt = this.gamestate.currentRandom.alternatives[index]
      // handle effects
      alt.effect(this.gamestate)
      this.$emit('proceed', this.gamestate)
    }
  }
}
</script>

<style lang="scss">
#app {
  .random-event {
    padding: 1em;
    background: transparentize(#fbba00, 0.75);
    text-align: left;

    .icon {
      display: inline-box;
      font-size: 48px;
      float: left;
      padding-right: 0.2em;
    }
    ul.button-list {
      list-style-type: none;
      margin: 0;
      padding: 0;

      li {
        padding: 0.5em;
        text-align: right;
      }

      button {
        border: 0;
        border-bottom: 2px solid #e63332;
        border-radius: 0;
        box-shadow: none;
        background: none;
        padding: 4px;
        text-align: left;
        font-family: 'Fanwood Text';
        margin: 0;
        &:hover {
          background-color: transparentize(#fbba00, 0.8)
        }
      }
    }
  }
}
</style>

