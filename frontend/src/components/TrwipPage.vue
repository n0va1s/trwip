<template lang="pug">
div(v-mdl="").trwip-page#top
  div.content
    div(:style="{ background: 'url(' + imagePath + ') center / cover'}").cover
      div.overlay
        h2(v-if='!isEditing').title {{ trwip.title }}
        div(v-else).editHeader
          div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.title
            input.mdl-textfield__input(v-model='trwip.title', type='text')
            label.mdl-textfield__label Titulo da sua viagem *
          button.mdl-button.mdl-js-button.mdl-button--fab.photoupload
            i.material-icons add_a_photo
            input#upimage.upload(type='file', @change='setTrwipImg', name='pic')
        h3(v-if='trwip.finished') Trwip finalizada
    vue-tabs(@tab-change="handleTabChange" :centered='true' v-model='tabName').tabs
      v-tab(title='Informações')
        trwip-info(
          @finished='finishTrwip',
          @excluded='excludeTrwip',
          @editToggle='toggleHeader',
          @leave='onLeaveTrwip',
          @removeJoin='onRemoveJoin',
          @updateTrwip='updateTrwip',
          :trwip='trwip',
          :creator='trwip.creator',
          :isCreator='isCreator')
      v-tab(:title='membersTitle')
        trwip-member-list(:members='trwip.members', :creator='trwip.creator')
      v-tab(:title='joinTitle', v-if='!trwip.finished && isCreator')
        trwip-joins(:joiners='trwip.joiners', :trwipId='trwip.id', @joined='changeFromJoinToMember', @unjoined='unjoin')
      v-tab(:title='chatTitle', v-if='!trwip.finished && (isMember || isCreator)')
        group-chat-messages(:channelId='channelId', :trwip='trwip')
      v-tab(title='Avaliação', v-if='trwip.finished && (isMember || isCreator)')
        trwip-evaluation(:trwip='trwip', :isMember='isMember', @evaluated='updateTrwip')
      v-tab(title='Convidar', v-if='!trwip.finished && (isCreator || isMember)')
        invite-members(:trwipId="trwip.id")
</template>

<script>
import imageApi from '@/api/image'
import store from '@/store'
import {mapActions, mapGetters} from 'vuex'
import * as actionTypes from '@/store/actionTypes'
import * as getterNames from '@/store/getterNames'
import {VueTabs, VTab} from 'vue-nav-tabs/dist/vue-tabs.js'
import 'vue-nav-tabs/themes/paper.css'
import TrwipInfo from './TrwipInfo'
import TrwipMemberList from './TrwipMemberList'
import TrwipJoins from './TrwipJoins'
import TrwipEvaluation from './TrwipEvaluation'
import ChatMessages from './ChatMessages'
import InviteMembers from './InviteMembers'
import FooterTrwip from './FooterTrwip'
import util from '@/helpers/util'
import GroupChatMessages from './GroupChatMessages'

export default {
  name: 'trwip-page',
  components: {
    VueTabs,
    VTab,
    TrwipInfo,
    TrwipMemberList,
    TrwipJoins,
    TrwipEvaluation,
    ChatMessages,
    GroupChatMessages,
    InviteMembers,
    FooterTrwip
  },
  async beforeRouteEnter (to, from, next) {
    try {
      let {data} = await store.dispatch(actionTypes.RETRIEVE_TRWIP, { id: to.params.id })
      next(async vm => {
        vm.trwip = data
        vm.channelId = `${data.id}${data.creatorId}`
        vm.imgurl = data.image

        if (to.path.endsWith('/join')) {
          vm.tabName = await vm.joinTitle
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  props: {
  },
  data () {
    return {
      trwip: {},
      imgurl: '',
      isEditing: false,
      channelId: '',
      newImage: '',
      tabName: '',
      componentIsOpened: false
    }
  },
  computed: {
    ...mapGetters([
      getterNames.USER,
      getterNames.GROUP_MESSAGES
    ]),
    imagePath () {
      if (this.trwip.image) {
        let url = this.trwip.image
        if (url.includes('/trwip/')) {
          return url.replace('/trwip', '')
        }
        // return 'http://localhost:3000/' + url
        return '/' + url
      }
    },
    isCreator () {
      return (this.trwip.creatorId === window.localStorage.getItem('id'))
    },
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
    joinTitle () {
      return 'Joins (' + this.trwip.joiners.length + ')'
    },
    membersTitle () {
      if (this.trwip.members) {
        return `Participantes (${this.trwip.members.length + 1})`
      } else {
        return 'Participantes (1)'
      }
    },
    chatTitle () {
      const numberOfMessages = this.getNumberOfMessages()
      return `Chat (${numberOfMessages})`
    }
  },
  methods: {
    ...mapActions([
      actionTypes.UPSERT_TRWIP,
      actionTypes.DELETE_TRWIP,
      actionTypes.RETRIEVE_TRWIP,
      actionTypes.LEAVE_TRWIP,
      actionTypes.UNCONFIRM_JOIN_TRWIP,
      actionTypes.READ_MESSAGES,
      actionTypes.FETCH_CHANNELS_COUNT
    ]),
    setTrwipImg (e) {
      if (e.target.files) {
        let image = e.target.files[0]
        imageApi.uploadDisposable(image)
        .then((res) => {
          this.trwip.image = res.data.path
          this.newImage = res.data.path
        })
      }
    },
    toggleHeader () {
      this.isEditing = !this.isEditing
    },
    changeFromJoinToMember (id) {
      let joinerFound = {}
      this.trwip.joiners.forEach((joiner) => {
        if (joiner.id === id) {
          joinerFound = joiner
        }
      })

      this.trwip.members.push(joinerFound)
      this.trwip.joiners.splice(this.trwip.joiners.indexOf(joinerFound), 1)
    },
    unjoin (id) {
      let joinerFound = {}
      this.trwip.joiners.forEach((joiner) => {
        if (joiner.id === id) {
          joinerFound = joiner
        }
      })

      this.trwip.joiners.splice(this.trwip.joiners.indexOf(joinerFound), 1)
    },
    finishTrwip () {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja finalizar essa trwip?',
        onOk: async () => {
          this.trwip.finished = true
          let {data} = await this.upsertTrwip({trwip: this.trwip})
          if (data.finished) {
            util.showSnackbar('Trwip finaliada com sucesso!')
          } else {
            util.showSnackbar('Ops! Alguma coisa deu errado. Por favor, tente novamente.')
          }
        },
        onCancel: () => {
        }
      })
    },
    onLeaveTrwip () {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja sair?',
        onOk: async () => {
          try {
            await this.leaveTrwip({ userId: this.user.id, trwipId: this.trwip.id })
            this.trwip.members.splice(this.trwip.members.indexOf(this.user.id), 1)
            util.showSnackbar('Você saiu desta Trwip')
          } catch (err) {
            util.showSnackbar('Ocorreu um erro ao tentar sair do Trwip')
            console.log(err)
          }
        },
        onCancel: () => {}
      })
    },
    onRemoveJoin () {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja cancelar seu Join Trwip?',
        onOk: async () => {
          try {
            await this.unconfirmJoinTrwip({ userId: this.user.id, trwipId: this.trwip.id })
            this.trwip.joiners.splice(this.trwip.joiners.indexOf(this.user.id), 1)
            util.showSnackbar('Você cancelou seu Join Trwip')
          } catch (err) {
            util.showSnackbar('Ocorreu um erro ao cancelar o Join Trwip')
            console.log(err)
          }
        },
        onCancel: () => {}
      })
    },
    async updateTrwip (trwipData) {
      if (this.newImage) {
        trwipData.image = this.newImage
      }
      trwipData.title = this.trwip.title
      delete trwipData.rate // otherwise will zero trwip rate
      const { data } = await this.upsertTrwip({trwipId: this.trwip.id, trwip: trwipData})
      this.trwip = data
      util.showSnackbar('Trwip atualizada com sucesso')
    },
    excludeTrwip () {
      this.$Modal.confirm({
        title: 'Você tem certeza que deseja exluir essa trwip?',
        onOk: async () => {
          await this.deleteTrwip({ userId: this.trwip.creatorId, trwipId: this.trwip.id })
          this.$router.push('/profile')
          util.showSnackbar('Trwip excluída com sucesso!')
        },
        onCancel: () => {
        }
      })
    },
    async handleTabChange (_, { title }) {
      if (title === this.chatTitle) {
        await this.readMessages({ channelId: this.channelId })
        this.fetchChannelsCount()
      }
    },
    getNumberOfMessages () {
      const channelId = this.trwip.id + this.trwip.creatorId
      let channel = this.groupMessages.filter((channel) => {
        return channel.channel === channelId
      })[0]

      if (channel) {
        return channel.messagesCount
      } else {
        return 0
      }
    }
  },
  updated () {
    if (this.getNumberOfMessages() > 0 && !this.componentIsOpened) {
      this.componentIsOpened = true
      this.tabName = this.chatTitle
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3.5rem;
  font-weight: 300;
}
.editHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  .photoupload {
    background-color: white;
  }
  .upload {
    opacity: 0;
  }
}
.title {
  color: white;
  width: 100%;
  .mdl-textfield__label {
    font-size: 2rem;
    color: white;
  }
  input {
    font-size: 4rem;
    color: white;
    border-bottom: 1px solid white;
  }
}
.cover, .overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  min-height: 35vh;
  z-index: -1;
}
h2 {
  color: #fafafa;
}
h3 {
  font-size: 2.5em;
  color: white;
  font-weight: 700;
}
.overlay {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 1000;
  cursor: pointer;
}
.tabs {
  margin-top: 10px;
}
.trwip-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  bottom: 0;
}
</style>
