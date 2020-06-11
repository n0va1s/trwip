<template lang="pug">
div#profile
  div.profile-header
    user-info(v-if='!isEditing', :user='user')
    edit-user-info(v-if='isEditing', :user='user', @emailChanged='verifyEmail')
    div.action-buttons
      div
        button.mdl-button.mdl-js-button.mdl-button--primary(@click='toggleEdition', :disabled='isFormInvalid()') {{ editButtonText }}
    vue-tabs(:centered='true', v-model='tabName')
      v-tab(title='Minhas Conversas')
        personal-chats(:channels='channels')
      v-tab(title='Meus Convites')
        my-invites(@goChat='goChat', :trwips='user.invited_trwips')
</template>

<script>
import UserInfo from '@/components/user/profile/UserInfo'
import EditUserInfo from '@/components/user/profile/EditUserInfo'
import {VueTabs, VTab} from 'vue-nav-tabs/dist/vue-tabs.js'
import 'vue-nav-tabs/themes/paper.css'
import gravatar from 'vue-gravatar'
import store from '@/store'
import util from '@/helpers/util'
import * as actionTypes from '@/store/actionTypes'
import MyInvites from './MyInvites'
import PersonalChats from './PersonalChats'
import { mapActions } from 'vuex'

export default {
  name: 'profile',
  async beforeRouteEnter (to, from, next) {
    try {
      let data = await store.dispatch(actionTypes.FETCH_CURRENT_USER)
      next(vm => {
        vm.user = data
        vm.isUserLoaded = true

        if (to.path.endsWith('/invite')) {
          vm.tabName = 'Meus Convites'
        }
      })
    } catch (err) {
      console.log(err)
      next()
    }
  },
  components: {
    'vue-gravatar': gravatar,
    'user-info': UserInfo,
    'edit-user-info': EditUserInfo,
    VueTabs,
    VTab,
    MyInvites,
    PersonalChats
  },
  computed: {
    channels () {
      if (this.user.channels) {
        return this.user.channels.filter(c => !c.isGroup) || []
      } else {
        return []
      }
    }
  },
  data () {
    return {
      user: {},
      trwips: [],
      isUserLoaded: false,
      tabName: '',
      isEditing: false,
      editButtonText: 'EDITAR PERFIL'
    }
  },
  methods: {
    ...mapActions([
      actionTypes.FETCH_CURRENT_USER
    ]),
    toggleEdition (e) {
      this.isEditing = !this.isEditing
      let saveButton = e.target

      if (this.isEditing) {
        this.handleTransitionToEdit(saveButton)
      } else {
        this.handleSaveEdition(saveButton)
      }
    },
    handleTransitionToEdit (saveButton) {
      this.editButtonText = 'SALVAR'

      saveButton.classList.add('mdl-button--raised')
      saveButton.style.color = 'white'
    },
    handleSaveEdition (saveButton) {
      this.editButtonText = 'EDITAR PERFIL'

      saveButton.classList.remove('mdl-button--raised')
      saveButton.style.color = '#02d4b1'

      this.updateUser()
    },
    isFormInvalid () {
      let isInvalid = this.user.name === '' ||
      this.user.country === '' ||
      this.user.gender === '' ||
      this.user.email === ''

      return isInvalid
    },
    verifyEmail () {
      let saveButton = document.querySelector('.action-buttons').childNodes[0].childNodes[0]

      if (document.querySelectorAll('.is-invalid').length > 0) {
        saveButton.disabled = true
      } else {
        saveButton.disabled = false
      }
    },
    async updateUser () {
      let {data} = await this.$store.dispatch(actionTypes.UPDATE_USER, this.user)

      if (data) {
        util.showSnackbar('Informações atualizadas com sucesso')
      }
    },
    async goChat () {
      this.user = await this.fetchCurrentUser()
      console.log(this.user)
      this.tabName = 'Minhas Conversas'
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
span {
  font-size: 20px;
}
.catch-phrase {
  margin: 12px;
  color: #6f7e82;
}
.action-buttons {
  margin: 24px;
}
.mdl-button--primary.mdl-button--primary {
  color: #02d4b1;
  border: solid 1px #a0b2d8;
  margin: 8px;
}
.footer {
  padding-top: 70px;
}
.selectedButton {
}
</style>
