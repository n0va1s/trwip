<template lang="pug">
    div
      button(@click="onClick") Sair da Trwip
</template>

<script>
export default {
  name: 'leave-trwip',
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

body:before{
  content:'';
  height:100%;
  display:inline-block;
  vertical-align:middle;
}
button{
  background:#990000
;
  color:#fff;
  border:none;
  position:relative;
  height:52px;
  font-size: 1em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
}
button:hover{
  background: rgba(255,255,255,0.8);
  color: #990000
;
}
button:before,button:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #990000
;
  transition:400ms ease all;
}
button:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
button:hover:before,button:hover:after{
  width:100%;
  transition:800ms ease all;
}

</style>
