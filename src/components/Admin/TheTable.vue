<template>
    <el-table :data="allProducts" style="width: 100%">
        <el-table-column label="Title">
            <template #default="scope">
                <div>{{ scope.row.title }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Username">
            <template #default="scope">
                <div>{{ scope.row.title }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Price">
            <template #default="scope">
                <div>{{ scope.row.price }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Image">
            <template #default="scope">
                <img :src="'http://localhost:8000/' + scope.row.productImage" :alt="scope.row.title" width="40" height="40">
            </template>
        </el-table-column>
        <el-table-column label="Operations" >
            <template #default="scope">
                <el-button size="small" @click="userModal({name:'edit', val:scope.row})"
                >Edit</el-button
                >
                <el-button
                size="small"
                type="danger"
                @click="userModal({name:'delete', val:scope.row})"
                >Delete</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    
    <el-dialog
    v-model="editModal"
    title="Edit User"
    width="40%"
    >
    <span v-if="isEdit">
        <el-form>
            <el-form-item label="Edit Title">
                <el-input type="text" placeholder="Name" v-model="editTitle"></el-input>
            </el-form-item>
            <el-form-item label="Edit Quantity">
                <el-input type="number" placeholder="Quantity" v-model="editQuantity"></el-input>
            </el-form-item>
            <el-form-item label="Edit Price">
                <el-input type="number" placeholder="Price" v-model="editPrice"></el-input>
            </el-form-item>
            <el-form-item label="Edit Text">
                <el-input type="text" placeholder="Email" v-model="editText"></el-input>
            </el-form-item>
            <el-form-item label="Edit Brand">
                <el-select v-model="editBrand" name="brand" id="brand" placeholder="Brands">
                    <el-option
                    v-for="item in brands"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                    />
                </el-select>          
            </el-form-item>
        </el-form>
    </span>
    <span v-if="isDelete">Do you really want to delete this user?</span>
    <template #footer>
        <span class="dialog-footer" v-if="isEdit">
            <el-button @click="userModal">Cancel</el-button>
            <el-button type="primary" @click="editUser">
                Edit
            </el-button>
        </span>
        
        <span class="dialog-footer" v-if="isDelete">
            <el-button @click="userModal">Cancel</el-button>
            <el-button type="primary" @click="deleteProduct">
                Delete
            </el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex"
const isEdit = ref(false)
const editModal = ref(false)
const editTitle = ref(null)
const editQuantity = ref("")
const editPrice = ref('')
const isDelete = ref(false)
const editText = ref('')
const editBrand = ref(null)
const productId = ref(null)
const store = useStore();

const userModal = (data) => {
    editModal.value = !editModal.value
    if(data.name === 'edit'){
        isDelete.value = false
        isEdit.value = true
        editTitle.value = data.val?.title
        editBrand.value = data.val?.brand_id
        editPrice.value = data.val?.price
        productId.value = data.val?._id
        editQuantity.value = data.val?.quantity
        editText.value = data.val?.text
    }
    
    if(data.name === 'delete'){
        isEdit.value = false
        isDelete.value = true
        productId.value = data.val._id
    }
}

const deleteProduct = () => {
    editModal.value = !editModal.value
    const id = productId.value
    store.dispatch("product/deleteProduct", id)
}

const editUser = () => {
    editModal.value = !editModal.value
    const form = {
        title: editTitle.value,
        price: editPrice.value,
        id: productId.value,
        text: editText.value,
        brand_id: editBrand.value,
        quantity:editQuantity.value
    }
    store.dispatch("product/editProduct", form)
}

defineProps({
    allProducts:{
        type:Array
    },
    brands:{
        type:Array
    }
})
</script>

<style>

</style>