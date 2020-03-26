import Constant from '../Constant.js'
import API from '../api/index.js'

export default {
  [Constant.LIST]: (store, payload) => {
    API.list(payload.keyword, payload.option, payload.number).then(response => {
      /* if (response.status === 200) {
        store.commit(Constant.LIST, { list: response.data })
      } */
    })
  },
  [Constant.VIEW]: (store, payload) => {
    return API.view(payload.number).then(response => {
      let result

      if (response.status === 200) {
        result = response.data

        store.commit(Constant.VIEW, { view: response.data })
      }

      return result
    })
  }
}
