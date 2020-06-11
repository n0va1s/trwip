<template lang="pug">
div#user-messages
  div.stepper
    q-stepper(ref='stepper' no-border flat contractable)
      q-step(
        default
        title='Conversas'
        active-icon='person'
        done-icon='arrow back'
        icon='person'
        )
        channel-card(
          :channels='channels'
          @selected='channelClicked'
          @goBack='$refs.stepper.previous()'
          )
      q-step(
        title='Chat'
        name='chats'
        active-icon='chat'
        done-icon='chat'
        icon='chat'
        )
        chat-messages(
          v-if='hasChannels'
          :channelId="selectedChannel.id",
          :otherUser='selectedUser'
          )
</template>

<script>
import ChatMessages from '../ChatMessages'
import ChannelCard from '../ChannelCard'
import { mapActions, mapGetters } from 'vuex'
import * as getters from '../../store/getterNames'
import * as actionTypes from '@/store/actionTypes'
import {
  QStep,
  QStepper,
  QStepperNavigation,
  QBtn
} from 'quasar-framework'

export default {
  name: 'personal-chats',
  components: {
    ChatMessages,
    ChannelCard,
    QStep,
    QStepper,
    QStepperNavigation,
    QBtn
  },
  props: {
    channels: {
      type: Array,
      default () {
        return []
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    try {
      next()
    } catch (err) {
      console.log(err)
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
      getters.USER
    ]),
    selectedChannel () {
      return this.channels[this.selectedIndex]
    },
    hasChannels () {
      return this.channels.length > 0
    }
  },
  methods: {
    ...mapActions([
      actionTypes.FETCH_CURRENT_CHANNEL,
      actionTypes.READ_MESSAGES,
      actionTypes.FETCH_CURRENT_USER
    ]),
    channelClicked (index, user) {
      this.selectedIndex = index
      this.selectedUser = user
      this.readChannelMessages()
      this.$refs.stepper.next()
    },
    async readChannelMessages () {
      const channelId = this.selectedChannel.id
      await this.readMessages({ channelId })
    }
  }
}
</script>

<style>
.q-stepper-dot {
  padding: 20px !important;
}
.q-stepper {
  box-shadow: unset;
}
</style>

<style lang="scss" scoped>
.stepper {
  max-width: 90vw;
  align-self: center;
  margin: auto;
}
// @media (max-width: 700px) {
//   .stepper {
//     max-width: 95vw;
//     align-self: center;
//     margin: auto;
//   } 
// }
#user-messages-view {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.message {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.message-text {
  width: 100vw;
}
.list-container {
  min-width: 400px;
  max-width: 600px;
}
.channel-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  cursor: pointer;
}
.item {
  align-self: center;
}
.chat {
  display: flex;
  flex: 1;
  flex-flow: wrap;
}
</style>
