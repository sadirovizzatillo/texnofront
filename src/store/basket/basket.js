import router from "@/router";
import api from "../../../api/api";
import store from "..";

export default {
    namespaced: true,
    state:{
        purchasing:[]
    },
    getters:{
        allSum(state) {
            const result = state.purchasing.reduce((total, value) => total += value.totalPrice, 0)
            return result
        }
    },
    mutations:{
        SET_PURCHASE_PRODUCT(state, product){
            state.purchasing.push({
                product_id:product._id,
                quantity:1,
                realQuantity: product.quantity,
                realPrice:product.price,
                totalPrice: Math.floor(1 * product.price),
                title:product.title
            })
        }
    },
    actions:{
        async addBasket({ commit, state }, product){
            try{
                var purchaseHas = false
                await state.purchasing.forEach((item, index) => {
                    purchaseHas = true
                    if(item.product_id === product._id){
                        state.purchasing[index].quantity += 1,
                        state.purchasing[index].totalPrice += product.price
                        purchaseHas = true
                    }else{
                        purchaseHas = false
                    }
                })
                if(purchaseHas === false){
                    await commit("SET_PURCHASE_PRODUCT", product)
                }
                router.push({ name: "BasketProducts" })
            }catch(err){
                store.dispatch("toast/error", {
                    title: "Xato",
                    message: "Savatga qo'shsihda xato!",
                });
            }
        },
        async removeBasketProduct({ state }, product){
            try{
                const index = await state.purchasing.indexOf(product);
                if (index > -1) {
                    state.purchasing.splice(index, 1);
                }
            }catch(err){
                store.dispatch("toast/error", {
                    title: "Xato",
                    message: "Savatdan olishda xato!",
                });
            }
        },
        async countTotal({ state }, data){
            try{
                const { product, count } = await data
                await state.purchasing.forEach((element, index) => {
                    if(element.product_id === product.product_id) {
                        state.purchasing[index].quantity = count,
                        state.purchasing[index].title = product.title,
                        state.purchasing[index].realQuantity = product.realQuantity,
                        state.purchasing[index].realPrice = product.realPrice,
                        state.purchasing[index].quantity = count,
                        state.purchasing[index].totalPrice = Math.floor(count * product.realPrice);
                    }
                });
            }catch(err){
                store.dispatch("toast/error", {
                    title: "Xato",
                    message: "Qo'shishda xato!",
                });
            }
        },
        async buyProducts({ state }){
            try{
                var purchased = []
                await state?.purchasing.forEach((item) => {
                    purchased.push({
                        product_id:item.product_id,
                        quantity:item.quantity
                    })
                })
                const userId = await JSON.parse(localStorage.getItem("users"))  
                const { data } = await api.post("/purchase", {
                    user_id: userId._id,
                    purchased:purchased
                });
                if(data.success){
                    store.dispatch("toast/success", {
                        title: "Muvaffaqiyatli",
                        message: "Siz mahsulot sotib oldingiz!",
                    });
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}