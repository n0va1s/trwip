<template lang='pug'>
div#profile-trwips
  div.results-section
    div.results-count-header {{ list.length }}
    div.results-title
      div.results-font-header {{ messageTitle }}
    carousel(:perPage='1', :perPageCustom='responsive')
      slide(v-for='trwip in list', :key='trwip.name')
        div
          div(
            v-if='getNumberOfMessages(trwip) > 0'
            :data-badge='getNumberOfMessages(trwip) < 100 ? getNumberOfMessages(trwip) : "99+"'
            ).group-badge
          trwip-card(:trwip='trwip', :isFromProfile='isFromProfile')
</template>

<script>
import TrwipCard from '../TrwipCard'
import { Carousel, Slide } from 'vue-carousel'
import { mapGetters } from 'vuex'
import * as getters from '../../store/getterNames'

export default {
  name: 'profile-trwips',
  props: {
    messageTitle: {
      type: String,
      default: 'minhas viagens'
    },
    list: {
      type: Array
    },
    isFromProfile: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TrwipCard,
    Carousel,
    Slide
  },
  data () {
    return {
      messages: 0
    }
  },
  computed: {
    ...mapGetters([
      getters.GROUP_MESSAGES
    ]),
    responsive () {
      if (this.list.length === 2) return [[860, 2]]
      else if (this.list.length >= 3) return [[961, 3], [860, 2]]
    }
  },
  methods: {
    getNumberOfMessages (trwip) {
      const channelId = trwip.id + trwip.creatorId
      let channel = this.groupMessages.filter((channel) => {
        return channel.channel === channelId
      })[0]

      if (channel) {
        return channel.messagesCount
      }
    }
  }
}
</script>

<style scoped>

.results-title {
  display: flex;
  /*height: 80px;*/
  font-size: 25px;
  color: #A0B2B8;
  align-items: center;
  justify-content: center;
  width: 80%;
  border-bottom: dashed 1px #2A3B8F;
}
.results-count-header{
  font-size: 85px;
  color: #A0B2B8;
  align-items: center;
  width: 80%;
}
.results-section{
  z-index: -1000;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.group-badge {
  position: relative;
}
.group-badge:after {
  content: attr(data-badge);
  position: absolute;
  top: -10px;
  right: 3px;
  font-size: 1.5em;
  background: red;
  color: white;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}
</style>
