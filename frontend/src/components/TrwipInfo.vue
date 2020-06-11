<template lang="pug">
  div(v-mdl="").trwip-info
    div#trwip-errors-modal
      Modal(v-model='errorsState', title='Erro nos seguintes campos')
        div(v-for='error in trwipErrors')
          span - {{ error }}
        div(slot='footer')
          Button(type='error', size='large', long='long', @click='errorsState = false') Fechar
    div.card__author
      vue-gravatar(v-if='creatorHaveImage', :email='creator.email', :size='100', default-img='identicon').grav
      img(v-else='', :src='creatorImage', alt='user').profileimage
      div.card__author-content
        h6
          | Criado por
          a.card__user(v-if='isUserLoaded', :href='currentUserReference(creator)') {{ ' ' + creator.name}}
    div.action-buttons
      div(v-if='isCreator')
        div(v-if='!isEditing')
          button(@click='toggleEdit', v-if='!trwip.finished').mdl-button.mdl-js-button.mdl-button--primary Editar
          button(@click='finishTrwip', v-if='!trwip.finished').mdl-button.mdl-js-button.mdl-button--primary Encerrar viagem
          button(@click='excludeTrwip').mdl-button.mdl-js-button.mdl-button--primary Excluir
      div(v-if='shouldNotShow')
        join-trwip(@click='joinTrwip')
      div(v-if='isMember')
        leave-trwip(@click='leaveTrwip')
      div(v-if='isJoin')
        remove-join(@click='removeJoin')
      div(v-if='clickedJoinTrwip').join-trwip-text
        span JoinTrwip realizado com sucesso! Seu pedido de participação foi encaminhado ao organizador da viagem. Você será notificado assim que for aceito na Trwip
    trwip-content(v-if='!isEditing', :trwip='trwip')
    edit-trwip(v-else, :trwip='trwip', @saved='validateUpdate', @cancel='cancelUpdate')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import gravatar from 'vue-gravatar'
import JoinTrwip from './JoinTrwip'
import RemoveJoin from './RemoveJoin'
import LeaveTrwip from './LeaveTrwip'
import TrwipContent from './TrwipContent'
import EditTrwip from './EditTrwip'
import * as actionTypes from '@/store/actionTypes'
import * as getterNames from '@/store/getterNames'
import util from '@/helpers/util'
import io from '../api/socket'

export default {
  name: 'trwip-info',
  components: {
    'vue-gravatar': gravatar,
    JoinTrwip,
    LeaveTrwip,
    RemoveJoin,
    TrwipContent,
    EditTrwip
  },
  async beforeRouteEnter (to, from, next) {
    try {
      next()
    } catch (err) {
      console.log(err)
    }
  },
  props: {
    trwip: {
      type: Object
    },
    creator: {
      type: Object
    },
    isCreator: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isEditing: false,
      trwipErrors: [],
      clickedJoinTrwip: false,
      errorsState: false
    }
  },
  computed: {
    ...mapGetters([
      getterNames.USER
    ]),
    isMember () {
      let isMember = false
      if (this.trwip.members) {
        this.trwip.members.forEach((member) => {
          if (member.id === window.localStorage.getItem('id')) {
            isMember = true
          }
        })
      }
      return isMember
    },
    isJoin () {
      let isJoin = false
      if (this.trwip.joiners) {
        this.trwip.joiners.forEach((member) => {
          if (member.id === window.localStorage.getItem('id')) {
            isJoin = true
          }
        })
      }
      return isJoin
    },
    shouldNotShow () {
      let isJoin = false
      if (this.trwip.joiners) {
        this.trwip.joiners.forEach((joiner) => {
          if (joiner.id === window.localStorage.getItem('id')) {
            isJoin = true
          }
        })
      }
      let isCreator = this.trwip.creatorId === window.localStorage.getItem('id')
      return !(isCreator || isJoin || this.isMember)
    },
    creatorHaveImage () {
      if (this.creator) {
        return !this.creator.pathToProfilePic && this.isUserLoaded
      }
      return false
    },
    creatorImage () {
      if (this.creator) {
        // return 'http://localhost:3000/' + this.creator.pathToProfilePic
        return '/' + this.creator.pathToProfilePic
      }
      return ''
    },
    isUserLoaded () {
      if (this.creator) {
        if (this.creator.email) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    ...mapActions([
      actionTypes.UPSERT_TRWIP
    ]),
    async onClick () {
      if (this.$store.getters.authenticated) {
        if (this.$store.getters.user.id === this.user.id) {
          util.showSnackbar('Você não pode entrar na própria trwip')
        } else {
          if (this.$store.getters.user.join_trwips.indexOf(this.trwip) > -1) {
            util.showSnackbar('Você já solicitou o join nessa trwip')
          } else {
            this.joinTrwip()
          }
        }
      } else {
        util.showSnackbar('Você precisa estar logado para entrar em uma trwip')
        this.$router.push('/login')
      }
    },
    async validateUpdate (trwipData) {
      this.checkAllFields(trwipData)
      if (this.trwipErrors.length === 0) {
        this.toggleEdit()
        try {
          this.$emit('updateTrwip', trwipData)
        } catch (error) {
          console.log(error)
        }
      } else {
        this.errorsState = true
      }
    },
    cancelUpdate () {
      this.toggleEdit()
    },
    checkAllFields (trwipData) {
      this.trwipErrors = []
      if (trwipData.title === '') {
        this.trwipErrors.push('Titulo não pode ser vazio')
      }
      if (trwipData.destination === '') {
        this.trwipErrors.push('Destino não pode ser vazio')
      }
      if (trwipData.style === '') {
        this.trwipErrors.push('Escolha um estilo de sua viagem')
      }
      if (trwipData.description.length < 140) {
        this.trwipErrors.push('Detalhe sua viagem em pelo menos 140 caracteres')
      }
      if (trwipData.title.length > 40) {
        this.trwipErrors.push('O titulo da sua viagem deve ser no máximo 40 caracteres')
      }
      if (!(trwipData.startDate && trwipData.endDate)) {
        this.trwipErrors.push('Selecione uma data estimada de sua viagem')
      }
    },
    onCloseErrosModal () {
      this.errorsState = false
    },
    async joinTrwip () {
      try {
        if (window.localStorage.getItem('id')) {
          let {data} = await this.$store.dispatch(actionTypes.JOIN_TRWIP, {userId: this.$store.getters.user.id, trwipId: this.trwip.id})
          this.clickedJoinTrwip = true
          await this.$store.dispatch(actionTypes.CHECK_IF_LOGGED)
          this.trwip.joiners.push(this.user)
          const host = window.location.origin
          io.emit('join:request', { requesterId: this.user.id, trwipId: this.trwip.id, creatorId: this.trwip.creatorId, host })
          await util.showSnackbar('Join trwip enviado com sucesso')
          return data
        } else {
          util.showSnackbar('Você precisa estar logado para entrar em uma trwip')
          this.$router.push('/login')
        }
      } catch (err) {
        console.log(err)
      }
    },
    leaveTrwip () {
      this.$emit('leave')
    },
    removeJoin () {
      this.$emit('removeJoin')
    },
    toggleEdit () {
      this.isEditing = !this.isEditing
      this.$emit('editToggle', this.isEditing)
    },
    currentUserReference (member) {
      if (member) {
        return '/profile/' + member.id
      }
    },
    finishTrwip () {
      this.$emit('finished')
    },
    excludeTrwip () {
      this.$emit('excluded')
    }
  }
}
</script>

<style lang="scss" scoped>
a:hover {
  cursor: pointer;
	color: #2980b9;
}
.card__author {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  .card__author-content {
    margin: 0 20px;
  }
}
.grav {
  border-radius: 50% !important;
}
.profileimage {
  width: 100px;
  height: 100px;
  border-radius: 50% !important;
}
.action-buttons {
  margin: 24px;
}
.mdl-button--primary.mdl-button--primary {
  color: #02d4b1;
  border: solid 1px #a0b2d8;
  margin: 8px;
}
.join-trwip-text {
  font-size: 1.2em;
  width: 300px;
  margin: auto;
  margin-top: 15px;
	color: #2980b9;
}
</style>
