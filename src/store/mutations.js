import Constant from '../Constant.js'

export default {
  [Constant.LIST]: (state, payload) => {
    state.weaponList = payload.list
    /* Object.keys(payload.paging).forEach(key => {
      state.paging[key] = payload.paging[key]
    }) */
  },
  [Constant.VIEW]: (state, payload) => {
    Object.keys(payload.view).forEach(key => {
      state.weaponView[key] = payload.view[key]
    })
  }
}
