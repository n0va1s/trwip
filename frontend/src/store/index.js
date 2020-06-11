import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import trwip from './modules/trwip'
import channel from './modules/channel'
import notification from './modules/notification'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    user,
    trwip,
    channel,
    notification
  },
  strict: DEBUG
})
