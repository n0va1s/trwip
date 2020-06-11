<template lang='pug'>
div#navigation-drawer.mdl-layout__drawer.navigation__drawer
  a(href='/')
    div.drawer__logo
  router-link(
    v-for='action in actions',
    :key='action.text',
    :to='action.href',
    @click.native='onClick'
    ).links
    div(
      v-if='action.text === "Minhas Trwips" && hasGroupMessages'
      :data-badge='groupChannelsCount < 100 ? groupChannelsCount: "99+"'
      ).group-badge
    div(v-if='shouldShowProfilePic(action)').icon
      div(
        :data-badge='channelsCount < 100 ? channelsCount : "99+"'
        v-if='hasMessages'
        ).msg-badge
      vue-gravatar.profile-pic(
        v-if='!user.pathToProfilePic && isUserLoaded',
        :size='27',
        :email='user.email',
        default-img='identicon'
        ).grav
      img(
        v-if='isUserLoaded && user.pathToProfilePic'
        :src='userImg',
        alt='user'
        ).profileimage
    q-icon(v-else :name='action.icon' size='27px').icon
    span {{action.text}}
  router-link(
    v-if='isLogged'
    to='/notifications'
    @click.native='onClick'
    ).links
    div(
      :data-badge='notificationsCount < 100 ? notificationsCount : "99+"'
      v-if='notificationsCount > 0'
      ).badge
    q-icon(name='public' size='27px').icon
    span Notificações
  a.links(v-if='isLogged', href='/', @click='logout')
    q-icon(name='ion-log-out' size='27px').icon
    span Sair
</template>

<script>
  import gravatar from 'vue-gravatar'
  import * as actions from '@/store/actionTypes'
  import * as getters from '@/store/getterNames'
  import {mapGetters} from 'vuex'

  export default {
    name: 'navigation-drawer',
    components: {
      'vue-gravatar': gravatar
    },
    props: {
      actions: {
        type: Array
      }
    },
    methods: {
      onClick () {
        var layout = document.querySelector('.mdl-layout')
        layout.MaterialLayout.toggleDrawer()
        this.$parent.$emit('clickRouterLink')
      },
      logout () {
        this.$store.dispatch(actions.LOGOUT)
      },
      shouldShowProfilePic (action) {
        return this.isUserLoaded && action.text === 'Perfil'
      }
    },
    computed: {
      ...mapGetters([
        getters.USER,
        getters.NOTIFICATIONS_COUNT,
        getters.CHANNELS_COUNT,
        getters.HAS_MESSAGES,
        getters.GROUP_CHANNELS_COUNT,
        getters.HAS_GROUP_MESSAGES
      ]),
      userImg () {
        if (this.user) {
          // return 'http://localhost:3000/' + this.user.pathToProfilePic
          return '/' + this.user.pathToProfilePic
        } else {
          return false
        }
      },
      isLogged () {
        return window.localStorage.getItem('id_token') !== null
      },
      isUserLoaded () {
        if (this.user.email) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
.drawer__logo {
  height: 20vh;
  width: 100%;
  background: url('../../assets/trwip.png') center / cover;
  margin-bottom: 15px;
}
.links {
  line-height: 20px;
  background-color: transparent !important;
  border-bottom: 4px solid transparent;
  color: #757575;
  font-weight: 700;
  font-size: 1.2em;
  padding: 10px 30px;
  display: flex !important;
  align-items: center;
  justify-content: baseline;
}
.icon {
  padding-right: 20px;
}
.mdl-navigation__link:hover {
  border-bottom: 4px solid #89D5EB;
}
.mdl-navigation__link.mdl-navigation__link {
  color: #313E47;
}
.grav {
  border-radius: 50%;
}
.profileimage {
  border-radius: 50%;
  width: 27px;
  height: 27px;
}
.badge, .msg-badge {
  position: relative;
}
.badge:after {
  content:attr(data-badge);
  position:absolute;
  top: -17px;
  right: -15px;
  font-size: .8em;
  background: red;
  color: white;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}
.msg-badge:after {
  content:attr(data-badge);
  position:absolute;
  top: -7px;
  right: 15px;
  font-size: .8em;
  background: red;
  color: white;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}
.group-badge {
  position: relative;
}
.group-badge:after {
  content:attr(data-badge);
  position:absolute;
  top: -17px;
  right: -13px;
  font-size: .8em;
  background: red;
  color: white;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}
</style>

<style lang="scss">

.navigation__drawer {
  border-right: 0;
  width: 300px;
  left: -150px;
}

.navigation__drawer.is-visible {
  left: 0;
}
.mdl-layout__drawer-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B7B7B7;
}
.navigation__background {
  padding-left: 0px !important;
}

.navigation__drawer {
  border-right: none;
}

</style>
