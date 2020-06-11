<template>
    <div id="search-complete">
        <div class="container">
            <div class="rowCom"><search-row :visualStyle="searchVisualStyle" :searchPassed="searchInfo"></search-row></div>
        </div>
    </div>
</template>

<script>
import SearchRow from './SearchRow'

export default {
  name: 'search-complete',
  data () {
    return {
      searchVisualStyle: 'light',
      searchInfo: {
        name: '',
        number: 1,
        text: ''
      }
    }
  },
  methods: {
    checkInitialFields () {
      this.searchInfo.name = 'dns'
      this.searchInfo.number = 3
      this.searchInfo.text = 'teste procura'
    }
  },
  components: {
    SearchRow
  },
  mounted: function () {
    this.checkInitialFields()
  }
}
</script>

<style scoped>
.container{
    height: 300px;
    background-color: #2A3B8F;
}
.rowCom{
    padding-top: 30px;
}
</style>
