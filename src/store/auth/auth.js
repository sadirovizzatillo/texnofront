import api from "../../../api/api"
import store from "..";
import router from "@/router";
export default {
    namespaced:true,
    state:{
        user:null,
        users:[]
    },
    getters:{
        
    },
    mutations:{
        SET_USER(state, user){
            state.user = user
        },
        SET_ALL_USERS(state, users){
            state.users = users
        }
    },
    actions:{
        async registerUser({commit}, form){
            try{
                const { data } = await api.post("/auth/register", form);
                if(data.success){
                    localStorage.setItem("users", JSON.stringify(data))
                    commit("SET_USER", data)
                    router.push({ name: "Login" })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async login({ commit }, form){
            try{
                const { data } = await api.post("/auth/login", form);
                if(data.success){
                    commit("SET_USER", data)
                    localStorage.setItem("users", JSON.stringify(data.user))
                    localStorage.setItem("accessToken", data.token)
                    if(data.user.isAdmin === true){
                        router.push("/admin")
                    } 
                    if(data.user.isAdmin === false){
                        router.push("/")
                    }
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getAllUsers({commit}){
            try{
                const { data } = await api.get("/auth/users");
                if(data.success){
                    await commit("SET_ALL_USERS", data.user)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async logout(){
            try{
                await localStorage.clear()
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}
