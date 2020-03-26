<template>
  <table class="table_global">
    <colgroup>
      <col style="width:30%" />
      <col />
    </colgroup>

    <caption>{{ name }} 정보를 확인할 수 있습니다.</caption>

    <tbody>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">세금</span></span></th>
        <td>
          <ul class="list_choice list_tax">
            <li v-for="(item, index) in list" v-bind:key="index">
              <span class="box_choice">
                <input type="radio" name="tax" v-bind:id="item.id" class="input_choice" v-bind:value="item.rate" v-on:change="calculation" ref="taxChoice" />
                <label v-bind:for="item.id" class="label_choice">{{ item.title }}</label>
              </span>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">초보</span></span></th>
        <td>
          <span class="outer_cell">
            <span class="inner_cell">
              <em class="emphasis_price">{{ currency(Math.round(value * 1)) }}</em>원

              <dl class="list_absolute">
                <dt>앱솔루트 업그레이드</dt>
                <dd>{{ currency(Math.round(value * 3)) }}원</dd>
              </dl>
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">숙련</span></span></th>
        <td>
          <span class="outer_cell">
            <span class="inner_cell">
              <em class="emphasis_price">{{ currency(Math.round(value * 3)) }}</em>원
              <dl class="list_absolute">
                <dt>앱솔루트 업그레이드</dt>
                <dd>{{ currency(Math.round(value * 8)) }}원</dd>
              </dl>
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">전문</span></span></th>
        <td>
          <span class="outer_cell">
            <span class="inner_cell">
              <em class="emphasis_price">{{ currency(Math.round(value * 5)) }}</em>원
              <dl class="list_absolute">
                <dt>앱솔루트 업그레이드</dt>
                <dd>{{ currency(Math.round(value * 2.5)) }}원</dd>
              </dl>
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">장인</span></span></th>
        <td rowspan="3">
          <span class="outer_cell">
            <span class="inner_cell">
              <em class="emphasis_price">{{ currency(Math.round(value * 1)) }}</em>원
              <p class="text_impossibility">앱솔루트 업그레이드 불가능</p>
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">명인</span></span></th>
      </tr>
      <tr>
        <th><span class="outer_cell"><span class="inner_cell">O.T.</span></span></th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { EventBus } from '../../assets/js/event-bus'

export default {
  name: 'tax-detail-table',
  props: [ 'name', 'price' ],
  data () {
    return {
      initial: 0,
      value: 0,
      list: [
        { id: 'negative', title: '-5%', rate: -5, checked: false },
        { id: 'default', title: '0%', rate: 0, checked: true },
        { id: 'positive', title: '+5%', rate: 5, checked: false }
      ]
    }
  },
  watch: {
    price (value) {
      this.calculation(value)

      this.initialize()
    },
    '$route' (to, from) {
      this.initialize()
    }
  },
  methods: {
    initialize () {
      for (let i = 0; i < this.list.length; i++) {
        this.$refs.taxChoice[i].checked = this.list[i].checked
      }
    },
    currency (value) {
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    },
    calculation (event) {
      let price
      let value

      if (typeof event === 'number') {
        price = event
        value = 0
      }

      if (typeof event === 'object') {
        price = this.price
        value = (event.target.value !== 'undefined') ? event.target.value : 0
      }

      this.initial = price

      this.value = (this.initial * (10 / 100)) * (1 + (value / 100))

      EventBus.$emit('taxUpdate', this.value)
    }
  }
}
</script>
