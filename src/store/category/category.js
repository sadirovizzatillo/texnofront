import api from "../../../api/api";
import store from "..";

export default {
    namespaced:true,
    state:{
        categories:null,
    },
    mutations:{
        SET_PRODUCT_categories(state, categories){
            state.categories = categories
        },
    },
    actions:{
        async addCategory(_, payload){
            try{
                const { data } = await api.post("/categories", { name: payload });
                if(data.success){
                    store.dispatch("toast/success", { title: 'Muvaffaqqiyatli', message: "Categoriya qo'shildi!" })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getCategories({commit}){
            try{
                const { data: categories } = await api.get("/categories/all");
                if(categories.success){
                    await commit("SET_PRODUCT_categories", categories.categories)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
    }
}