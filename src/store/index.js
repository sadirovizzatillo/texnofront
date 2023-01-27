import { createStore } from 'vuex'
import auth from './auth/auth'
import product from './product/product'
import review from './review/review'
import brand from './brand/brand'
import toast from './toast'
import basket from './basket/basket'
import category from './category/category'
import purchase from './purchase/purchase'
export default createStore({
  state: {
    appImgUrl:process.env.IMGURL
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    toast,
    auth,
    brand,
    review,
    product,
    basket,
    category,
    purchase
  }
})
