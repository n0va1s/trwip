<template lang="pug">
div#chat-messages.full-width.full-height
  div.user
    q-item
      q-item-side
        q-item-tile(avatar)
          vue-gravatar.profile-pic(v-if='!otherUser.pathToProfilePic', :size='30', :email='otherUser.email', default-img='identicon')
          img.profile-pic(v-else, :style="{ background: 'url(' + userImage + ') center / cover' }")
      q-item-main
        q-item-tile(label) {{ otherUser.name }}
      q-item-side
        q-btn(flat @click='$router.push("/profile/" + otherUser.id)') Ver perfil
  div().scroll.messages
    q-chat-message(
      v-for='(msg, index) in allMessages'
      :key='index'
      :name='getUserName(msg.userId)'
      :text='[msg.text]'
      :sent='msg.userId === user.id'
      :text-color='"dark"'
      :avatar='getImageUrl(msg.userId)'
      :bg-color='getMessageColor(msg.userId)'
      :stamp='getTimeFormated(msg.date)'
      ).message
  form(@submit.prevent='').chat-typing
    q-input(
      v-model='message'
      placeholder='Escreva sua mensagem...'
      autofocus
      ).chat-input
    q-btn(
      color='indigo-8'
      round
      small
      icon='send'
      @click='sendMessage'
      )
</template>


<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import * as getters from '../store/getterNames'
import * as actionTypes from '../store/actionTypes.js'
import io from '../api/socket'
import moment from 'moment'
import gravatar from 'vue-gravatar'

import {
  QCard,
  QCardMain,
  QCardActions,
  QCardTitle,
  QInput,
  QBtn,
  QChatMessage
} from 'quasar-framework'

export default {
  name: 'chat-messages',
  components: {
    QCard,
    QCardMain,
    QCardActions,
    QCardTitle,
    QInput,
    QBtn,
    QChatMessage,
    'vue-gravatar': gravatar
  },
  props: {
    channelId: {
      type: String,
      default () {
        return ''
      }
    },
    otherUser: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters([
      getters.USER
    ]),
    userImage () {
      if (this.otherUser) {
        if (this.otherUser.pathToProfilePic) {
          // return 'http://localhost:3000/' + this.user.pathToProfilePic
          return '/' + this.otherUser.pathToProfilePic
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      channel: {},
      message: '',
      allMessages: []
    }
  },
  methods: {
    ...mapActions([
      actionTypes.FETCH_CURRENT_CHANNEL,
      actionTypes.FETCH_CHANNELS_COUNT
    ]),
    goBack () {
      this.$emit('goBack')
    },
    getMessageColor (id) {
      if (this.user.id === id) {
        return 'green-2'
      } else {
        return 'blue-grey-2'
      }
    },
    getImageUrl (id) {
      if (this.user.id === id) {
        if (this.user.pathToProfilePic) {
          return this.user.pathToProfilePic
        }
      } else {
        if (this.otherUser.pathToProfilePic) {
          return this.otherUser.pathToProfilePic
        }
      }

      return 'https://www.materialui.co/materialIcons/social/person_grey_192x192.png'
    },
    getUserName (id) {
      if (id === this.user.id) {
        return this.user.name.split(' ')[0]
      } else {
        return this.otherUser.name.split(' ')[0]
      }
    },
    getTimeFormated (time) {
      return moment(time).format('HH:mm')
    },
    goBottom () {
      window.document.querySelector('.mdl-layout__content').scrollTop = 100000
    },
    sendMessage: function () {
      if (this.message !== '') {
        var data = { text: this.message, from: this.user.id, channelId: this.channelId }
        var msg = { text: this.message, userId: this.user.id, date: new Date() }
        this.allMessages.push(msg)
        io.emit('message', data)
        Vue.nextTick(() => {
          var container = document.querySelector('.messages')
          container.scrollTop = container.scrollHeight
        })
        this.message = ''
      }
    }
  },
  async created () {
    this.channel = await this.fetchCurrentChannel({channelId: this.channelId})
    this.allMessages = this.channel.messages
    this.fetchChannelsCount()
    Vue.nextTick(async () => {
      var container = document.querySelector('.messages')
      container.scrollTop = container.scrollHeight
      setTimeout(() => {
        this.goBottom()
      }, 400)
    })
  },
  async mounted () {
    io.emit('joinRoom', {me: this.user.id, room: this.channelId})
    io.on('new:message', async (data) => {
      this.allMessages.push(data)
      this.fetchChannelsCount()
      Vue.nextTick(async () => {
        var container = document.querySelector('.messages')
        container.scrollTop = container.scrollHeight
      })
    })
  },
  destroyed () {
    io.off('new:message')
    this.$bus.$emit('eitanois')
  },
  watch: {
    '$props': {
      handler: async function (val, oldVal) {
        this.channel = await this.fetchCurrentChannel({channelId: val.channelId})
        this.allMessages = this.channel.messages
      },
      deep: true
    }
  }
}
</script>

<style>
.q-card-primary {
  padding: 0;
}
.q-message-text {
  min-width: 15vw;
  max-width: 50vw;
}
.q-message-avatar {
  opacity: 0;
}
.q-input-target {
  height: 38px !important;
}
</style>

<style lang="scss" scoped>
.profile-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.user {
  background: #fafafa;
}
#chat-messages {
  flex: 1;
  height: 65vh !important;
}
.chat-card {
  margin: 0 15px;
}
.name {
  background: #f4f4f4;
  padding: 5px;
}
.chat-typing {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-self: flex-end;
  // background: #fafafa;
}
.chat-input {
  width: 90%;
}
.chat-btn {
  flex: 2;
}
.messages {
  height: 45vh;
}
.message {
  font-size: 1.5em;
}
.form-section {
  flex: 1;
  display: flex;
}
</style>
