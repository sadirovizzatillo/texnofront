import api from "../../../api/api"
import store from "..";

export default {
    namespaced:true,
    state:{
        products:[],
        product:null,
        productReviews:[],
        brand:null,
        searchProduct:[],
        brands:null
    },
    mutations:{
        SET_PRODUCTS(state, products){
            state.products = products
        },
        SET_SINGLE_PRODUCT(state, product){
            state.product = product.products[0]
            state.productReviews = product.reviews
            state.brand = product.brand[0]
        },
        SET_ONE_COMMENT(state, comment){
            state.productReviews.push(comment)
        },
        SET_SEARCHED_PRODUCT(state, searchProduct){
            state.searchProduct = searchProduct
        },
        SET_PRODUCT_BRANDS(state, brands){
            state.brands = brands
        },
        SET_FILTERED_PRODUCTS(state, products){
            state.products = products
        }
    },
    actions:{
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
        async getAllProduct({ commit }){
            try{
                const { data } = await api.get("/products/all");
                console.log(data)
                if(data.success){
                    await commit("SET_PRODUCTS", data.products)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response })
            }
        },
        async getSingleProduct({ commit }, id){
            try{
                const { data } = await api.get(`/products/${id}`) 
                if(data.success){
                    await commit("SET_SINGLE_PRODUCT", data)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async searchProduct({ commit }, search){
            try{
                const { data } = await api.get(`/products/search?name=${search}`);
                if(data.success){
                    await commit("SET_SEARCHED_PRODUCT", data.products)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async filterProduct({ state }, payload){
            try{
                const ok = await state.products.filter(data => data.title.toLowerCase().includes(payload.toLowerCase()));
                 state.products = ok
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}