<template lang="pug">
  div#search-view
    div.mdl-layout__content.mainSection
      a(name='top')
      div.logo-font-header.slogan-header Viajando em boa companhia
      div.logo-font-header.sub-slogan-header Escolha para onde, quando e com quem deseja viajar
      search-row(:visualStyle='searchVisualStyle' @search='updateSearch')
    center
      div.results-section
        div.results-title
          div.results-font-header {{ totalFinded }} resultado(s) encontrados para '{{ searchText }}'
        div.list
          trwip-card(v-for="trwip in trwips" :key="trwip.title" :trwip="trwip")
    footer-trwip
</template>

<script>
import SearchRow from './SearchRow'
import FooterTrwip from './FooterTrwip'
import Vue from 'vue'
import moment from 'moment'
import TrwipCard from './TrwipCard'
import * as actionTypes from '@/store/actionTypes'

export default {
  name: 'search-view',
  components: {
    SearchRow,
    TrwipCard,
    FooterTrwip
  },
  data () {
    return {
      searchVisualStyle: 'light',
      searchText: ''
    }
  },
  computed: {
    trwips () {
      return this.$store.state.trwip.findedTrwips
    },
    totalFinded () {
      return this.$store.state.trwip.totalFinded
    }
  },
  methods: {
    async updateSearch (trwipSearch, type) {
      let search = trwipSearch
      this.searchText = search
      if (type.value === 'startDate') {
        trwipSearch = moment(search)
        search = `${trwipSearch.month() + 1}-${trwipSearch.year()}`
        this.searchText = ` o mês ${trwipSearch.month() + 1} de ${trwipSearch.year()} `
      }
      if (type.value === 'maxValue') {
        search = `${trwipSearch.max}&minValue=${trwipSearch.min}`
        this.searchText = `faixa de preço entre ${trwipSearch.min} e ${trwipSearch.max}`
      }
      this.$store.dispatch(actionTypes.CLEAN_SEARCH)
      await this.$store.dispatch(actionTypes.FETCH_TRWIP_SLICE, {field: type.value, value: search, orderBy: 'startDate'})
    }
  },
  async mounted () {
    const type = this.$route.query.type
    const trwipSearch = this.$route.query.searchFor
    let search = trwipSearch
    if (type === 'startDate') {
      const splited = search.split('-')
      this.searchText = ` o mês ${splited[0]} de ${splited[1]} `
    } else if (type === 'maxValue') {
      const searchValues = trwipSearch.split('&minValue=')
      search = `${searchValues[0]}&minValue=${searchValues[1]}`
      this.searchText = `faixa de preço entre ${searchValues[1]} e ${searchValues[0]}`
    } else {
      this.searchText = search
    }
    await this.$store.dispatch(actionTypes.FETCH_TRWIP_SLICE, {field: type, value: search, orderBy: 'startDate'})
    Vue.nextTick(() => {
      window.componentHandler.upgradeAllRegistered()
    })
  }
}
</script>

<style scoped>
.mainSection {
  width: 100%;
  background: url('/uploads/trwipMainHeader4.jpg') center;
  background-size: cover;
  overflow: visible;
}
.logo-font-header {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  color: #ffffff;
}
.slogan-header {
  font-size: 75px;
  padding-top: 8%;
  font-weight: 100;
}
.sub-slogan-header {
  font-size: 21px;
  padding-top: 24px;
  padding-bottom: 84px;
  font-weight: 500;
}
.results-title {
  display: flex;
  height: 80px;
  font-size: 25px;
  color: #A0B2B8;
  align-items: center;
  justify-content: center;
  width: 80%;
  border-bottom: dashed 1px #2A3B8F;

}
.results-count-header{
  padding-top: 50px;
  font-size: 85px;
  color: #A0B2B8;
  align-items: center;
  width: 80%;
}
.results-section{
  z-index: -1000;
}
.list {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
}

.titleAdd{
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.lineAdd{
  padding-bottom: 20px;
}
.spacingDetail{
  padding-top: 20px;
}

.mdl-button--primary.mdl-button--primary {
  color: #02d4b1;
  border: solid 1px #a0b2d8;
  margin: 8px;
}

</style>
