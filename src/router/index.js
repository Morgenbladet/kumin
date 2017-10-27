import Vue from 'vue'
import Router from 'vue-router'
import InitGame from '@/components/InitGame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Velkommen',
      component: InitGame,
      props: true
    }
  ]
})
