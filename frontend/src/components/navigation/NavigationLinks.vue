<template lang="pug">
nav#navigation-links.mdl-navigation
  router-link.mdl-navigation__link(v-for='action in actions', :key='action.text', :to='action.href', @click.native='onClick')
    div(
      v-if='action.text === "Minhas Trwips" && hasGroupMessages'
      :data-badge='groupChannelsCount < 100 ? groupChannelsCount: "99+"'
      ).group-badge
    div(v-if='shouldShowProfilePic(action)').icon
      div(
        v-if='hasMessages'
        :data-badge='channelsCount < 100 ? channelsCount : "99+"'
        ).badge
      vue-gravatar.profile-pic(v-if='!user.pathToProfilePic && isUserLoaded', :size='30', :email='user.email', default-img='identicon').grav
      img(v-if='isUserLoaded && user.pathToProfilePic' :src='userImg', alt='user').profileimage
    q-icon(v-else :name='action.icon' size='30px').icon
    span {{action.text}}
    //- q-tooltip {{ action.text }}
  notification-central
  a.mdl-navigation__link(v-if='isLogged', href='/', @click='logout')
    q-icon(name='ion-log-out' size='30px').icon
    span Sair
</template>

<script>
  import gravatar from 'vue-gravatar'
  import * as actions from '@/store/actionTypes'
  import * as getters from '@/store/getterNames'
  import {mapGetters} from 'vuex'
  import NotificationCentral from '../NotificationCentral'

  export default {
    name: 'navigation-links',
    components: {
      'vue-gravatar': gravatar,
      NotificationCentral
    },
    data () {
      return {
        messages: 0
      }
    },
    props: {
      actions: {
        type: Array,
        required: true
      }
    },
    methods: {
      onClick () {
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
        getters.HAS_MESSAGES,
        getters.CHANNELS_COUNT,
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
.mdl-navigation__link {
  height: 100%;
  line-height: 20px;
  background-color: transparent !important;
  border-bottom: 4px solid transparent;
  color: #757575;
  font-weight: 700;
  font-size: 1em;
  display: flex !important;
  padding: 0 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 500ms ease all;
}
/* .icon {
  padding-right: 10px;
} */
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
  width: 30px;
  height: 30px;
}
.badge {
  position: relative;
}
.badge:after {
  content:attr(data-badge);
  position:absolute;
  top: -3px;
  right: -6px;
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
  top: -3px;
  right: -20px;
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
