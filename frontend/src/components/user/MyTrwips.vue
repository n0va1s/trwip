<template lang='pug'>
  div#my-trwips
    vue-tabs(:centered='true')
      //- v-tab(title='Trwips Atuais')
      div
        h2.title Trwips Atuais
        profile-trwips.even(:messageTitle='messageOne',
                                  v-if='isUserLoaded',
                                  :list='joins',
                                  :isFromProfile='true')
        profile-trwips.odd(:messageTitle='messageTwo',
                                  v-if='isUserLoaded',
                                  :list='currentMembership',
                                  :isFromProfile='true')
        profile-trwips.even(:messageTitle='messageThree',
                                  v-if='isTrwipsLoaded',
                                  :list='currentTrwips',
                                  :isFromProfile='true')
      //- v-tab(title='Trwips Finalizadas')
      div
        h2.title Finalizadas
        profile-trwips.odd(:messageTitle='messageTwo',
                                  v-if='isUserLoaded',
                                  :list='finishedMembership',
                                  :isFromProfile='true')
        profile-trwips.even(:messageTitle='messageThree',
                                  v-if='isTrwipsLoaded',
                                  :list='finishedTrwips',
                                  :isFromProfile='true')
    footer-trwip
</template>

<script>
import ProfileTrwips from './ProfileTrwips'
import FooterTrwip from '@/components/FooterTrwip'
import store from '@/store'
import {VueTabs, VTab} from 'vue-nav-tabs/dist/vue-tabs.js'
import 'vue-nav-tabs/themes/paper.css'
import * as actionTypes from '@/store/actionTypes'

export default {
  name: 'my-trwips',
  components: {
    'profile-trwips': ProfileTrwips,
    'footer-trwip': FooterTrwip,
    VueTabs,
    VTab
  },
  async beforeRouteEnter (to, from, next) {
    try {
      let data = await store.dispatch(actionTypes.FETCH_CURRENT_USER)
      let trwipPromise = await store.dispatch(actionTypes.USER_TRWIP, data.id)
      next(vm => {
        vm.user = data
        vm.isUserLoaded = true
        vm.trwips = trwipPromise.data
        vm.isTrwipsLoaded = true
      })
    } catch (err) {
      console.log(err)
      next()
    }
  },
  computed: {
    joins () {
      return this.user.join_trwips.filter(trwip => { return !trwip.finished })
    },
    currentMembership () {
      return this.user.membership.filter(trwip => { return !trwip.finished })
    },
    currentTrwips () {
      return this.trwips.filter(trwip => { return !trwip.finished })
    },
    finishedMembership () {
      return this.user.membership.filter(trwip => { return trwip.finished })
    },
    finishedTrwips () {
      return this.trwips.filter(trwip => { return trwip.finished })
    }
  },
  data () {
    return {
      messageOne: 'aguardando aprovação',
      messageTwo: 'trwips como membro',
      messageThree: 'trwips criadas',
      user: {},
      isUserLoaded: false,
      trwips: [],
      isTrwipsLoaded: false
    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 15px;
}
.odd {
  background-color: #fcfcfc;
}
.even {
  background-color: white;
}
.odd, .even {
  width: 100%;
  padding: 5% 0;
}
.headerSimple{
    height: 60px;
    background-color: #f4f4f4;
}
.labelContainer{
    justify-content: center;
    align-self: center;
    align-items: center;
}
.headerLabel{
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  font-weight: 500;
  font-size: 20px;
  color: #313E47;
  padding-top: 10px;
  justify-content: center;
  align-self: center;
  align-items: center;
}
</style>
