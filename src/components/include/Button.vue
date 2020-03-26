<template>
  <div class="group_button">
    <router-link v-bind:to="{ name: `${initial.component}List`, params: { number: initial.history }, query: { grade: grade } }" class="button_global">목록</router-link>
  </div>
</template>

<script>
export default {
  name: 'button1',
  props: [ 'history', 'category', 'equipment', 'grade' ],
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
