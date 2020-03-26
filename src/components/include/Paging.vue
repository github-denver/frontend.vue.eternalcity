<template>
  <div>
    <ul class="list_paging">
      <li>
        <router-link v-if="current > 1" v-bind:to="{ name: initial.component, params: { number: current - 1 }, query: { grade: grade } }" v-on:click.native="paginate(current - 1, grade)" class="link_paging">이전</router-link>
      </li>
      <li v-for="(item, index) in pagination" v-bind:key="index">
        <router-link v-if="current === item" v-bind:to="{ name: initial.component, params: { number: item }, query: { grade: grade } }" v-bind:key="item" v-on:click.native="paginate(item, grade)" class="link_paging current">{{ item }}</router-link>
        <router-link v-else v-bind:to="{ name: initial.component, params: { number: item }, query: { grade: grade } }" v-on:click.native="paginate(item, grade)" class="link_paging">{{ item }}</router-link>
      </li>
      <li>
        <router-link v-if="current < total" v-bind:to="{ name: initial.component, params: { number: current + 1 }, query: { grade: grade } }" v-on:click.native="paginate(current + 1, grade)" class="link_paging">다음</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import { EventBus } from '../../assets/js/event-bus'

export default {
  name: 'paging',
  props: [ 'current', 'total', 'start', 'end', 'category', 'grade', 'equipment' ],
  data () {
    return {
      initial: {
        component: '',
        url: '',
        category: '',
        grade: 0,
        equipment: '',
        pagination: {
          current: 0,
          start: 0,
          end: 0,
          total: 0
        }
      }
    }
  },
  created () {
    this.initial.url = `/eterworld/${this.category}/${this.equipment}/list/`

    if (this.category === 'weapon') {
      this.initial.component = (this.equipment === 'ranged') ? 'WeaponRanged' : 'WeaponMelee'
    } else {
      this.initial.component = (this.equipment === 'human') ? 'ArmourHuman' : 'ArmourParasite'
    }

    this.initial.component = `${this.initial.component}List`
  },
  computed: {
    pagination () {
      let pagination = []

      for (let i = this.start; i <= this.end; i++) {
        pagination.push(i)
      }

      return pagination
    }
  },
  methods: {
    paginate (number, grade) {
      window.scrollTo(0, 0)
    }
  }
}
</script>
