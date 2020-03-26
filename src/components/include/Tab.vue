<template>
  <div class="group_grade">
    <ul class="list_choice type_grade">
      <li v-for="(item, index) in list" v-bind:key="index">
        <span class="box_choice">
          <input type="radio" name="grade" v-bind:id="`grade${index + 1}`" class="input_choice" v-bind:value="item.grade" v-on:change="filter" ref="gradeChoice" />
          <label v-bind:for="`grade${index + 1}`" class="label_choice">{{ item.title }}</label>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
// import { EventBus } from '../../assets/js/event-bus'

export default {
  name: 'tab',
  props: [ 'grade', 'category', 'equipment' ],
  data () {
    return {
      initial: {
        history: 1,
        component: '',
        grade: 0
      },
      list: [
        { title: '1등급', grade: 1, checked: true },
        { title: '2등급', grade: 2, checked: false },
        { title: '3등급', grade: 3, checked: false },
        { title: '4등급', grade: 4, checked: false },
        { title: '5등급', grade: 5, checked: false },
        { title: '6등급', grade: 6, checked: false },
        { title: '7등급', grade: 7, checked: false },
        { title: '8등급', grade: 8, checked: false },
        { title: '9등급', grade: 9, checked: false },
        { title: '10등급', grade: 10, checked: false },
        { title: '11등급', grade: 11, checked: false },
        { title: '12등급', grade: 12, checked: false }
      ]
    }
  },
  watch: {
    grade () {
      this.initial.grade = this.grade

      this.initialize()
    }
  },
  created () {
    this.initial.grade = this.grade
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      for (let i = 0; i < this.list.length; i++) {
        this.$refs.gradeChoice[i].checked = this.list[i].checked
      }

      this.$refs.gradeChoice[this.initial.grade - 1].checked = true
    },
    filter () {
      if (this.category === 'weapon') {
        this.initial.component = (this.equipment === 'ranged') ? 'WeaponRanged' : 'WeaponMelee'
      } else {
        this.initial.component = (this.equipment === 'human') ? 'ArmourHuman' : 'ArmourParasite'
      }

      this.$router.push({ name: `${this.initial.component}List`, params: { number: this.initial.history }, query: { grade: event.target.value } })
    }
  }
}
</script>
