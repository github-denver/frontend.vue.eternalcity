<template>
  <div>
    <Hgrp
      v-bind:history="initial.number"
      v-bind:title="initial.title"
      v-bind:category="category"
      v-bind:equipment="equipment"
      v-bind:grade="initial.grade"
    />

    <Tab
      v-bind:grade="initial.grade"
      v-bind:category="category"
      v-bind:equipment="equipment"
    />

    <table class="table_global type_weapon">
      <colgroup>
        <col />
        <col style="width:18%" />
        <col style="width:14%" />
        <col style="width:14%" />
        <col style="width:20%" />
        <col style="width:12%" />
      </colgroup>

      <caption>
        {{
          initial.title
        }}
        정보를 확인할 수 있습니다.
      </caption>

      <thead>
        <tr>
          <th>
            <span class="outer_cell"><span class="inner_cell">이름</span></span>
          </th>
          <th>
            <span class="outer_cell"><span class="inner_cell">분류</span></span>
          </th>
          <th>
            <span class="outer_cell"><span class="inner_cell">등급</span></span>
          </th>
          <th>
            <span class="outer_cell"
              ><span class="inner_cell">공격력</span></span
            >
          </th>
          <th>
            <span class="outer_cell"><span class="inner_cell">속도</span></span>
          </th>
          <th>
            <span class="outer_cell"><span class="inner_cell">크기</span></span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in initial.list" v-bind:key="index">
          <td>
            <span class="outer_cell">
              <span class="inner_cell">
                <router-link
                  v-bind:to="{
                    name: initial.component + 'View',
                    params: { number: item.number },
                    // query: { grade: initial.grade, list: initial.number }
                    // query: { grade: initial.grade }
                    query: { grade: initial.grade, history: initial.number }
                  }"
                  class="link_local"
                >
                  <img
                    v-bind:src="`${initial.thumbnail}/${item.thumbnail}`"
                    v-bind:alt="item.name"
                    class="image_local"
                  />
                  <strong class="title_local">{{ item.name }}</strong>
                </router-link>
              </span>
            </span>
          </td>
          <td>
            <span class="outer_cell"
              ><span class="inner_cell">{{ item.type }}</span></span
            >
          </td>
          <td>
            <span class="outer_cell"
              ><span class="inner_cell">{{ item.grade }}등급</span></span
            >
          </td>
          <td>
            <span class="outer_cell"
              ><span class="inner_cell">{{ item.power }}</span></span
            >
          </td>
          <td>
            <span class="outer_cell">
              <span class="inner_cell" v-if="equipment === 'ranged'"
                >{{ item.speed }}발/1분</span
              >
              <span class="inner_cell" v-else>{{ item.speed }}회/1분</span>
            </span>
          </td>
          <td>
            <span class="outer_cell"
              ><span class="inner_cell">{{ item.size }}</span></span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <Paging
      v-bind:current="pagination.current"
      v-bind:total="pagination.total"
      v-bind:start="pagination.start"
      v-bind:end="pagination.end"
      v-bind:category="category"
      v-bind:equipment="equipment"
      v-bind:grade="initial.grade"
    />
  </div>
</template>

<script>
import { EventBus } from '../../assets/js/event-bus'
import API from '../../api/index.js'
import Tab from '../include/Tab'
import Hgrp from '../include/Hgroup'
import Paging from '../include/Paging'

export default {
  name: 'weapon-list',
  props: ['title', 'category', 'equipment', 'gender', 'document'],
  components: { Hgrp, Tab, Paging },
  data () {
    return {
      initial: {
        user: {},
        number: 0,
        component: '',
        url: 'http://localhost:3000',
        title: '',
        grade: 0,
        gender: '',
        thumbnail: '',
        list: []
      },
      pagination: {
        current: 0,
        start: 0,
        end: 0,
        total: 0
      },
      search: {
        select: '',
        keyword: ''
      }
    }
  },
  watch: {
    user (value) {
      this.initial.user = value

      EventBus.$emit('userUpdate', this.initial.user)
    },
    $route (to, from) {
      if (
        to.query.grade !== from.query.grade ||
        to.params.number !== from.params.number
      ) {
        this.initial.grade = to.query.grade

        this.initial.number = to.params.number

        this.weaponList()
      }
    }
  },
  created () {
    EventBus.$on('pagingUpdate', (number, grade) => {
      // this.initial.number = number

      // this.initial.grade = grade

      // this.weaponList()
    })

    EventBus.$on('filterUpdate', (grade) => {
      // this.initial.number = 1

      // this.initial.grade = grade

      // this.weaponList()
    })

    this.initial.number = this.$route.params.number

    if (this.category === 'weapon') {
      this.initial.component =
        this.equipment === 'ranged' ? 'WeaponRanged' : 'WeaponMelee'
    } else {
      this.initial.component =
        this.equipment === 'human' ? 'ArmourHuman' : 'ArmourParasite'
    }

    this.initial.title = this.title

    this.initial.grade = this.$route.query.grade

    if (typeof this.gender === 'undefined') {
      this.initial.thumbnail = `${this.initial.url}/eternalcity/images/${this.category}/${this.equipment}`
    } else {
      this.initial.thumbnail = `${this.initial.url}/eternalcity/images/${this.category}/${this.gender}/${this.equipment}`

      this.initial.gender = this.gender
    }

    this.weaponList()
  },
  methods: {
    weaponList () {
      const result = {
        number: this.initial.number,
        grade: this.initial.grade,
        category: this.category,
        equipment: this.equipment
      }

      API.list(result)
        .then((response) => {
          this.initial.list = JSON.parse(JSON.stringify(response.data.result))

          if (typeof response.data.user !== 'undefined') { this.initial.user = response.data.user }

          this.pagination.current = response.data.pagination.current
          this.pagination.total = response.data.pagination.total
          this.pagination.start = response.data.pagination.start
          this.pagination.end = response.data.pagination.end
          this.search.select = response.data.search.select
          this.search.keyword = response.data.search.keyword
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
