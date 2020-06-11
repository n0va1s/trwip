<template lang="pug">
div#group-chat-messages.full-width.full-height
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
  name: 'group-chat-messages',
  components: {
    QCard,
    QCardMain,
    QCardActions,
    QCardTitle,
    QInput,
    QBtn,
    QChatMessage
  },
  props: {
    channelId: {
      type: String,
      default () {
        return ''
      }
    },
    trwip: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters([
      getters.USER
    ])
  },
  data () {
    return {
      channel: {},
      message: '',
      allMessages: [],
      userColors: {},
      titleColors: ['teal-2', 'light-blue-2', 'cyan-2', 'deep-purple-2',
        'indigo-2', 'blue-2', 'red-2', 'pink-2', 'purple-2',
        'green-2', 'lime-2', 'light-green-2', 'amber-2',
        'orange-2', 'deep-orange-2', 'brown-2', 'blue-grey-2']
    }
  },
  methods: {
    ...mapActions([
      actionTypes.FETCH_CURRENT_CHANNEL,
      actionTypes.READ_MESSAGES,
      actionTypes.FETCH_CHANNELS_COUNT
    ]),
    goBack () {
      this.$emit('goBack')
    },
    getMessageColor (id) {
      if (this.user.id === id) {
        return 'green-2'
      } else {
        return this.userColors[id]
      }
    },
    getImageUrl (id) {
      return 'https://www.materialui.co/materialIcons/social/person_grey_192x192.png'
    },
    getUserName (id) {
      if (id === this.user.id) {
        return this.user.name.split(' ')[0]
      } else {
        let name = ''
        if (id === this.trwip.creator.id) {
          return this.trwip.creator.name
        } else {
          this.trwip.members.forEach(user => {
            if (id === user.id) {
              name = user.name
              return
            }
          })
          return name
        }
      }
    },
    getTimeFormated (time) {
      return moment(time).format('HH:mm')
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
    },
    getRandomColor () {
      const randomNumber = Math.floor(Math.random() * this.titleColors.length)
      return this.titleColors[randomNumber]
    },
    associateUsersToColors () {
      this.channel.members.forEach(member => {
        this.userColors[member.id] = this.getRandomColor()
      })
    }
  },
  created () {
    Vue.nextTick(async () => {
      var container = document.querySelector('.messages')
      container.scrollTop = container.scrollHeight
    })
  },
  async mounted () {
    this.channel = await this.fetchCurrentChannel({channelId: this.channelId})
    this.allMessages = this.channel.messages
    io.emit('joinRoom', {me: this.user.id, room: this.channelId})
    io.on('new:message', async (data) => {
      this.allMessages.push(data)
      this.fetchChannelsCount()
      Vue.nextTick(async () => {
        var container = document.querySelector('.messages')
        container.scrollTop = container.scrollHeight
      })
    })
    this.associateUsersToColors()
  },
  destroyed () {
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
</style>

<style lang="scss" scoped>
#chat-messages {
  flex: 1;
  height: 55vh !important;
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
  background: #fafafa;
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
