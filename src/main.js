// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const moment = require('moment')
require('moment/locale/nb')

Vue.use(require('vue-moment'), {
  moment
})

Vue.moment().locale('nb')

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

var ArrayPlugin = function () { }

ArrayPlugin.install = function (Vue, options) {
  Vue.mixin({
    methods: {
      sample: function (a) {
        return a[Math.floor(Math.random() * a.length)]
      },
      shuffle: shuffle
    }
  })
}
Vue.use(ArrayPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
