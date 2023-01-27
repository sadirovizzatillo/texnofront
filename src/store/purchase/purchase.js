import store from "..";
import api from "../../../api/api"

export default {
    namespaced: true,
    state:{
        purchases:null,
    },
    getters:{
        purchase(state){
            return state.purchases
        }
    },
    mutations:{
        SET_ALL_PURCHASES(state, purchase){
            state.purchases = purchase
        }
    },
    actions:{
        async getAllPurchases({ commit }){
            try{
                const { data: purchases } = await api.get("/purchase/all");
                if(purchases.success){
                    const configPurchase = await purchases?.purchased.map(purchase => {
                        return{
                            categories: purchase?.createdAt,
                            quantity: purchase?.purchased.length
                        }
                    })
                    console.log(configPurchase)
                    await commit("SET_ALL_PURCHASES", configPurchase)
                }
            }catch(err){
                store.dispatch("toast/error", {
                    title: err.name,
                    message: err.response.data,
                });           
            }
        }
    }
}