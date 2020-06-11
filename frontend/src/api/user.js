import api from '.'

export default {
  async authenticateUser (email, password, socketId) {
    return api.post('/user/authenticate', { email, password, socketId })
  },
  async getUser (id) {
    return api.get('/user/' + id)
  },
  async getCurrentUser () {
    return api.get('/user/current-user')
  },
  async fetchUsers (query) {
    return api.get('/user/' + query)
  },
  async getEmails () {
    return api.get('/user/emails')
  },
  async setUser (user) {
    return api.post('/user/', { user: user })
  },
  async updateUser (user) {
    return api.put('/user/' + user.id, { user: user })
  },
  async evaluateUser (id, rate) {
    return api.post(`/user/${id}/evaluate`, { rate: rate })
  },
  async sendForgotPasswordMail (email, host) {
    return api.post('/user/forgot-password', { email: email, host: host })
  },
  async getPassword (id) {
    return api.get(`/user/${id}/password`)
  },
  async registerSocket (socketId) {
    return api.post('/user/register_socket', { socketId })
  }
}
