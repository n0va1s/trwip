<template>
    <div id="trwip-general">
      <div class="mdl-layout__content generalSection"> 
          <div class="logo-font slogan">{{ titleGeneral }}</div>
          <div class="logo-font sub-slogan">{{ subTitleGeneral }}</div>
          <center><div class="texts">{{ completeTextGeneral }}</div></center>
   </div>
  <footer-trwip></footer-trwip>
   </div>
</template>

<script>
import FooterTrwip from '../FooterTrwip'

export default {
  name: 'TrwipGeneral',
  props: {
    completeTextGeneral: {
      type: String,
      default: 'Texto'
    },
    subTitleGeneral: {
      type: String,
      default: 'Sub-Titulo'
    },
    titleGeneral: {
      type: String,
      default: 'Titulo'
    }
  },
  data () {
    return { }
  },
  components: {
    FooterTrwip
  }
}
</script>

<style scoped>
.generalSection{
  display: flex;
  flex-direction: column;
}
.texts{
    width: 80%;
    padding-bottom: 30px;
    font-size: 16px;
}
 .logo-font {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  color: #767777;
  font-weight: 500;
}
.slogan {
  font-size: 60px;
  padding-top: 60px;
  color: #4990E2;
}
.slogan:hover {
  color: #89D5EB;
}
.sub-slogan {
  font-size: 21px;
  padding-top: 14px;
  padding-bottom: 34px;
}
.termsSection {
  position: relative;
  height: auto;
  min-height: 400px;
  width: 100%;
  background-color: #f3f3f3;
}

</style>
