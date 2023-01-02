<template>
    <div class="add-product">
        <h2 class="add-product__title">Add Product</h2>
        <div>
            <div class="product-inputs">
                <div>
                    <label for="product">Product name</label>
                    <el-input v-model="productName" placeholder="Product name..."></el-input>
                </div>
                <div>
                    <label for="category">Category</label>
                    <el-select v-model="productCategory" name="category" id="category" placeholder="Category">
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
                    <el-select v-model="productBrand" name="brand" id="brand" placeholder="Brands">
                        <el-option
                        v-for="item in brands"
                        :key="item._id"
                        :label="item.name"
                        :value="item.name"
                        />
                    </el-select>          
                </div>
            </div>
            <div class="product-costs">
                <div class="product-price">
                    <label>Narxi</label>
                    <el-input v-model="productPrice" placeholder="Product name..."></el-input>
                </div>
                <div class="product-quantity">
                    <label for="product">Miqdori</label>
                    <el-input v-model="productQuantity" placeholder="Product name..."></el-input>
                </div>
            </div>
            <div class="add-product__texarea">
                <label>Comment</label>
                <textarea cols="30" rows="10"></textarea>
            </div>
            
            <div class="file-upload">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <el-icon><Plus /></el-icon>
                    
                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <el-icon><zoom-in /></el-icon>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <el-icon><Download /></el-icon>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <el-icon><Delete /></el-icon>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>
    
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</div>
</div>

<div class="add-brand__btns">
    <el-button class="add-brand__add-btn">Qo'shish</el-button>
    <el-button>Bekor Qilish</el-button>
</div>
</div>
</template>

<script setup>
import {useStore} from "vuex";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
const store = useStore();


const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const productName = ref("")
const productCategory = ref("")
const productBrand = ref("")
onMounted(async () => {
    await store.dispatch("product/getBrands")
})

const brands = computed(() => {
    return store.state.product?.brands
})

const handleRemove = (file) => {
    console.log(file)
}

const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

const handleDownload = (file) => {
    console.log(file)
}
</script>

<style scoped>
.add-product__title{
    text-align: left;
    margin-bottom: 24px;
}
.product-inputs{
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
}
.product-inputs div label{
    display: flex;
    margin-bottom: 6px;
}
.product-costs{
    display: flex;
    align-items: center;
    margin-bottom: 32px;
}
.product-costs label{
    display: flex;
    margin-bottom: 6px;
}
.product-price{
    margin-right: 32px;
}
.add-product__texarea{
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-bottom: 42px;
}
.add-product__texarea label{
    display: flex;
    margin-bottom: 6px;
}

.add-product__texarea textarea{
    padding: 5px;
    outline: none;
    border: 1px solid rgba(158, 158, 158, 0.4);
    border-radius: 5px;
}
.el-dialog__body img{
    width: 400px;
}
.file-upload{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 32px;
}
.add-brand__btns{
    display: flex;
    align-items: center;
}
.add-brand__add-btn{
    width: 250px;
    background-color: #3D7BFE;
    color: #fff;
    border: 2px solid #3D7BFE;
}
.add-brand__add-btn:hover{
    background-color: inherit;
    color: #3D7BFE;
}

</style>