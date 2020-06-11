<template lang="pug">
div.channel-card
  h3(v-if='channels.length < 1').no-invite-message Nenhuma conversa no momento
  q-list(v-else no-border separator).list.scroll.full-width
    q-item(v-for='(user, index) in users' :key='index' @click='onClick(index)').full-width
      q-item-side
        q-item-tile(avatar)
          vue-gravatar(v-if='user && !user.pathToProfilePic', :email='user.email', :size='30', default-img='identicon')
          img(v-else, :src='userImage(user)', alt='avatar').profileimage
      q-item-main()
        q-item-tile(label)
          b.user-name {{ user.name.split(" ")[0] }}
        q-item-tile(sublabel)
          | {{ user.country }}
      q-item-side(
        right
        v-if='getNumberOfMessages(user.id) > 0'
        )
        q-item-tile(label).badge
          | {{ getNumberOfMessages(user.id) }}
</template>

<script>
import {
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile
} from 'quasar-framework'
import gravatar from 'vue-gravatar'
import { mapGetters } from 'vuex'
import * as getters from '../store/getterNames'

export default {
  name: 'channel-card',
  components: {
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,
    'vue-gravatar': gravatar
  },
  props: {
    channels: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selectedIndex: 0,
      selectedUser: {}
    }
  },
  computed: {
    ...mapGetters([
      getters.MESSAGES
    ]),
    users () {
      const id = window.localStorage.getItem('id')
      // let orderChannels = this.channels
      // orderChannels.sort((a, b) => {
      //   let firstDate
      //   let secondDate
      //   if (a.messages[0]) {
      //     firstDate = moment(a.messages[0].date)
      //   } else {
      //     firstDate = moment('1994-05-30')
      //   }
      //   if (b.messages[0]) {
      //     secondDate = moment(b.messages[0].date)
      //   } else {
      //     secondDate = moment('1994-05-30')
      //   }
      //   return firstDate < secondDate
      // })
      // return orderChannels.map((channel) => channel.members.filter((member) => member.id !== id)[0]) || []
      return this.channels.map((channel) => channel.members.filter((member) => member.id !== id)[0]) || []
    }
  },
  methods: {
    userImage (user) {
      if (user) {
        return '/' + user.pathToProfilePic
      } else {
        return false
      }
    },
    onClick (index) {
      this.selectedIndex = index
      this.selectedUser = this.users[index]
      this.$emit('selected', index, this.selectedUser)
    },
    getNumberOfMessages (userId) {
      const channelId = this.channels.filter((channel) => {
        return channel.members.filter(member => member.id === userId).length > 0
      })[0].id

      const messagesCount = this.messages.filter(message => {
        return message.channel === channelId
      })[0]

      if (messagesCount) {
        return messagesCount.messagesCount
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.no-invite-message {
  font-size: 2em;
  opacity: 0.5;
}
.user-name {
  font-size: 1.2em;
}
.list {
  max-height: 40vh;
}
.profileimage {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.badge {
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
</style>
