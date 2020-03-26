<template>
  <table class="table_global">
    <colgroup>
      <col style="width:30%" />
      <col />
      <col style="width:30%" />
      <col />
    </colgroup>

    <caption>{{ name }} 정보를 확인할 수 있습니다.</caption>

    <tbody>
      <tr class="test1">
        <th>
          <span class="outer_cell"><span class="inner_cell">가격</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ initial.price }}원</span></span>
        </td>
      </tr>
      <tr class="test1">
        <th>
          <span class="outer_cell"><span class="inner_cell">분류</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ type }}</span></span>
        </td>
      </tr>
      <tr class="test1">
        <th>
          <span class="outer_cell"><span class="inner_cell">등급</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ grade }}</span></span>
        </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell"><span class="inner_cell">공격력</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ initial.power }}</span></span>
        </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell"><span class="inner_cell">치명타</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ critical }}</span></span>
        </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell"><span class="inner_cell">명중률</span></span>
        </th>
        <td>
          <span class="outer_cell"><span class="inner_cell">{{ percent(hit) }}%</span></span>
        </td>
        <th>
          <span class="outer_cell"><span class="inner_cell">탄착률</span></span>
        </th>
        <td>
          <span class="outer_cell"><span class="inner_cell">{{ percent(shoot) }}%</span></span>
        </td>
      </tr>
      <tr class="test1">
        <th>
          <span class="outer_cell"><span class="inner_cell">무게</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ weight }}</span></span>
        </td>
      </tr>
      <tr>
        <th>
          <span class="outer_cell"><span class="inner_cell">속도</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell">
            <span class="inner_cell" v-if="equipment === 'ranged'">{{ speed }}발/1분</span>
            <span class="inner_cell" v-else>{{ speed }}회/1분</span>
          </span>
        </td>
      </tr>
      <tr class="test1">
        <th>
          <span class="outer_cell"><span class="inner_cell">크기</span></span>
        </th>
        <td colspan="3">
          <span class="outer_cell"><span class="inner_cell">{{ size }}</span></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { EventBus } from '../../assets/js/event-bus'

export default {
  name: 'weapon-detail-table',
  props: [ 'equipment', 'name', 'price', 'type', 'grade', 'power', 'hit', 'shoot', 'weight', 'speed', 'critical', 'size' ],
  data () {
    return {
      initial: {
        price: 0,
        power: 0
      }
    }
  },
  created () {
    EventBus.$on('taxUpdate', (value) => {
      this.initial.price = this.currency(value)
    })
  },
  computed: {
    percent () {
      return (value) => {
        return (value > 100) ? 100 : Math.floor(value)
      }
    }
  },
  watch: {
    price (value) {
      this.initial.price = this.currency(value)
    },
    power (value) {
      this.initial.power = this.currency(value)
    }
  },
  methods: {
    currency (value) {
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  }
}
</script>
