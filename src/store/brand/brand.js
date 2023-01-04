import api from "../../../api/api";
import store from "..";

export default {
    namespaced:true,
    state:{
        brands:null,
    },
    mutations:{
        SET_PRODUCT_BRANDS(state, brands){
            state.brands = brands
        },
    },
    actions:{
        async addBrand(_, payload){
            try{
                const { data } = await api.post("/brands", { name: payload });
                if(data.success){
                    store.dispatch("toast/success", { title: 'Muvaffaqqiyatli', message: "Brand qo'shildi!" })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getBrands({commit}){
            try{
                const { data: brands } = await api.get("/brands/all");
                if(brands.success){
                    await commit("SET_PRODUCT_BRANDS", brands.brands)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
    }
}