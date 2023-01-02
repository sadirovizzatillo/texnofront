import { ElNotification } from 'element-plus'

export default {
    namespaced:true,
    actions:{
        warning(_, message){
            ElNotification.warning(message)
        },
        success(_, message){
            ElNotification.success(message)
        },
        error(_, message){
            ElNotification.error(message)
        }
    }
}