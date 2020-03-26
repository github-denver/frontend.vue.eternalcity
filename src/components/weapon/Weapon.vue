<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'weapon',
  props: [ 'number' ]
}
</script>

<style>

</style>
