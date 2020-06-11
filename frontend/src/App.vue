<template lang="pug">
div#app
  router-view
  div#main-snackbar.mdl-js-snackbar.mdl-snackbar
    div.mdl-snackbar__text
    button.mdl-snackbar__action(type='button')
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as actions from './store/actionTypes'
import * as getters from './store/getterNames'
import Vue from 'vue'
import io from './api/socket'

export default {
  name: 'app',
  beforeRouteEnter () {
    this.updateSession()
  },
  watch: {
    '$route': 'updateSession'
  },
  computed: {
    ...mapGetters([
      getters.AUTHENTICATED,
      getters.USER
    ])
  },
  methods: {
    ...mapActions([
      actions.CHECK_IF_LOGGED,
      actions.FETCH_NOTIFICATIONS,
      actions.FETCH_CHANNELS_COUNT,
      actions.JOIN_CHANNELS
    ]),
    updateSession () {
      this.checkIfLogged()
      const url = document.URL
      if (this.authenticated &&
        (url.match('/login') || url.match('sign_up'))) {
        this.$router.push('/')
      } else if (!this.authenticated &&
                (url.match('/create_trwip') ||
                url.match('/my_trwips') ||
                (url.match('/profile') && !url.match('/profile/')) ||
                url.match('/change_password'))) {
        this.$router.push('/')
      }
    },
    handleSocket () {
      if (this.authenticated) {
        this.fetchNotifications()
        this.fetchChannelsCount()
        this.joinChannels()
        io.on('new:message', () => {
          this.fetchChannelsCount()
        })
        io.on('new:notification', () => {
          this.fetchNotifications()
        })
        io.on('new:connection', (channelId) => {
          io.emit('joinRoom', {me: this.user.id, room: channelId})
        })
      } else {
        io.off('new:message')
        io.off('new:notification')
        io.off('new:connection')
      }
    }
  },
  created () {
    this.$bus.$on('eitanois', () => {
      this.handleSocket()
    })
  },
  mounted () {
    Vue.nextTick(() => {
      window.componentHandler.upgradeAllRegistered()
      this.updateSession()
      this.handleSocket()
    })
  },
  destroyed () {
    io.off('new:message')
    io.off('new:notification')
    io.off('new:connection')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
