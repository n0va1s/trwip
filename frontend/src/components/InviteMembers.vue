<template lang="pug">
  div#invite-members
    div.members
      a(name='phase_Members')
      div.mdl-layout__content.mainSection
        div.section.section-member.phase_member
          div.phase-band
            div.phase_one-text
              p.mdl-typography--headline.mdl-typography--font-thin
                | Convide os participantes que você desejar para a sua viagem
              div.invite-section.membersTrwip
                AutoComplete(v-model="memberTrwip" @on-search="handleSearch" placeholder="Procure por membros Trwip" style="width:200px")
                    div(v-for="(user, index) in searchedMembers" :key="index" @click="didClickMember(user)").option-user
                      vue-gravatar(v-if='!user.pathToProfilePic', :email='user.email', :size='30', default-img='identicon')
                      img(v-else='', :src='userImage(user)', alt='user').profileimage
                      div {{user.name}}
                div.selected-members
                  div(v-for='(user, index) in membersTrwip').user-preview__content
                    vue-gravatar(v-if='!user.pathToProfilePic', :email='user.email', :size='30', default-img='identicon')
                    img(v-else='', :src='userImage(user)', alt='user').profileimage
                    a {{user.name}}
                    a.mdl-chip__action(href='#', @click='removeMember(index)')
                      i.material-icons cancel
                button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-color--primary(@click='sendInvites', :disabled='membersTrwip.length === 0').invite-button
                  | Convidar membros
              p.mdl-typography--headline.mdl-typography--font-thin
                | Caso você não encontre você pode enviar um email para convidar
              div.invite-section.membersEmail
                div.input-section
                  q-input(v-model='memberEmail' type='text' stack-label='Enviar convites por e-mail' style='margin-right: 30px; width: 80%;')
                  button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-color--primary(@click='didClickSendEmailMembership', :disabled="memberEmail === ''") Adicionar
                div(style='padding-bottom: 15px;')
                  label  {{ membersEmail.length }} adicionado(s)
                span.mdl-chip.mdl-chip--contact.mdl-chip--deletable(style='padding-left: 8px; margin-right: 8px;', v-for='(member, index) in membersEmail')
                  span.mdl-chip__text {{ member}}
                  a.mdl-chip__action(href='#', @click='removeEmail(index)')
                    i.material-icons cancel
                button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-color--primary(@click='sendEmails', :disabled='membersEmail.length === 0')
                  | Mandar Emails
</template>

<script>
import utilHelper from '../helpers/util'
import { mapActions } from 'vuex'
import * as actionTypes from '@/store/actionTypes'
import gravatar from 'vue-gravatar'
import io from '../api/socket'

export default {
  name: 'InviteMembers',
  components: {
    'vue-gravatar': gravatar
  },
  props: {
    trwipId: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      name: '',
      memberTrwip: '',
      memberEmail: '',
      membersEmail: [],
      membersTrwip: [],
      searchedMembers: []
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      actionTypes.SEND_EMAIL_INVITES,
      actionTypes.FETCH_USERS,
      actionTypes.SEND_MANY_INVITES
    ]),
    userImage (user) {
      if (user) {
        // return 'http://localhost:3000/' + user.pathToProfilePic
        return '/' + user.pathToProfilePic
      } else {
        return false
      }
    },
    didClickSendEmailMembership () {
      let valid = true
      for (var index in this.membersEmail) {
        if (this.membersEmail[index] === this.memberEmail) {
          valid = false
          break
        }
      }
      const validRegex = this.checkRegex()
      if (!valid) {
        utilHelper.showSnackbar('Email já escrito!')
      } else if (!validRegex) {
        utilHelper.showSnackbar('Email invalido!')
      } else {
        this.membersEmail.push(this.memberEmail)
      }
      this.memberEmail = ''
    },
    checkRegex () {
      var re = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      if (re.test(this.memberEmail)) {
        return true
      } else {
        return false
      }
    },
    didClickMember (user) {
      const exists = this.membersTrwip.some(function (el) {
        return el.email === user.email
      })
      if (!exists) {
        this.membersTrwip.push(user)
        this.memberTrwip = ''
      }
    },
    sendErrorMessageEmail () {
      utilHelper.showSnackbar('Email vazio')
    },
    removeMember (index) {
      this.membersTrwip.splice(index, 1)
    },
    removeEmail (index) {
      this.membersEmail.splice(index, 1)
    },
    async sendEmails () {
      const host = window.location.origin
      await this.sendEmailInvites({trwipId: this.trwipId, emails: this.membersEmail, host: host})
      utilHelper.showSnackbar('Emails enviados com sucesso.')
      this.membersEmail = []
    },
    async sendInvites () {
      await this.sendManyInvites({ trwipId: this.trwipId, users: this.membersTrwip })
      const creatorId = window.localStorage.getItem('id')
      const host = window.location.origin
      this.membersTrwip.map(member => {
        io.emit('invite:request', { creatorId: creatorId, trwipId: this.trwipId, invitedId: member.id, host })
      })
      this.membersTrwip = []
      utilHelper.showSnackbar('Convites enviados com sucesso!')
    },
    handleSearch: async function () {
      if (this.memberTrwip !== '') {
        const { data } = await this.fetchUsers({username: this.memberTrwip})
        this.searchedMembers = data.filter((user) => user.id !== window.localStorage.getItem('id'))
      } else {
        this.searchedMembers = []
      }
    }
  }
}
</script>

<style scoped>
 /* Secion Invite Members*/
.input-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.mdl-textfield{
    width: 75%;
}
.mdl-button {
    color: white;
}
.mainSection {
  position: relative;
  height: 30%;
  width: 100%;
}

.section-member{
    /*height: 600px;*/
    background-color: white;
}
.invite-section {
  margin: 30px 0px;
}
.membersTrwip * {
  margin-bottom: 15px;
}
.membersTrwip {
  display: flex;
  flex-direction: column;
}
.invite-button {
  width: 40%
}
.selected-members {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.user-preview__content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-width: 30%;
}
.phase-band {
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.phase_one-text {
  max-width: 800px;
  margin-left: 15%;
  padding: 0px 24px;
  text-align: left;
  color: #27314F;
  display: flex;
  flex-direction: column;
}
.phase_one-text p {
    padding-top: 8px;
}
.mdl-textfield__label {
    color: #27314F !important;
  }
.mdl-textfield__input{
    border-bottom: 1px solid #27314F;
}
.scroll-hider {
  overflow-x: hidden;
}
.list-icon {
  width: 100px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 200px;
  padding-right: 40px;
  transform: translate(17px, 0);
}
.option-user {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.section-member {
  width: 100%;
}
.profileimage {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
</style>
