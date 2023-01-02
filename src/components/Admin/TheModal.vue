<template>
    <el-dialog
    v-model="editModal"
    title="Edit User"
    width="40%"
    >
    <span v-if="isEdit">
        <el-form>
            <el-form-item label="Edit Title">
                <el-input type="text" placeholder="Name" v-model="editName"></el-input>
            </el-form-item>
            <el-form-item label="Edit Username">
                <el-input type="text" placeholder="Options" v-model="editUsername"></el-input>
            </el-form-item>
            <el-form-item label="Edit Level">
                <el-select v-model="adminValue" placeholder="Select">
                    <el-option
                    v-for="item in adminOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
            <el-button type="primary" @click="deleteUser">
                Delete
            </el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
</script>

<style>

</style>