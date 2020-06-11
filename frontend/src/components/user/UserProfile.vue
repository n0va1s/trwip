<template lang="pug">
div#profile
  div.profile-header
    user-info(:user='profileUser')
    div(v-if='user.id').action-buttons
      div
        button(@click='openPersonalChat').mdl-button.mdl-js-button.mdl-button--primary Conversar
        Dropdown(style='margin-left: 20px', @on-click='invite')
          button.mdl-button.mdl-js-button.mdl-button--primary Convidar
          DropdownMenu(slot='list')
            div(v-if='myTrwips.length > 0 || user.membership.length > 0')
              DropdownItem(v-for='trwip in myTrwips', :key='trwip.title' :name='trwip.id') {{ trwip.title }}
              DropdownItem(v-for='trwip in user.membership', :key='trwip.title') {{ trwip.title }}
            DropdownItem(v-else, :disabled='true') Sem Trwips para convidar
  profile-trwips(:messageTitle='messageTitle', v-if='isTrwipsLoaded', :list='trwips', :isFromProfile='true', :id='profileUser.id')
  footer-trwip.footer
</template>

<script>
import FooterTrwip from '@/components/FooterTrwip'
import UserInfo from '@/components/user/profile/UserInfo'
import ProfileTrwips from './ProfileTrwips'
import gravatar from 'vue-gravatar'
import util from '../../helpers/util'
import store from '@/store'
import { mapGetters, mapActions } from 'vuex'
import * as actionTypes from '@/store/actionTypes'
import * as getterNames from '@/store/getterNames'
import _ from 'lodash'
import io from '../../api/socket/'

export default {
  name: 'user-profile',
  async beforeRouteEnter (to, from, next) {
    try {
      if (window.localStorage.getItem('id') !== null &&
      to.params.id === window.localStorage.getItem('id')) {
        next(vm => {
          vm.$router.push('/profile')
        })
      } else {
        let {data} = await store.dispatch(actionTypes.RETRIEVE_USER, to.params.id)
        let trwipPromise = await store.dispatch(actionTypes.USER_TRWIP, data.id)
        next(vm => {
          vm.profileUser = data
          vm.isUserLoaded = true
          vm.trwips = trwipPromise.data
          vm.isTrwipsLoaded = true
          vm.messageTitle = 'viagens de ' + data.name
        })
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters([
      getterNames.USER
    ])
  },
  components: {
    'vue-gravatar': gravatar,
    'footer-trwip': FooterTrwip,
    'profile-trwips': ProfileTrwips,
    'user-info': UserInfo
  },
  data () {
    return {
      profileUser: {},
      trwips: [],
      myTrwips: [],
      isUserLoaded: false,
      isTrwipsLoaded: false,
      messageTitle: '',
      selectedId: ''
    }
  },
  methods: {
    ...mapActions([
      actionTypes.USER_TRWIP,
      actionTypes.SEND_INVITE,
      actionTypes.VERIFY_PERSONAL_CHAT
    ]),
    invite (trwipId) {
      if (trwipId) {
        let selectedTrwip = this.selectedTrwip(trwipId)
        this.$Modal.confirm({
          title: 'Você tem certeza que deseja realizar esse convite?',
          content: `Você tem certeza que deseja convidar o ${this.profileUser.name} para a trwip ${selectedTrwip.title}`,
          onOk: async () => {
            this.sendInvite({ userId: this.profileUser.id, trwipId: selectedTrwip.id })
            util.showSnackbar('Convite enviado com sucesso!')
            this.$router.push(`/trwip/${selectedTrwip.id}`)
          },
          onCancel: () => {
          }
        })
      } else {
        util.showSnackbar('Essa não é uma Trwip valida')
      }
    },
    async openPersonalChat () {
      const userId = this.profileUser.id
      const channelId = await this.verifyPersonalChat({ userId })
      io.emit('new:room', { channelId, userId })
      this.$router.push('/profile')
    },
    selectedTrwip (id) {
      const trwips = _.merge(this.myTrwips, this.user.membership)
      return trwips.filter(t => t.id === id)[0]
    }
  },
  async created () {
    if (this.user.id) {
      let { data } = await this.userTrwip(this.user.id)
      this.myTrwips = data
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

.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

</style>
