<template>
  <div id="header-bottom" class="mdl-layout__header-row">
    <img @click="goHome" class="mdl-layout-title" src="/uploads/logo_trwip.png"/>
    <div class="mdl-layout-spacer"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'header-bottom',
    methods: {
      goHome () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
.mdl-layout-title {
  cursor: pointer;
  width: 10%;
  max-height: 80%;
}

</style>
