// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import locale from 'iview/dist/locale/pt-BR'
import 'iview/dist/styles/iview.css'
import 'quasar-extras/roboto-font'
import 'quasar-extras/ionicons'
import 'quasar-framework/dist/quasar.mat.css'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Quasar, * as All from 'quasar-framework'
import moment from 'moment'
import vSelect from 'vue-select'

moment.locale('pt-BR')

Vue.use(VueYouTubeEmbed)
Vue.use(iView, {locale})
Vue.component('v-select', vSelect)
Vue.use(Quasar, {
  components: All,
  directives: All
})

Vue.directive('mdl', {
  inserted: function (el) {
    window.componentHandler.upgradeAllRegistered()
  }
})

Vue.config.productionTip = false

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.config.debug = true
Vue.config.devtools = true

Quasar.start(() => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})
