<template lang="pug">
  div.content
    div(:style="{ background: 'url(' + imagePath + ') center / cover'}").cover
      h2.title Minhas Notificações
    div.central
      div.list
        q-item(
          v-if='notifications.length > 0'
          v-for='(notification, index) in notifications'
          :key='index'
          :class='notification.read ? "" : "unread"'
          ).item
          q-item-side
            q-icon(:name='getIconName(notification.type)' size='30px')
          q-item-main(@click='redirectToLink(notification)')
            q-item-tile.message(label) {{ notification.message }}
            q-item-tile(sublabel)
              | {{ getTimeDifference(notification.date) }}
        span(v-else).message Nenhuma notificação no momento
    </template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import * as getters from '../store/getterNames'
import * as actions from '../store/actionTypes'

export default {
  name: 'notification-page',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      getters.NOTIFICATIONS
    ]),
    isLogged () {
      return window.localStorage.getItem('id_token') !== null
    },
    notificationCount () {
      return this.notifications.filter(notification => !notification.read).length
    },
    imagePath () {
      return 'uploads/trwipMainHeader4.jpg'
    }
  },
  methods: {
    ...mapActions([
      actions.READ_NOTIFICATIONS
    ]),
    getTimeDifference (date) {
      return moment(date).fromNow()
    },
    getIconName (type) {
      switch (type) {
        case 'trwip':
          return 'location on'
        case 'chat':
          return 'chat'
        default:
          break
      }
    },
    redirectToLink (notification) {
      this.$router.push(notification.redirect.link)
    }
  },
  beforeDestroy () {
    this.readNotifications()
  }
}
</script>

<style lang='scss' scoped>

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
}
.mdl-navigation__link:hover {
  border-bottom: 4px solid #89D5EB;
}
.central {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.list {
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 630px;
  overflow-y: auto;
  min-width: 50%;
  max-width: 70vh;
}
.bottom {
  min-height: 20px;
  background: #f4f4f4;
  padding: 5px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.link, .message {
  text-decoration: none;
  font-size: 1rem;
  color: #444;
	transition: all 0.5s ease;
	text-align: left;
}
.trwip-link {
  color: #444;
	transition: all 0.5s ease;
}
.link:hover {
  cursor: pointer;
  color: #2980b9;
}
.item {
  padding: 10px 15px;
  border: solid 0.5px #e0e0e0;
  transition: all 0.5s ease;
}
.item:hover {
  background: #d9eafd;
  cursor: pointer;
}
.unread {
  background: rgba(137, 213, 235, 0.2);
}
.badge {
  position: relative;
}
.badge:after {
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
.cover, .overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  min-height: 35vh;
  z-index: -1;
}
.title {
  color: white;
  width: 100%;
  .mdl-textfield__label {
    font-size: 2rem;
    color: white;
  }
  input {
    font-size: 4rem;
    color: white;
    border-bottom: 1px solid white;
  }
}

</style>

