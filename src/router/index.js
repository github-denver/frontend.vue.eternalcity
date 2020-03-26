import Vue from 'vue'
import Router from 'vue-router'
import Weapon from '@/components/weapon/Weapon'
import WeaponList from '@/components/weapon/WeaponList'
import WeaponView from '@/components/weapon/WeaponView'

/* import Armour from '@/components/armour/Armour'
import ArmourList from '@/components/armour/ArmourList'
import ArmourView from '@/components/armour/ArmourView' */

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/eterworld/weapon',
      name: 'Weapon',
      component: Weapon,
      props: true,
      children: [
        {
          path: 'ranged/list/:number',
          name: 'WeaponRangedList',
          component: WeaponList,
          props: {
            title: '원거리 무기',
            category: 'weapon',
            equipment: 'ranged',
            document: 'list'
          }
        },
        {
          path: 'ranged/view/:number',
          name: 'WeaponRangedView',
          component: WeaponView,
          props: {
            title: '원거리 무기',
            category: 'weapon',
            equipment: 'ranged',
            document: 'view'
          }
        },
        {
          path: 'melee/list/:number',
          name: 'WeaponMeleeList',
          component: WeaponList,
          props: {
            title: '근거리 무기',
            category: 'weapon',
            equipment: 'melee',
            document: 'list'
          }
        },
        {
          path: 'melee/view/:number',
          name: 'WeaponMeleeView',
          component: WeaponView,
          props: {
            title: '근거리 무기',
            category: 'weapon',
            equipment: 'melee',
            document: 'view'
          }
        }
      ]
    },
    {
      path: '/eterworld/armour',
      name: 'Armour',
      component: Weapon,
      props: true,
      children: [
        {
          path: 'human/list/:number',
          name: 'ArmourHumanList',
          component: WeaponList,
          props: {
            title: '남성용 방어구',
            category: 'armour',
            equipment: 'human',
            gender: 'male'
          }
        },
        {
          path: 'human/view/:number',
          name: 'ArmourHumanView',
          component: WeaponView,
          props: {
            title: '남성용 방어구',
            category: 'armour',
            equipment: 'human',
            gender: 'male'
          }
        },
        {
          path: 'parasite/list/:number',
          name: 'ArmourParasiteList',
          component: WeaponList,
          props: {
            title: '남성 감영체용 전이억제의상',
            category: 'armour',
            equipment: 'parasite',
            gender: 'male'
          }
        },
        {
          path: 'parasite/view/:number',
          name: 'ArmourParasiteView',
          component: WeaponView,
          props: {
            title: '남성 감영체용 전이억제의상',
            category: 'armour',
            equipment: 'parasite',
            gender: 'male'
          }
        }
      ]
    }
  ]
})

export default router
