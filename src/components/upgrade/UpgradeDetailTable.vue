<template>
  <table class="table_global">
    <colgroup>
      <col style="width:30%" />
      <col />
    </colgroup>

    <caption>{{ name }} 정보를 확인할 수 있습니다.</caption>

    <tbody>
      <tr>
      <th><span class="outer_cell"><span class="inner_cell">몸체</span></span></th>
      <td>
        <ul class="list_choice type_upgrade">
          <li v-for="(item, index) in upgrade" v-bind:key="index">
            <span class="box_choice">
              <input type="radio" name="body" v-bind:id="`body${index + 1}`" class="input_choice" v-bind:value="item.rate" v-on:change="pow" ref="powChoice" />
              <label v-bind:for="`body${index + 1}`" class="label_choice">{{ item.title }}</label>
            </span>
          </li>
        </ul>
      </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell">
            <span class="inner_cell" v-if="equipment === 'ranged'">총열</span>
            <span class="inner_cell" v-else>칼날</span>
          </span>
        </th>
        <td>
          <ul class="list_choice type_upgrade">
            <li v-for="(item, index) in upgrade" v-bind:key="index">
              <span class="box_choice">
                <input type="radio" name="barrel" v-bind:id="`barrel${index + 1}`" class="input_choice" v-bind:value="item.rate" v-on:change="crt" ref="crtChoice" />
                <label v-bind:for="`barrel${index + 1}`" class="label_choice">{{ item.title }}</label>
              </span>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell">
            <span class="inner_cell" v-if="equipment === 'ranged'">조준경</span>
            <span class="inner_cell" v-else>버팀쇠</span>
          </span>
        </th>
        <td>
          <ul class="list_choice type_upgrade">
            <li v-for="(item, index) in upgrade" v-bind:key="index">
              <span class="box_choice">
                <input type="radio" name="sight" v-bind:id="`sight${index + 1}`" class="input_choice" v-bind:value="item.rate" v-on:change="acr" ref="acrChoice" />
                <label v-bind:for="`sight${index + 1}`" class="label_choice">{{ item.title }}</label>
              </span>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell">
            <span class="inner_cell" v-if="equipment === 'ranged'">손잡이</span>
            <span class="inner_cell" v-else>손잡이</span>
          </span>
        </th>
        <td>
          <ul class="list_choice type_upgrade">
            <li v-for="(item, index) in upgrade" v-bind:key="index">
              <span class="box_choice">
                <input type="radio" name="grip" v-bind:id="`grip${index + 1}`" class="input_choice" v-bind:value="item.rate" v-on:change="snp" ref="snpChoice" />
                <label v-bind:for="`grip${index + 1}`" class="label_choice">{{ item.title }}</label>
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
  name: 'upgrade-detail-table',
  props: [ 'equipment', 'name', 'power', 'shoot', 'hit', 'critical' ],
  data () {
    return {
      initial: 0,
      upgrade: [
        { title: '기본', rate: 0, checked: true },
        { title: '초보', rate: 0.1, checked: false },
        { title: '숙련', rate: 0.3, checked: false },
        { title: '전문', rate: 0.5, checked: false },
        { title: '장인', rate: 1, checked: false },
        { title: '명인', rate: 2, checked: false },
        { title: 'O.T.', rate: 3, checked: false }
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
  created () {
    EventBus.$on('reinforceUpdate', (value) => {
      this.$emit('reinforce', { column: 'power', value: value })
    })
  },
  methods: {
    initialize () {
      for (let i = 0; i < this.upgrade.length; i++) {
        this.$refs.powChoice[i].checked = this.upgrade[i].checked
        this.$refs.crtChoice[i].checked = this.upgrade[i].checked
        this.$refs.acrChoice[i].checked = this.upgrade[i].checked
        this.$refs.snpChoice[i].checked = this.upgrade[i].checked
      }
    },
    calculation (...rest) {
      return Math.round(rest[0].value * (parseFloat(rest[0].rate) + 1))
    },
    pow (event) {
      this.initial = this.power

      this.$emit('upgrade', { column: 'power', value: this.calculation({ value: this.initial, rate: event.target.value }) })
    },
    crt (event) {
      this.$emit('upgrade', { column: 'critical', value: this.calculation({ value: this.critical, rate: event.target.value }) })
    },
    acr (event) {
      this.$emit('upgrade', { column: 'hit', value: this.calculation({ value: this.hit, rate: event.target.value }) })
    },
    snp (event) {
      this.$emit('upgrade', { column: 'shoot', value: this.calculation({ value: this.shoot, rate: event.target.value }) })
    }
  }
}
</script>
