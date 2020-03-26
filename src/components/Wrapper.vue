<template>
  <div id="wrap">
    <Hdr v-bind:user="initial.user" />

    <div id="container">
      <div class="contents">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../assets/js/event-bus'
import Hdr from './include/Header'

export default {
  name: 'wrapper',
  props: [ 'title' ],
  components: { Hdr },
  data () {
    return {
      initial: {
        user: {}
      }
    }
  },
  created () {
    EventBus.$on('userUpdate', (value) => {
      this.userCalculation(value)
    })
  },
  methods: {
    userCalculation (...rest) {
      this.initial.user = rest[0]
    }
  }
}
</script>
