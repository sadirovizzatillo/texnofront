import store from "..";
import api from "../../../api/api"

export default {
    namespaced:true,
    state:{
        comment:[]
    },
    mutations:{
        SET_ALL_COMMENTS(state, comment){
            state.comment = comment
        },
    },
    actions:{
        async getAllReviews({ commit }){
            try{
                const { data } = await api.get("/reviews/all");
                if(data.success){
                    await commit("SET_ALL_COMMENTS", data.reviews)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async postReview({ commit, dispatch }, form){
            try{
                const { data } = await api.post("/reviews", form);
                if(data.success){
                    await dispatch("getAllReviews")
                    await commit('product/SET_ONE_COMMENT', form, { root: true })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}