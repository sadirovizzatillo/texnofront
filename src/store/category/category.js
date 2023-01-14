import api from "../../../api/api";
import store from "..";

export default {
    namespaced:true,
    state:{
        categories:null,
        subcategories:null,
        relatedSubcategories:null,
        relatedCategoryProducts:null,
        currentCategory:null,
        realCurrentCategory:null,
        isCategoryLoading:false,
        categoryProducts:[],
        categoryWithSubs:null
    },
    mutations:{
        SET_PRODUCT_CATEGORIES(state, categories){
            state.categories = categories
        },
        SET_PRODUCT_SUBCATEGORIES(state, subcategories){
            state.subcategories = subcategories
        },
        SET_CATEGORY_SUBCATEGORIES(state, subcategories){
            state.relatedSubcategories = subcategories.subcategories
            state.currentCategory = subcategories.category[0]
            state.realCurrentCategory = subcategories.category[0]
        },
        SET_CATEGORY_PRODUCTS(state, products){
            state.relatedCategoryProducts = products.products
            if(products.category){
                state.currentCategory = products.category[0]
            }
        },
        SET_CATEGORY_WITH_SUBCATEGORIES(state, categories){
            state.categoryWithSubs = categories
        }
        // SET_SUBCATEGORY_PRODUCT(state, products){
        //     state.relatedCategoryProducts = products.products
        //     state.currentCategory = products.subcategory[0]
        // }
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
                    await commit("SET_CATEGORY_SUBCATEGORIES", subcategories)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async getAllProduct({commit, rootState}, route){
            rootState.product.isProductLoading = true
            try{
                const { data: categories } = await api.get(`/categories/products/${route}`);
                if(categories.success){
                    await commit("SET_CATEGORY_PRODUCTS", categories)
                    rootState.product.isProductLoading = false
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async getSubCategoryProduct({commit, rootState}, id){
            rootState.product.isProductLoading = true
            try{
                const { data } = await api.get(`/categories/subcategory/product/${id}`,);
                if(data.success){
                    await commit("SET_CATEGORY_PRODUCTS", data)
                    rootState.product.isProductLoading = false
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async getCategoryWithSubcategory({commit}){
            try{
                const { data } = await api.get(`/categories/subcategories`);
                if(data.success){
                    await commit("SET_CATEGORY_WITH_SUBCATEGORIES", data.categories)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        }
    }
}