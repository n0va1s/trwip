import userApi from '@/api/user'
import api from '@/api'
import userHelper from '@/helpers/user'
import socket from '../../api/socket'
import * as actionTypes from '../actionTypes'
import * as getterNames from '../getterNames'
import * as mutationTypes from '../mutationTypes'

const state = {
  authenticated: false,
  user: {
    id: null,
    name: null,
    email: null,
    pathToProfilePic: null,
    gender: null,
    country: null,
    valuations: null,
    join_trwips: null,
    membership: null
  }
}

const getters = {
  [getterNames.NAME]: state => {
    return state.user.name
  },
  [getterNames.AUTHENTICATED]: state => {
    return state.authenticated
  },
  [getterNames.USER_ID]: state => {
    return state.user.id
  },
  [getterNames.USER]: state => {
    return state.user
  },
  [getterNames.USER_JOIN_TRWIPS]: state => {
    return state.user.join_trwips
  }
}

const actions = {
  [actionTypes.STORE_TOKEN] ({commit, state}, token) {
    window.localStorage.setItem('id_token', token)
    commit('authenticate')
  },
  [actionTypes.LOGOUT] ({commit, state}) {
    commit(mutationTypes.UNAUTHENTICATE)
  },
  async [actionTypes.LOGIN] ({commit, state}, payload) {
    try {
      const socketId = socket.id
      const {data} = await userApi.authenticateUser(payload.email, payload.password, socketId)
      window.localStorage.setItem('id_token', data.token)
      window.localStorage.setItem('id', data.user.id)

      commit(mutationTypes.AUTHENTICATE, data.user)
      return true
    } catch (err) {
      console.log(err)
      throw new Error('Não foi possível realizar login. Dados inválidos')
    }
  },
  async [actionTypes.FETCH_CURRENT_USER] ({commit, getters, state}) {
    const { data } = await userApi.getCurrentUser()
    commit(mutationTypes.AUTHENTICATE, data)
    return data
  },
  [actionTypes.CHECK_IF_LOGGED] ({commit, state}) {
    commit(mutationTypes.UPDATE_AUTHENTICATION)
    if (state.authenticated) {
      userApi.getCurrentUser()
      .then(({data}) => {
        commit(mutationTypes.AUTHENTICATE, data)
      })
      .catch((err) => {
        console.log(err)
        commit(mutationTypes.UNAUTHENTICATE)
      })
    }
  },
  async [actionTypes.REGISTER] ({commit, state}, payload) {
    return await userApi.setUser(payload)
  },
  async [actionTypes.RETRIEVE_USER] ({commit, state}, id) {
    return await userApi.getUser(id)
  },
  async [actionTypes.UPDATE_USER] ({commit, state}, user) {
    commit(mutationTypes.SAVES_USER, user)

    return await userApi.updateUser(user)
  },
  async [actionTypes.FETCH_USERS] ({commit, state}, payload) {
    const query = `?name=${payload.username}`
    return await userApi.fetchUsers(query)
  },
  async [actionTypes.EVALUATE_USER] ({commit, state}, payload) {
    return await userApi.evaluateUser(payload.id, payload.rate)
  }
}

const mutations = {
  [mutationTypes.AUTHENTICATE] (state, user) {
    state.authenticated = true
    state.user = Object.assign(state.user, user)
    Object.assign(api.defaults, { headers: userHelper.getAuthHeader() })
  },
  [mutationTypes.UNAUTHENTICATE] (state) {
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('id')
    state.authenticated = false
    state.user = Object.assign(state.user, {
      id: null,
      name: null,
      email: null,
      pathToProfilePic: null,
      gender: null,
      country: null,
      valuations: null,
      join_trwips: null,
      membership: null
    })
  },
  [mutationTypes.UPDATE_AUTHENTICATION] (state) {
    var jwt = window.localStorage.getItem('id_token')
    if (jwt) {
      state.authenticated = true
    } else {
      state.authenticated = false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
