<template>
    <div>
      <button @click="onClick">JoinTrwip</button>
    </div>
</template>

<script>
export default {
  name: 'join-trwip',
  data () {
    return {}
  },
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
  background:#2A3B8F;
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
  color:#2A3B8F;
}
button:before,button:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #2A3B8F;
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
