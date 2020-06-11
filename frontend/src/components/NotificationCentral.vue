<template lang='pug'>
div.mdl-navigation__link(v-if='isLogged')
  div(
    :data-badge='notificationsCount < 100 ? notificationsCount : "99+"'
    v-if='notificationsCount > 0'
    ).badge
  q-icon(
    name='public'
    size='30px'
    @click='show = !show'
    )
  span Notificações
  q-popover(
    v-model='show'
    anchor='bottom middle'
    self='top middle'
    max-height='650px'
    @close='readNotifications'
    )
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
      div.bottom
        a(href='/notifications').link Ver todos
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import * as getters from '../store/getterNames'
import * as actions from '../store/actionTypes'

export default {
  name: 'notification-central',
  components: {
  },
  async beforeRouteEnter (to, from, next) {
    try {
      // await Do something before router PUSH
      // next(vm => vm.foo = bar)
      next()
    } catch (err) {
      console.log(err)
    }
  },
  props: {
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      getters.NOTIFICATIONS_COUNT,
      getters.NOTIFICATIONS
    ]),
    isLogged () {
      return window.localStorage.getItem('id_token') !== null
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
}
.mdl-navigation__link:hover {
  border-bottom: 4px solid #89D5EB;
}
.central {
  max-width: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-height: 650px;
}
.list {
  /* padding: 10px; */
  max-height: 630px;
  min-width: 20vw;
  overflow-y: auto;
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
  border-bottom: solid 1px #e0e0e0;
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
</style>
