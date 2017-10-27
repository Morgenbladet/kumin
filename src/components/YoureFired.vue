<template>
  <div id="pink-slip">
    <h1><i class="fa fa-sign-out fa-4x"></i><br/>
      Du har fått sparken!</h1>

    <p>{{ gamestate.fireReason }}</p>

    <button @click="restart">Start på nytt!</button>
  </div>
</template>

<script>
export default {
  name: 'YoureFired',
  props: ['gamestate'],
  methods: {
    restart: function () {
      this.$emit('restart')
    }
  }
}
</script>
