<template>
  <header id="main-header" class="mdl-layout__header mdl-layout--fixed-header">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'main-header'
}
</script>


<style>

.mdl-layout__header{
  background-color: #ffffff;
  color: #2A3B8F;
}

</style>

