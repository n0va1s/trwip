import api from '.'

export default {
  fetchNotifications (userId) {
    return api.get('/user/' + userId + '/notifications')
  },
  markAsRead (userId, notificationId) {
    return api.get('/user/' + userId + '/notifications/' + notificationId + '/read')
  }
}
