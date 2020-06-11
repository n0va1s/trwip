<template lang="pug">
div#main
  div.mdl-layout.mdl-js-layout(v-mdl='')
    div(
      v-if='numberOfNotifications > 0'
      :data-badge='numberOfNotifications'
      @click='toggleDrower'
      ).button-badge
    main-header
      header-bottom
        navigation-links(:actions='actions')
    navigation-drawer(@clickRouterLink='toggleDrower', :actions='actions')
    div.mdl-layout__content
      router-view
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'

  import MainHeader from './navigation/MainHeader'
  import HeaderBottom from './navigation/HeaderBottom'
  import NavigationLinks from './navigation/NavigationLinks'
  import NavigationDrawer from './navigation/NavigationDrawer'
  import * as getters from '../store/getterNames'

  export default {
    beforeRouteEnter (to, from, next) {
      next()
    },
    components: {
      MainHeader,
      HeaderBottom,
      NavigationLinks,
      NavigationDrawer
    },
    data () {
      return {
        actions: [],
        place: 'Navigation Drawer'
      }
    },
    computed: {
      ...mapGetters([
        getters.NOTIFICATIONS_COUNT,
        getters.HAS_MESSAGES,
        getters.HAS_GROUP_MESSAGES
      ]),
      numberOfNotifications () {
        let count = 0
        this.hasMessages ? count++ : null
        this.hasGroupMessages ? count++ : null
        this.notificationsCount > 0 ? count++ : null
        return count
      }
    },
    methods: {
      idleLogout () {
        var interval = window.setInterval(() => {
          var lastActivity = parseInt(window.localStorage.getItem('lastActivity'))
          if (Date.now() - lastActivity > 1000 * 60 * 15) {
            window.clearInterval(interval)
          } else if (Date.now() - lastActivity >= 1000 * 60 * 13) {
            console.log('Inactive')
          }
        }, 1000 * 60)

        var expireSession = () => {
          window.localStorage.setItem('lastActivity', Date.now())
        }
        window.onload = expireSession
        window.onmousemove = expireSession
        window.onmousedown = expireSession
        window.onclick = expireSession
        window.onkeypress = expireSession
        window.onscroll = expireSession
      },
      toggleDrower () {
        var layout = document.querySelector('.mdl-layout')
        layout.MaterialLayout.toggleDrawer()
      },
      updateHeader () {
        if (window.localStorage.getItem('id_token')) {
          this.actions = [
            { text: 'Página Inicial', href: '/', icon: 'home' },
            { text: 'Criar Trwip', href: '/create_trwip', icon: 'create' },
            { text: 'Minhas Trwips', href: '/me/trwips', icon: 'location on' },
            { text: 'Perfil', href: '/profile', icon: 'person' }
          ]
        } else {
          this.actions = [
            { text: 'Página Inicial', href: '/', icon: 'home' },
            { text: 'Sobre a Trwip', href: '/about', icon: 'info' },
            { text: 'Criar conta', href: '/sign_up', icon: 'person add' },
            { text: 'Entrar', href: '/login', icon: 'ion-log-in' }
          ]
        }
      }
    },
    mounted () {
      this.idleLogout()
      Vue.nextTick(() => {
        this.updateHeader()
        window.componentHandler.upgradeAllRegistered()
      })
    }
  }
</script>

<style lang="scss" scoped>
.button-badge {
  position: relative;
}
.button-badge:after {
  content:attr(data-badge);
  position:absolute;
  top: 15px;
  left: 35px;
  font-size: .8em;
  background: red;
  color: white;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
  z-index: 5;
  cursor: pointer;
}
@media (max-width: 1024px) {
  .button-badge:after {
    top: 11px;
    left: 27px;
  }
}
</style>
