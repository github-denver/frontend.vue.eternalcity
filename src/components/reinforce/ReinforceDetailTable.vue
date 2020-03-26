<template>
  <table class="table_global">
    <colgroup>
      <col style="width:30%" />
      <col />
    </colgroup>

    <caption>{{ name }} 정보를 확인할 수 있습니다.</caption>

    <tbody>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">일반</span></span></th>
        <td>
          <ul class="list_choice list_reinforce">
            <li v-for="(item, index) in reinforce.slice(0, 10)" v-bind:key="index">
              <span class="box_choice">
                <input type="radio" name="reinforce" v-bind:id="`normal${index + 1}`" class="input_choice" v-bind:value="index" v-on:change="pow" ref="reinforceChoice" />
                <label v-bind:for="`normal${index + 1}`" class="label_choice">{{ item.title }}</label>
              </span>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">MAX</span></span></th>
        <td>
          <ul class="list_choice list_reinforce">
            <li v-for="(item, index) in reinforce.slice(10)" v-bind:key="index">
              <span class="box_choice">
                <input type="radio" name="reinforce" v-bind:id="`max${index + 1}`" class="input_choice" v-bind:value="`1${index}`" v-on:change="pow" ref="reinforceChoice" />
                <label v-bind:for="`max${index + 1}`" class="label_choice">{{ item.title }}</label>
              </span>
            </li>
          </ul>
        </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import { EventBus } from '../../assets/js/event-bus'

export default {
  name: 'reinforce-detail-table',
  props: [ 'name', 'power' ],
  data () {
    return {
      reinforce: [
        { title: '+0', rate: 0, checked: true },
        { title: '+1', rate: 1, checked: false },
        { title: '+2', rate: 2, checked: false },
        { title: '+3', rate: 3, checked: false },
        { title: '+4', rate: 4, checked: false },
        { title: '+5', rate: 5, checked: false },
        { title: '+6', rate: 6, checked: false },
        { title: '+7', rate: 7, checked: false },
        { title: '+8', rate: 8, checked: false },
        { title: '+9', rate: 9, checked: false },
        { title: 'MAX +0', rate: 0, checked: false },
        { title: 'MAX +1', rate: 1, checked: false },
        { title: 'MAX +2', rate: 1, checked: false },
        { title: 'MAX +3', rate: 3, checked: false },
        { title: 'MAX +4', rate: 3, checked: false },
        { title: 'MAX +5', rate: 3, checked: false },
        { title: 'MAX +6', rate: 6, checked: false },
        { title: 'MAX +7', rate: 6, checked: false },
        { title: 'MAX +8', rate: 6, checked: false },
        { title: 'MAX +9', rate: 10, checked: false }
      ]
    }
  },
  watch: {
    name () {
      this.initialize()
    },
    '$route' (to, from) {
      this.initialize()
    }
  },
  methods: {
    initialize () {
      for (let i = 0; i < this.reinforce.length; i++) {
        this.$refs.reinforceChoice[i].checked = this.reinforce[i].checked
      }
    },
    pow (event) {
      EventBus.$emit('reinforceUpdate', event.target.value)
    }
  }
}
</script>
