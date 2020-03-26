<template>
  <div class="hgroup">
    <h2 class="title_local">
      <router-link v-bind:to="{ name: `${initial.component}List`, params: { number: initial.history }, query: { grade: grade } }" class="link_title">{{ title }}</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'hgrp',
  props: [ 'history', 'title', 'category', 'equipment', 'grade' ],
  data () {
    return {
      initial: {
        component: '',
        history: 0
      }
    }
  },
  watch: {
    history () {
      this.initial.history = this.history
    }
  },
  created () {
    if (this.category === 'weapon') {
      this.initial.component = (this.equipment === 'ranged') ? 'WeaponRanged' : 'WeaponMelee'
    } else {
      this.initial.component = (this.equipment === 'human') ? 'ArmourHuman' : 'ArmourParasite'
    }

    this.initial.history = (typeof this.$route.query.history !== 'undefined') ? this.$route.query.history : this.history
  }
}
</script>

<style>

</style>
