<template>
  <div>
    <Hgrp
      v-bind:history="pagination.history"
      v-bind:title="initial.title"
      v-bind:category="category"
      v-bind:equipment="equipment"
      v-bind:grade="initial.grade"
    />

    <div class="wrap_attribute"
      v-bind:class="{ fixed: initial.style.active }"
      v-bind:style="{ paddingTop: initial.style.paddingTop }"
    >
      <div class="group_attribute">
        <WeaponThumbnail
          v-bind:thumbnail="initial.update.thumbnail"
          v-bind:alt="initial.update.name"
          v-bind:name="initial.update.name"
          v-bind:category="category"
          v-bind:equipment="equipment"
          v-bind:gender="gender"
        />

        <WeaponDetailTable
          v-bind:equipment="equipment"
          v-bind:name="initial.update.name"
          v-bind:price="initial.update.price"
          v-bind:type="initial.update.type"
          v-bind:grade="initial.update.grade"
          v-bind:power="initial.update.power"
          v-bind:hit="initial.update.hit"
          v-bind:shoot="initial.update.shoot"
          v-bind:weight="initial.update.weight"
          v-bind:speed="initial.update.speed"
          v-bind:critical="initial.update.critical"
          v-bind:size="initial.update.size"
        />
      </div>

      <strong class="title_local title_upgrade">업그레이드 비용</strong>
      <TaxDetailTable
        v-bind:name="initial.update.name"
        v-bind:price="initial.price"
      />

      <strong class="title_local">업그레이드</strong>
      <UpgradeDetailTable
        v-bind:equipment="equipment"
        v-bind:name="initial.update.name"
        v-bind:power="initial.item.power"
        v-bind:shoot="initial.item.shoot"
        v-bind:hit="initial.item.hit"
        v-bind:critical="initial.item.critical"
        v-on:upgrade="upgradeCalculation"
        v-on:reinforce="reinforceCalculation"
      />

      <strong class="title_local">강화</strong>
      <ReinforceDetailTable
        v-bind:name="initial.update.name"
        v-bind:power="initial.update.power"
      />

      <Button
        v-bind:history="pagination.history"
        v-bind:category="category"
        v-bind:equipment="equipment"
        v-bind:grade="initial.grade"
      />
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../assets/js/event-bus'
import API from '../../api/index.js'
import WeaponThumbnail from './WeaponThumbnail.vue'
import WeaponDetailTable from './WeaponDetailTable.vue'
import TaxDetailTable from '../tax/TaxDetailTable.vue'
import UpgradeDetailTable from '../upgrade/UpgradeDetailTable.vue'
import ReinforceDetailTable from '../reinforce/ReinforceDetailTable.vue'
import Hgrp from '../include/Hgroup'
import Button from '../include/Button.vue'

export default {
  name: 'weapon-view',
  components: { WeaponThumbnail, WeaponDetailTable, TaxDetailTable, UpgradeDetailTable, ReinforceDetailTable, Hgrp, Button },
  props: [ 'title', 'number', 'category', 'equipment', 'gender', 'grade', 'document' ],
  data () {
    return {
      initial: {
        user: {},
        number: 0,
        title: '',
        grade: 0,
        item: {},
        update: {},
        price: 0,
        current: 0,
        reinforce: {
          normal: [],
          max: []
        },
        style: {
          active: false,
          paddingTop: 0
        }
      },
      pagination: { history: 0 },
      step: [
        { 'step': '+0', 'rate': 0, checked: true },
        { 'step': '+1', 'rate': 1, checked: false },
        { 'step': '+2', 'rate': 2, checked: false },
        { 'step': '+3', 'rate': 3, checked: false },
        { 'step': '+4', 'rate': 4, checked: false },
        { 'step': '+5', 'rate': 5, checked: false },
        { 'step': '+6', 'rate': 6, checked: false },
        { 'step': '+7', 'rate': 7, checked: false },
        { 'step': '+8', 'rate': 8, checked: false },
        { 'step': '+9', 'rate': 9, checked: false },
        { 'step': 'MAX +0', 'rate': 1, checked: true },
        { 'step': 'MAX +1', 'rate': 1, checked: false },
        { 'step': 'MAX +2', 'rate': 1, checked: false },
        { 'step': 'MAX +3', 'rate': 3, checked: false },
        { 'step': 'MAX +4', 'rate': 3, checked: false },
        { 'step': 'MAX +5', 'rate': 3, checked: false },
        { 'step': 'MAX +6', 'rate': 6, checked: false },
        { 'step': 'MAX +7', 'rate': 6, checked: false },
        { 'step': 'MAX +8', 'rate': 6, checked: false },
        { 'step': 'MAX +9', 'rate': 10, checked: false }
      ]
    }
  },
  created () {
    this.initial.title = this.title

    this.initial.number = this.$route.params.number

    this.initial.grade = this.$route.query.grade

    this.pagination.history = this.$route.query.history

    this.weaponList()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    '$route' (to, from) {
      if (to.path === `/eterworld/${this.category}/${this.equipment}/view/` + this.$route.params.number) {
        window.scrollTo(0, 0)

        this.initial.number = this.$route.params.number

        this.initial.style.active = false

        this.initial.style.paddingTop = 0

        this.initial.grade = this.$route.query.grade

        this.pagination.history = this.$route.query.history

        this.weaponList()
      } else {
        window.removeEventListener('scroll', this.handleScroll)

        this.initial.current = 0
      }
    }
  },
  methods: {
    result (...rest) {
      return Math.round(rest[0].value * ((parseFloat(rest[0].rate) / 100) + 1))
    },
    handleScroll (event) {
      let scrlTp = document.documentElement.scrollTop

      const header = document.querySelector('.header')
      const group = document.querySelector('.wrap_attribute .group_attribute')
      const thumbnail = document.querySelector('.wrap_attribute .thumbnail_weapon')

      if (scrlTp >= header.offsetHeight + thumbnail.offsetHeight - 24) {
        this.initial.style.active = true

        this.initial.style.paddingTop = (group.offsetHeight + 26) + 'px'
      } else {
        this.initial.style.active = false

        this.initial.style.paddingTop = 0
      }
    },
    upgradeCalculation (...rest) {
      this.initial.update[rest[0].column] = rest[0].value

      if (rest[0].column === 'power') {
        this.weaponReinforce()
      }
    },
    reinforceCalculation (...rest) {
      this.initial.update[rest[0].column] = this.initial.reinforce.normal[rest[0].value]

      this.initial.current = rest[0].value
    },
    weaponReinforce () {
      this.initial.reinforce.normal = []

      this.initial.reinforce.normal[0] = this.initial.update.power

      for (let i = 0; i < this.step.length; i++) {
        this.initial.reinforce.normal.push(Math.round(this.initial.reinforce.normal[i] * ((this.step[i].rate / 100) + 1)))
      }

      this.initial.reinforce.normal.splice(0, 1)
      this.initial.update.power = this.initial.reinforce.normal[this.initial.current]
    },
    weaponList (value) {
      window.addEventListener('scroll', this.handleScroll)

      const result = { number: this.initial.number, category: this.category, equipment: this.equipment }

      API.view(result).then(response => {
        if (typeof response.data[1] !== 'undefined') {
          this.initial.user = JSON.parse(JSON.stringify(response.data[1]))
        }

        this.initial.update = JSON.parse(JSON.stringify(response.data[0]))

        this.initial.price = response.data[0].price

        Object.assign(this.initial.item, this.initial.update)

        this.weaponReinforce()

        EventBus.$emit('userUpdate', this.initial.user)
      })
    }
  }
}
</script>
