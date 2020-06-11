import api from '.'

export default {
  createChannel (channel, trwipId) {
    return api.post('/trwips/' + trwipId + '/channels', { channel })
  },
  addUserToChannel (channelId, userId) {
    return api.post('/users/' + userId + '/channels/' + channelId)
  },
  getChannelData (channelId) {
    return api.get('/channels/' + channelId)
  },
  getChannelsCount (userId) {
    return api.get(`/user/${userId}/channels/channels-messages-count`)
  },
  readMessages (channelId) {
    return api.put(`/channels/${channelId}/read-messages`)
  },
  getChannelsMessagesCount (userId) {
    return api.get(`/user/${userId}/channels/messages_count`)
  },
  verifyPrivateChannel (userId, anotherId) {
    return api.get(`/user/${userId}/channels/verify-private/${anotherId}`)
  }
}
