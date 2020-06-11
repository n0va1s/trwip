<template lang="pug">
  div(v-mdl="").trwip-joins
    div(v-for='joiner in joiners').mdl-cell--12.mdl-shadow--2dp.joiner
      div.user-info.card__author
        vue-gravatar(v-if='!joiner.pathToProfilePic', :email='joiner.email', :size='30', default-img='identicon').img
        img(v-else='', :src='getUserImg(joiner.pathToProfilePic)', alt='user').img
        div.card__author-content
          h6
            a.card__user(:href='currentUserReference(joiner)') {{joiner.name.split(' ')[0]}}
      div.actions
        i.material-icons(@click="defaultClick()") question_answer
          q-tooltip Conversar
        i.material-icons(@click='acceptJoinTrwip(joiner.id)') done
          q-tooltip Aceitar
        i.material-icons(@click='declineJoinTrwip(joiner.id)') close
          q-tooltip Recusar
</template>

<script>
import gravatar from 'vue-gravatar'
import { mapActions } from 'vuex'
import * as actionTypes from '@/store/actionTypes'
import util from '@/helpers/util'
import io from '../api/socket'

export default {
  name: 'trwip-joins',
  components: {
    'vue-gravatar': gravatar
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
    joiners: {
      type: Array,
      default () {
        return []
      }
    },
    trwipId: {
      type: String
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    ...mapActions([
      actionTypes.CONFIRM_JOIN_TRWIP,
      actionTypes.UNCONFIRM_JOIN_TRWIP
    ]),
    currentUserReference (member) {
      return '/profile/' + member.id
    },
    defaultClick () {
      this.$router.push('/profile')
    },
    getUserImg (imagePath) {
      // return 'http://localhost:3000/' + imagePath
      return '/' + imagePath
    },
    acceptJoinTrwip (id) {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja aceitar esse join?',
        onOk: async () => {
          let data = await this.confirmJoinTrwip({userId: id, trwipId: this.trwipId})
          if (data) {
            this.$emit('joined', id)
            const creatorId = window.localStorage.getItem('id')
            const host = window.location.origin
            io.emit('join:accepted', { creatorId: creatorId, trwipId: this.trwipId, invitedId: id, host })
            util.showSnackbar('Join Trwip efetuado com sucesso!')
          } else {
            util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
          }
        },
        onCancel: () => {
        }
      })
    },
    declineJoinTrwip (id) {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja recusar esse join?',
        onOk: async () => {
          let data = await this.unconfirmJoinTrwip({userId: id, trwipId: this.trwipId})
          if (data) {
            this.$emit('unjoined', id)
            util.showSnackbar('Join Trwip recusado com sucesso!')
          } else {
            util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
          }
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
a:hover {
  cursor: pointer;
	color: #2980b9;
}
.trwip-joins {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.joiner {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-between;
  width: 90vw;
  height: auto;
}
.img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
user-info {
  display: flex;
  align-items: center;
}
.actions {
  display: flex;
  align-items: center;
  i {
    margin: 0px 5px;
    cursor: pointer;
  }
}
</style>
