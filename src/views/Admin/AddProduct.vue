<template>
	<div class="add-product">
		<TheAdminHeader :headers="header"/>
		<el-form
		:model="products"
		class="demo-ruleForm"
		>
		<div class="product-inputs">
			<div>
				<el-form-item
				label="Title"
				prop="productTitle"
				:rules="[
				{ required: true, message: 'title is required' },
				]"
				>
				<el-input 
				v-model="products.productTitle" 
				placeholder="User username..."
				></el-input>
			</el-form-item>
		</div>
		<el-form-item label="Category">
			<el-select
			v-model="products.productCategory"
			name="category"
			id="category"
			placeholder="Category"
			@change="handleSubCategory($event)"
			>
			<el-option
			v-for="item in categories"
			:key="item._id"
			:label="item.name"
			:value="item._id"
			/>
		</el-select>
	</el-form-item>
	<el-form-item label="SubCategory">
		<el-select
		v-model="products.productSubCategory"
		name="subcategory"
		id="subcategory"
		placeholder="SubCategory"
		@change="handleSubMiniCategory($event)"
		>
		<el-option
		v-for="item in subCategory"
		:key="item._id"
		:label="item.name"
		:value="item._id"
		/>
	</el-select>
</el-form-item>
<div>
	<el-form-item label="Brand">
		<el-select
		v-model="products.productBrand"
		id="brand"
		placeholder="Brands"
		>
		<el-option
		v-for="item in brands"
		:key="item._id"
		:label="item.name"
		:value="item._id"
		/>
	</el-select>
</el-form-item>
<el-form-item label="SubMiniCategory">
	<el-select
	v-model="products.subMiniCategory"
	id="brand"
	placeholder="SubMiniCategory..."
	>
	<el-option
	v-for="item in subMiniCategory"
	:key="item._id"
	:label="item.name"
	:value="item._id"
	/>
</el-select>
</el-form-item>
</div>
</div>
<div class="product-costs">
	<div class="product-price">
		<el-form-item
		label="Price"
		prop="productPrice"
		:rules="[
		{  required: true, message: 'price is required'}
		]"
		>
		<el-input 
		v-model="products.productPrice" 
		placeholder="Product price..."
		></el-input>
	</el-form-item>
</div>
<div class="product-quantity">
	<label for="quantity">Miqdori</label>
	<el-input
	name="quantity"
	id="quantity"
	v-model="products.productQuantity"
	placeholder="Product name..."
	></el-input>
</div>
</div>
<div class="add-product__texarea">
	<label>Comment</label>
	<textarea cols="30" rows="10" v-model="products.productText" name="text" required></textarea>
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
</el-form>
</div>
</template>

<script setup>
import TheAdminHeader from "@/components/Admin/TheAdminHeader.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref, reactive } from "@vue/runtime-core";
import { Plus } from "@element-plus/icons-vue";
const store = useStore();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const subCategory = ref(null);
const subMiniCategory = ref(null)
const header = ref({
	title:"Add Product",
	hasBtn:true,
	hasAddition:true,
	hasSubMini:true,
	addition:"Sub Category",
	addMain:"Add Brand",
	addSubMini:"Add SubMiniCategory",
	addSubMain: "Add Category",
	goAddition:"addSubCategory",
	goRoute:"addBrand",
	goSubMini:"addSubMiniCategory",
	goSubRoute:"addCategory"
})
const products = reactive({
	productTitle: "",
	productCategory:"",
	productSubCategory:"",
	productBrand:"",
	productQuantity:null,
	productText:"",
	productPrice:null,
	subMiniCategory:null,
	img: null
});
const fileList = ref([]);
const selectedFile = (e) => {
	products.img = e
}
onMounted(async () => {
	await store.dispatch("brand/getBrands");
	await store.dispatch("category/getCategories");
	await store.dispatch("category/getSubCategories");
	await store.dispatch("category/getSubMiniCategories");
});


const handleSubCategory = (e) => {
	const subs = store.state.category?.subcategories;
	const subsReal = subs.filter(item => item.parentCategoryId === e)
	products.productSubCategory = ''
	subCategory.value = subsReal
}

const handleSubMiniCategory = (e) => {
	const subMini = store.state.category?.subminicategories;
	const subMiniReal = subMini.filter(item => item.parentSubCategoryId === e)
	products.subMiniCategory = ''
	subMiniCategory.value = subMiniReal
}


const categories = computed(() => {
	return store.state.category?.categories;
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
	formData.append("title", products.productTitle.toUpperCase());
	formData.append("text", products.productText);
	formData.append("quantity", products.productQuantity);
	formData.append("price", products.productPrice);
	formData.append("brand_id", products.productBrand);
	formData.append("file", products.img?.raw);
	formData.append("category", products.productCategory);
	formData.append("subCategory", products.productSubCategory);
	store.dispatch("product/addProduct", formData);
};
</script>

<style>
.add-product .el-form-item{
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
}
.add-product .el-form-item .el-form-item__content{
	width: 100% !important;
}
.add-product .el-form-item .el-input{
	width: 100% !important;
}

.add-product .add-product__title {
	text-align: left;
	margin-bottom: 24px;
}
.add-product .product-inputs {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	gap: 20px;
	margin-bottom: 32px;
}
.add-product .product-inputs div label {
	display: flex;
	margin-bottom: 6px;
}
.add-product .product-costs {
	display: flex;
	align-items: center;
	margin-bottom: 32px;
}
.add-product .product-costs label {
	display: flex;
	margin-bottom: 6px;
}
.add-product .product-price {
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
.add-product .el-dialog__body img {
	width: 400px;
}
.add-product .file-upload {
	display: flex;
	justify-content: flex-start;
	margin-bottom: 32px;
}
.add-product .add-brand__btns {
	display: flex;
	align-items: center;
}
.add-product .add-brand__add-btn {
	width: 250px;
	background-color: #3d7bfe;
	color: #fff;
	border: 2px solid #3d7bfe;
}
.add-product .add-brand__add-btn:hover {
	background-color: inherit;
	color: #3d7bfe;
}
</style>
