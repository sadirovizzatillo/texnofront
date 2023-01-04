import api from "../../../api/api"
import store from "..";
import router from "@/router";
export default {
    namespaced:true,
    state:{
        user:null,
        users:[],
        total:null
    },
    getters:{
        
    },
    mutations:{
        SET_USER(state, user){
            state.user = user
        },
        SET_ALL_USERS(state, users){
            state.users = users.user
            state.total = users.allPage
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
        async addUser({commit}, form){
            try{
                const { data } = await api.post("/auth/register", form);
                if(data.success){
                    await commit("SET_ALL_USERS", data)
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
                    await commit("SET_ALL_USERS", data)
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
        },
        async usersPaginate({ commit }, val){
            try{
                const { data } = await api.get(`/auth/users?page${val}`) ;
                if(data.success){
                    await commit("SET_ALL_USERS", data)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async deleteUser(_, userId){
            try{
                const { data } = await api.delete(`/auth/deleteUser/${userId}`);
                if(data.success){
                    store.dispatch("toast/success", { title: "Muvaffaqqiyatli", message:"Malumot o'chirildi!" })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async editUser(_, form){
            try{
                console.log(form)
                const { data } = await api.put(`/auth/updateUser/${form.id}`, form)
                if(data.success){
                    store.dispatch("toast/success", { title: "Muvaffaqqiyatli", message:"Malumot o'zgartirildi!" })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}
