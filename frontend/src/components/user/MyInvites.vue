<template lang="pug">
  div(v-mdl="")#my-invites
    h3(v-if='doesntHaveTrwips').no-invite-message Nenhum convite no momento
    div(v-for='trwip in trwips').mdl-cell--12.mdl-shadow--2dp.trwip
      div.trwip-info
        h6
          a(:href='currentTrwipReference(trwip)') {{trwip.title}}
      div.actions
        i.material-icons(@click="defaultClick(trwip.creatorId)") question_answer
          q-tooltip Conversar
        i.material-icons(@click='acceptInviteTrwip(trwip)') done
          q-tooltip Aceitar
        i.material-icons(@click='declineInviteTrwip(trwip.id)') close
          q-tooltip Recusar
</template>

<script>
import { mapActions } from 'vuex'
import * as actionTypes from '@/store/actionTypes'
import util from '@/helpers/util'
import io from '../../api/socket'

export default {
  name: 'my-invites',
  components: {

  },
  async beforeRouteEnter (to, from, next) {
    try {
      // await Do something before router PUSH
      // next(vm => vm.foo = bar)
      next()
    } catch (err) {
      console.log(err)
    }
  },
  props: {
    trwips: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  computed: {
    doesntHaveTrwips () {
      if (this.trwips) {
        return this.trwips.length === 0
      }
    }
  },
  methods: {
    ...mapActions([
      actionTypes.CONFIRM_INVITE_TRWIP,
      actionTypes.UNCONFIRM_INVITE_TRWIP,
      actionTypes.VERIFY_PERSONAL_CHAT
    ]),
    async defaultClick (userId) {
      await this.openPersonalChat(userId)
      this.$emit('goChat')
    },
    acceptInviteTrwip (trwip) {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja aceitar esse convite?',
        onOk: async () => {
          let data = await this.confirmInviteTrwip({userId: window.localStorage.getItem('id'), trwipId: trwip.id})
          if (data) {
            this.removeInvite()
            const invitedId = window.localStorage.getItem('id')
            const host = window.location.origin
            io.emit('invite:accepted', { creatorId: trwip.creatorId, trwipId: trwip.id, invitedId: invitedId, host })
            util.showSnackbar('Convite aceito com sucesso!')
          } else {
            util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
          }
        },
        onCancel: () => {
        }
      })
    },
    declineInviteTrwip (id) {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja recusar esse convite?',
        onOk: async () => {
          let data = await this.unconfirmInviteTrwip({userId: window.localStorage.getItem('id'), trwipId: id})
          if (data.status === 200) {
            this.removeInvite()
            util.showSnackbar('Convite recusado com sucesso!')
          } else {
            util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
          }
        },
        onCancel: () => {
        }
      })
    },
    removeInvite (id) {
      let trwipFound = {}
      this.trwips.forEach((trwip) => {
        if (trwip.id === id) {
          trwipFound = trwip
        }
      })

      this.trwips.splice(this.trwips.indexOf(trwipFound), 1)
    },
    currentTrwipReference (trwip) {
      return '/trwip/' + trwip.id
    },
    async openPersonalChat (userId) {
      const channelId = await this.verifyPersonalChat({ userId })
      io.emit('new:room', { channelId, userId })
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="scss" scoped>
#my-invites {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.trwip-info {
  display: flex;
  align-items: center;
}
.trwip {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0px 20px;
  justify-content: space-between;
  width: 60vw;
  height: 10vh;
}
.actions {
  display: flex;
  align-items: center;
  i {
    margin: 0px 5px;
    cursor: pointer;
  }
}
.no-invite-message {
  font-size: 2em;
  opacity: 0.5;
}
</style>
