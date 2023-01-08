import router from "@/router";
import store from "..";

export default {
    namespaced: true,
    state:{
        basket:[],
        purchasing:[]
    },
    mutations:{
        SET_BASKET_PRODUCT(state, product){
            state.basket.push(product)
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
                    await commit("SET_BASKET_PRODUCT", product)
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
                const index = await state.basket.indexOf(product);
                if (index > -1) {
                    state.basket.splice(index, 1);
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
                var purchaseHas = false
                const { product, count } = await data
                state.purchasing.forEach(item => {
                    if(item.product_id === product._id){
                        purchaseHas = true
                    }else{
                        purchaseHas = false
                    }
                })
                if(!purchaseHas){
                    state.purchasing.push({
                        product_id:product._id,
                        quantity:count,
                        totalPrice: Math.floor(count * product.price) 
                    })
                }else{
                    state.purchasing.forEach((element, index) => {
                        if(element.product_id === product._id) {
                            state.purchasing[index].quantity = count,
                            state.purchasing[index].totalPrice = Math.floor(count * product.price)
                        }
                    });
                }
            }catch(err){
                store.dispatch("toast/error", {
                    title: "Xato",
                    message: "Qo'shishda xato!",
                });
            }
        }
    }
}