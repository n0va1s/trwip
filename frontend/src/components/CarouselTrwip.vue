<template lang='pug'>
div.carousel-swiper
  div.swiperTitle
    label
      b  {{ carouselTitle }}
  carousel(:perPage='1', :perPageCustom='responsive', v-if='trwips.length')
    slide(v-for='trwip in trwips', :key='trwip.name')
      trwip-card(:trwip='trwip')
</template>

<script>
import TrwipCard from './TrwipCard'
import * as actionTypes from '@/store/actionTypes'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'carousel-trwip',
  components: {
    TrwipCard,
    Carousel,
    Slide
  },
  props: {
    carouselTitle: {
      type: String,
      default: 'em destaque'
    },
    query: {
      type: String,
      default: '?orderBy=startDate'
    }
  },
  data () {
    return {
      name: '',
      responsive: [[961, 3], [641, 2]],
      trwips: []
    }
  },
  methods: {
    async getTrwips () {
      try {
        var query = this.query
        let {data} = await this.$store.dispatch(actionTypes.RETRIEVE_TRWIPS, {query})
        this.trwips = data.trwips
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getTrwips()
  }
}
</script>

<style scoped>
.swiperTitle {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #484848;
  font-size: 28px;
  width: 80%;
  padding-top: 3em;
  padding-bottom: 1em;
  padding-left: 3%;
  text-align: left;
}
</style>
