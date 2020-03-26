import CONF from '../Config.js'
import axios from 'axios'

export default {
  login () {
    return axios.get(CONF.ETERNALCITY)
  },
  list (value) {
    return axios.get(CONF.ETERNALCITY_WEAPON_LIST, {
      params: value
    })
  },
  view (value) {
    return axios.get(CONF.ETERNALCITY_WEAPON_VIEW + '/' + value.number, {
      params: value
    })
  },
  armourList (value) {
    return axios.get(CONF.ETERNALCITY_ARMOUR_LIST, {
      params: value
    })
  },
  armourView (value) {
    return axios.get(CONF.ETERNALCITY_ARMOUR_VIEW + '/' + value.number, {
      params: value
    })
  }
}
