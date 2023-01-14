import api from "../../../api/api";
import store from "..";
import router from "@/router";

export default {
	namespaced: true,
	state: {
		products: [],
		product: null,
		productReviews: [],
		brand: null,
		searchProduct: [],
		brands: null,
		total: null,
		adminProducts: [],
		isProductLoading:false
	},
	mutations: {
		SET_PRODUCTS(state, products) {
			state.products = products;
		},
		SET_SINGLE_PRODUCT(state, product) {
			state.product = product.products[0];
			state.productReviews = product.reviews;
			state.brand = product.brand[0];
		},
		SET_ONE_COMMENT(state, comment) {
			state.productReviews.push(comment);
		},
		SET_SEARCHED_PRODUCT(state, searchProduct) {
			state.searchProduct = searchProduct;
		},
		SET_FILTERED_PRODUCTS(state, products) {
			state.products = products;
		},
		SET_ALL_ADMIN_USERS(state, products) {
			state.adminProducts = products.products;
			state.total = products.allPage;
		},
	},
	actions: {
		async getAllProduct({ state, commit }) {
			try {
				state.isProductLoading = true
				const { data } = await api.get("/products/all");
				if (data.success) {
					await commit("SET_PRODUCTS", data.products);
					state.isProductLoading = false
				}
			} catch (err) {
				store.dispatch("toast/error", {
					title: err.name,
					message: err.response,
				});
			}
		},
		async getSingleProduct({ commit }, id) {
			try {
				const { data } = await api.get(`/products/${id}`);
				if (data.success) {
					await commit("SET_SINGLE_PRODUCT", data);
				}
			} catch (err) {
				store.dispatch("toast/error", {
					title: err.name,
					message: err.response.data,
				});
			}
		},
		async searchProduct({ commit }, search) {
			try {
				const { data } = await api.get(`/products/search?name=${search.toUpperCase()}`);
				if (data.success) {
					await commit("SET_SEARCHED_PRODUCT", data.products);
				}
			} catch (err) {
				store.dispatch("toast/error", {
					title: err.name,
					message: err.response.data,
				});
			}
		},
		async filterProduct({ state }, payload) {
			try {
				const ok = await state.adminProducts.filter(data =>
					data.title.toUpperCase().includes(payload.toUpperCase())
					);
					state.adminProducts = ok;
				} catch (err) {
					store.dispatch("toast/error", {
						title: err.name,
						message: err.response.data,
					});
				}
			},
			async getAllAdminProduct({ commit }) {
				try {
					const { data } = await api.get("/products/all/admin");
					if (data.success) {
						await commit("SET_ALL_ADMIN_USERS", data);
					}
				} catch (err) {
					store.dispatch("toast/error", {
						title: err.name,
						message: err.response.data,
					});
				}
			},
			async productsPaginate({ commit }, val) {
				try {
					const { data } = await api.get(`/products/all/admin?page=${val}`);
					if (data.success) {
						await commit("SET_ALL_ADMIN_USERS", data);
					}
				} catch (err) {
					store.dispatch("toast/error", {
						title: err.name,
						message: err.response.data,
					});
				}
			},
			async deleteProduct(_, id) {
				try {
					const { data } = await api.delete(`/products/${id}`);
					if (data.success) {
						store.dispatch("toast/success", {
							title: "Muvaffaqqiyatli",
							message: "Product o'chirildi!",
						});
					}
				} catch (err) {
					store.dispatch("toast/error", {
						title: err.name,
						message: err.response.data,
					});
				}
			},
			async editProduct(_, form) {
				try {
					const { data } = await api.put(`/products/${form.id}`, form);
					if (data.success) {
						store.dispatch("toast/success", {
							title: "Muvaffaqqiyatli",
							message: "Product o'zgartirildi!",
						});
					}
				} catch (err) {
					store.dispatch("toast/error", {
						title: err.name,
						message: err.message,
					});
				}
			},
			async addProduct(_, form) {
				try {
					const { data } = await api.post("/products", form, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});
					if (data.success) {
						store.dispatch("toast/success", {
							title: "Muvaffaqqiyatli",
							message: "Product qo'shildi!",
						});
						router.push({ name: "Admin"})
					}
				} catch (err) {
					store.dispatch("toast/error", {
						title: err.name,
						message: err.message,
					});
				}
			},
		},
	};
	