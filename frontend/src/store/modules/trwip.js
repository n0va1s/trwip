import trwipApi from '@/api/trwip'
import * as actionTypes from '../actionTypes'
import * as getterNames from '../getterNames'
import * as mutationTypes from '../mutationTypes'
import oboe from 'oboe'
import headers from '@/helpers/user'

const state = {
  findedTrwips: [],
  totalFinded: 0
}

const getters = {
  [getterNames.findedTrwips]: (state, getters) => {
    return state.findedTrwips
  }
}

const actions = {
  async [actionTypes.CREATE_TRWIP] ({commit, state}, payload) {
    return await trwipApi.createTrwip(payload.userId, payload.trwip)
  },
  async [actionTypes.CLEAN_SEARCH] ({commit, state}) {
    commit(mutationTypes.CLEAN_FINDEDS)
  },
  async [actionTypes.FETCH_TRWIP_SLICE] ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      var query = '?orderBy=' + payload.orderBy + '&field=' + payload.field + '&value=' + payload.value
      oboe({
        url: '/api/trwips' + query,
        method: 'GET',
        headers: headers.getAuthHeader()
      })
      .done(data => {
        commit(mutationTypes.UPDATE_FINDED_TRWIPS, data)
      })
      .fail(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  async [actionTypes.RETRIEVE_TRWIPS] ({commit, state}, payload) {
    return await trwipApi.getAllTrwips(payload.query)
  },
  async [actionTypes.RETRIEVE_TRWIP] ({commit, state}, payload) {
    return await trwipApi.getTrwip(payload.id)
  },
  async [actionTypes.JOIN_TRWIP] ({commit, state}, payload) {
    return await trwipApi.joinTrwip(payload.userId, payload.trwipId)
  },
  async [actionTypes.LEAVE_TRWIP] ({commit, state}, payload) {
    await trwipApi.leaveTrwip(payload.userId, payload.trwipId)
  },
  async [actionTypes.CONFIRM_JOIN_TRWIP] ({commit, state}, payload) {
    await trwipApi.removeJoinTrwip(payload.userId, payload.trwipId)
    let {data} = await trwipApi.membershipTrwip(payload.userId, payload.trwipId)
    return data
  },
  async [actionTypes.CONFIRM_INVITE_TRWIP] ({commit, state}, payload) {
    await trwipApi.removeInviteTrwip(payload.userId, payload.trwipId)
    let {data} = await trwipApi.membershipTrwip(payload.userId, payload.trwipId)
    return data
  },
  async [actionTypes.UPSERT_TRWIP] ({commit, state}, payload) {
    return trwipApi.updateTrwip(payload.trwip.id, payload.trwip)
  },
  async [actionTypes.UNCONFIRM_JOIN_TRWIP] ({commit, state}, payload) {
    return (
      await trwipApi.removeJoinTrwip(payload.userId, payload.trwipId)
    )
  },
  async [actionTypes.UNCONFIRM_INVITE_TRWIP] ({commit, state}, payload) {
    return (
      await trwipApi.removeInviteTrwip(payload.userId, payload.trwipId)
    )
  },
  async [actionTypes.USER_TRWIP] ({commit, state}, payload) {
    return await trwipApi.userTrwips(payload)
  },
  async [actionTypes.DELETE_TRWIP] ({commit, state}, payload) {
    return await trwipApi.deleteTrwip(payload.userId, payload.trwipId)
  },
  async [actionTypes.SEND_EMAIL_INVITES] ({commit, state}, payload) {
    return await trwipApi.sendInvites(payload.trwipId, payload.emails, payload.host)
  },
  async [actionTypes.EVALUATE] ({commit, state}, payload) {
    return await trwipApi.evaluateTrwip(payload.userId, payload.trwipId, payload.evaluation)
  },
  async [actionTypes.SEND_MANY_INVITES] ({commit, state}, payload) {
    return await trwipApi.inviteManyMembers(payload.trwipId, payload.users)
  },
  async [actionTypes.SEND_INVITE] ({commit, state}, payload) {
    return await trwipApi.inviteMember(payload.userId, payload.trwipId)
  }
}

const mutations = {
  [mutationTypes.UPDATE_FINDED_TRWIPS] (state, data) {
    state.findedTrwips = Object.assign({}, data.trwips)
    state.totalFinded = data.total
  },
  [mutationTypes.CLEAN_FINDEDS] (state) {
    state.findedTrwips = []
    state.totalFinded = 0
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
