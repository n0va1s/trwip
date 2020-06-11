import axios from 'axios'

export default {
  async createTrwip (userId, trwip) {
    return axios.post('/api/user/' + userId + '/trwip', { trwip })
  },
  async getAllTrwips (query) {
    return axios.get('/api/trwips/' + query)
  },
  async getTrwip (id) {
    return axios.get('/api/trwips/' + id)
  },
  async updateTrwip (id, trwip) {
    return axios.put('/api/trwips/' + id, { trwip })
  },
  async joinTrwip (userId, trwipId) {
    return axios.post('/api/user/' + userId + '/join_trwip/' + trwipId)
  },
  async leaveTrwip (userId, trwipId) {
    return axios.delete('/api/user/' + userId + '/member_trwip/' + trwipId)
  },
  async removeJoinTrwip (userId, trwipId) {
    return axios.delete('/api/user/' + userId + '/join_trwip/' + trwipId)
  },
  async removeInviteTrwip (userId, trwipId) {
    return axios.delete('/api/user/' + userId + '/invite_trwip/' + trwipId)
  },
  async membershipTrwip (userId, trwipId) {
    return axios.post('/api/user/' + userId + '/member_trwip/' + trwipId)
  },
  async userTrwips (userId) {
    return axios.get('/api/user/' + userId + '/trwip')
  },
  async deleteTrwip (userId, trwipId) {
    return axios.delete('/api/user/' + userId + '/trwip/' + trwipId)
  },
  async sendInvites (trwipId, emails, host) {
    return axios.post('/api/trwips/' + trwipId + '/invite', { emails: emails, host: host })
  },
  async inviteMember (userId, trwipId) {
    return axios.post(`/api/user/${userId}/invite_trwip/${trwipId}`)
  },
  async evaluateTrwip (userId, trwipId, evaluation) {
    return axios.post(`/api/user/${userId}/evaluation/`, {
      evaluation: evaluation,
      trwipId: trwipId
    })
  },
  async inviteManyMembers (trwipId, users) {
    return axios.post(`/api/trwips/${trwipId}/invite/invite-many`, { users })
  }
}
