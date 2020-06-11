import channelAPI from '../../api/channel'
import userAPI from '../../api/user'
import * as actionTypes from '../actionTypes'
import * as getterNames from '../getterNames'
import * as mutationTypes from '../mutationTypes'
import io from '../../api/socket/'

const state = {
  channel: {},
  hasMessages: false,
  hasGroupMessages: false,
  channelsCount: null,
  trwipChannelsCount: null,
  groupMessages: [],
  messages: []
}

const getters = {
  [getterNames.channel] (state, getters) {
    return state.channel
  },
  [getterNames.HAS_MESSAGES] (state) {
    return state.hasMessages
  },
  [getterNames.HAS_GROUP_MESSAGES] (state) {
    return state.hasGroupMessages
  },
  [getterNames.CHANNELS_COUNT] (state) {
    return state.channelsCount
  },
  [getterNames.GROUP_CHANNELS_COUNT] (state) {
    return state.trwipChannelsCount
  },
  [getterNames.MESSAGES] (state) {
    return state.messages
  },
  [getterNames.GROUP_MESSAGES] (state) {
    return state.groupMessages
  }
}

const actions = {
  async [actionTypes.CREATE_CHANNEL] ({ commit, getters, state }, {channel, trwipId, creatorId, myId}) {
    try {
      var { data } = await channelAPI.createChannel(channel, trwipId)
      await channelAPI.addUserToChannel(data.id, creatorId)
      await channelAPI.addUserToChannel(data.id, myId)
      return data
    } catch (err) {
      throw new Error('Ocorreu um erro inesperado')
    }
  },
  async [actionTypes.FETCH_CURRENT_CHANNEL] ({commit, getters, state}, payload) {
    try {
      const { data } = await channelAPI.getChannelData(payload.channelId)
      return data
    } catch (error) {
      throw new Error('Ocorreu um erro durante a busca da conversa')
    }
  },
  async [actionTypes.VERIFY_PERSONAL_CHAT] ({ commit, getters, state }, payload) {
    try {
      var currentId = window.localStorage.getItem('id')
      const { data } = await channelAPI.verifyPrivateChannel(currentId, payload.userId)
      return data.channel
    } catch (error) {
      throw new Error('Ocorreu um erro durante a busca da conversa')
    }
  },
  async [actionTypes.FETCH_CHANNELS_COUNT] ({ commit, state }) {
    try {
      const userId = window.localStorage.getItem('id')
      const { data } = await channelAPI.getChannelsMessagesCount(userId)
      commit(mutationTypes.UPDATE_MESSAGES_COUNT, data)
    } catch (err) {
      console.log(err)
    }
  },
  async [actionTypes.JOIN_CHANNELS] ({ commit }, channels) {
    try {
      const userId = window.localStorage.getItem('id')
      const { data } = await userAPI.getCurrentUser()
      data.channels.map(channel => io.emit('joinRoom', {me: userId, room: channel.id}))
    } catch (err) {
      console.log(err)
    }
  },
  async [actionTypes.READ_MESSAGES] ({ state }, { channelId }) {
    try {
      await channelAPI.readMessages(channelId)
    } catch (err) {
      console.log(err)
    }
  }
}

const mutations = {
  [mutationTypes.UPDATE_CHANNEL] (state, channel) {
    state.channel = channel
  },
  [mutationTypes.UPDATE_MESSAGES_COUNT] (sate, data) {
    state.messages = data.private.messages
    state.groupMessages = data.trwip.messages
    state.hasMessages = data.private.hasMessages
    state.hasGroupMessages = data.trwip.hasMessages
    state.channelsCount = data.private.messages.length
    state.trwipChannelsCount = data.trwip.messages.length
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
