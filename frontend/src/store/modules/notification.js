import * as actionTypes from '../actionTypes'
import * as getterNames from '../getterNames'
import * as mutationTypes from '../mutationTypes'
import notificationApi from '../../api/notification'

const state = {
  notifications: []
}

const getters = {
  [getterNames.NOTIFICATIONS]: ({notifications}) => {
    return notifications
  },
  [getterNames.NOTIFICATIONS_COUNT]: ({notifications}) => {
    return notifications.filter(notification => !notification.read).length
  }
}

const actions = {
  [actionTypes.READ_NOTIFICATIONS]: ({commit, state}) => {
    const userId = window.localStorage.getItem('id')
    state.notifications.map(notification => {
      notificationApi.markAsRead(userId, notification.id)
    })
    commit(mutationTypes.SET_NOTIFICATION_AS_READ)
  },
  [actionTypes.FETCH_NOTIFICATIONS]: async ({commit, state}) => {
    const userId = window.localStorage.getItem('id')
    const { data } = await notificationApi.fetchNotifications(userId)
    commit(mutationTypes.UPSERT_NOTIFICATIONS, data)
  }
}

const mutations = {
  [mutationTypes.SET_NOTIFICATION_AS_READ]: ({notifications}) => {
    notifications.map(notification => {
      notification.read = true
    })
  },
  [mutationTypes.UPSERT_NOTIFICATIONS]: (state, payload) => {
    state.notifications = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
