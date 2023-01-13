import api from "../../../api/api";
import store from "..";

export default {
    namespaced:true,
    state:{
        categories:null,
        subcategories:null,
        relatedSubcategories:null,
        relatedCategoryProducts:null
    },
    mutations:{
        SET_PRODUCT_CATEGORIES(state, categories){
            state.categories = categories
        },
        SET_PRODUCT_SUBCATEGORIES(state, subcategories){
            state.subcategories = subcategories
        },
        SET_CATEGORY_SUBCATEGORIES(state, subcategories){
            state.relatedSubcategories = subcategories
        },
        SET_CATEGORY_PRODUCTS(state, products){
            state.relatedCategoryProducts = products
        }
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
                    await commit("SET_PRODUCT_CATEGORIES", categories.categories)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async addSubCategory(_, form){
            try{
                const { data } = await api.post("/subcategories", form);
                if(data.success){
                    store.dispatch("toast/success", { title: 'Muvaffaqqiyatli', message: "SubCategoriya qo'shildi!" })
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getSubCategories({commit}){
            try{
                const { data: subcategories } = await api.get("/subcategories/all");
                if(subcategories.success){
                    await commit("SET_PRODUCT_SUBCATEGORIES", subcategories.subcategories)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async getSingleCategory({commit}, route){
            try{
                const { data: subcategories } = await api.get(`/categories/subcategories/${route}`);
                if(subcategories.success){
                    await commit("SET_CATEGORY_SUBCATEGORIES", subcategories.subcategories)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async getAllProduct({commit}, route){
            try{
                const { data: categories } = await api.get(`/categories/products/${route}`);
                if(categories.success){
                    await commit("SET_CATEGORY_PRODUCTS", categories.products)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
    }
}