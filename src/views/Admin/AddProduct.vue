<template>
	<div class="add-product">
		<h2 class="add-product__title">Add Product</h2>
		<form action="http://localhost:5000/api/products"
		method="post"
		:headers="`x-auth-token: ${token}`"
		enctype="multipart/form-data">
		<div class="product-inputs">
			<div>
				<label for="product">Product name</label>
				<el-input
				v-model="productTitle"
				name="title"
				placeholder="Product name..."
				></el-input>
			</div>
			<div>
				<label for="category">Category</label>
				<el-select
				v-model="productCategory"
				name="category"
				id="category"
				placeholder="Category"
				>
				<el-option
				v-for="item in categories"
				:key="item.value"
				:label="item.label"
				:value="item.value"
				:disabled="item.disabled"
				/>
			</el-select>
		</div>
		<div>
			<label for="brand">Brands</label>
			<el-select
			v-model="productBrand"
			name="brand_id"
			id="brand"
			placeholder="Brands"
			>
			<el-option
			v-for="item in brands"
			:name="brand_id"
			:key="item._id"
			:label="item.name"
			:value="item._id"
			/>
		</el-select>
	</div>
</div>
<div class="product-costs">
	<div class="product-price">
		<label>Narxi</label>
		<el-input
		v-model="productPrice"
		name="price"
		placeholder="Product name..."
		></el-input>
	</div>
	<div class="product-quantity">
		<label for="quantity">Miqdori</label>
		<el-input
		name="quantity"
		id="quantity"
		v-model="productQuantity"
		placeholder="Product name..."
		></el-input>
	</div>
</div>
<div class="add-product__texarea">
	<label>Comment</label>
	<textarea cols="30" rows="10" v-model="productText" name="text"></textarea>
</div>

<div class="file-upload">
	<el-upload
	v-model:file-list="fileList"
	list-type="picture-card"
	:auto-upload="false"
	:on-preview="handlePictureCardPreview"
	:on-remove="handleRemove"
	name="productImage"
	id="productImage"
	@change="selectedFile($event)"
	>
	<el-icon><Plus /></el-icon>
</el-upload>

<el-dialog v-model="dialogVisible">
	<img w-full :src="dialogImageUrl" alt="Preview Image" />
</el-dialog>
</div>

<div class="add-brand__btns">	
	<el-button class="add-brand__add-btn" @click="addProduct"
	>Qo'shish</el-button
	>
	<el-button @click="(() => $router.go(-1))">Bekor Qilish</el-button>
</div>
</form>
</div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { Plus } from "@element-plus/icons-vue";
const store = useStore();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const productTitle = ref("");
const productCategory = ref("");
const token = ref(localStorage.getItem("accessToken"))
const productBrand = ref("");
const productQuantity = ref(null);
const productText = ref("");
const productPrice = ref();
const img = ref(null)
const categories = ref([
{
	name: "Kiyim",
	value: "dress",
},
{
	name: "texnika",
	value: "dress",
},
]);
const fileList = ref([]);


const selectedFile = (e) => {
	img.value = e
	console.log(e)
}
onMounted(async () => {
	await store.dispatch("brand/getBrands");
});



const brands = computed(() => {
	return store.state.brand?.brands;
});

const handleRemove = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = uploadFile => {
	dialogImageUrl.value = uploadFile.url;
	dialogVisible.value = true;
};

const addProduct = async () => {
	let formData = new FormData();
	formData.append("title",  productTitle.value.toUpperCase());
	formData.append("text", productText.value);
	formData.append("quantity", productQuantity.value);
	formData.append("price", productPrice.value);
	formData.append("brand_id", productBrand.value);
	formData.append("file", img.value?.raw);
	store.dispatch("product/addProduct", formData);
};
</script>

<style scoped>
.add-product__title {
	text-align: left;
	margin-bottom: 24px;
}
.product-inputs {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	gap: 20px;
	margin-bottom: 32px;
}
.product-inputs div label {
	display: flex;
	margin-bottom: 6px;
}
.product-costs {
	display: flex;
	align-items: center;
	margin-bottom: 32px;
}
.product-costs label {
	display: flex;
	margin-bottom: 6px;
}
.product-price {
	margin-right: 32px;
}
.add-product__texarea {
	display: flex;
	flex-direction: column;
	max-width: 600px;
	margin-bottom: 42px;
}
.add-product__texarea label {
	display: flex;
	margin-bottom: 6px;
}

.add-product__texarea textarea {
	padding: 5px;
	outline: none;
	border: 1px solid rgba(158, 158, 158, 0.4);
	border-radius: 5px;
}
.el-dialog__body img {
	width: 400px;
}
.file-upload {
	display: flex;
	justify-content: flex-start;
	margin-bottom: 32px;
}
.add-brand__btns {
	display: flex;
	align-items: center;
}
.add-brand__add-btn {
	width: 250px;
	background-color: #3d7bfe;
	color: #fff;
	border: 2px solid #3d7bfe;
}
.add-brand__add-btn:hover {
	background-color: inherit;
	color: #3d7bfe;
}
</style>
