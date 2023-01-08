import { createRouter, createWebHistory } from 'vue-router'
// import MainPage from '../views/User/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    meta:{
      layout: 'UserLayout'
    },
    component: () => import('../views/User/MainPage.vue')
  },
  {
    path: '/auth/login',
    name: 'Login',
    meta:{
      layout: 'AuthLayout'
    },
    component: () => import('../views/Auth/LoginView.vue')
  },
  {
    path: '/auth/register',
    name: 'Register',
    meta:{
      layout: 'AuthLayout'
    },
    component: () => import('../views/Auth/RegisterView.vue')
  },
  {
    path: '/product/:id',
    name: 'InnerProduct',
    meta:{
      layout: 'UserLayout'
    },
    component: () => import('../views/User/InnerProductPage.vue')
  },
  {
    path: '/searches',
    name: 'SearchedProducts',
    meta:{
      layout: 'UserLayout'
    },
    component: () => import('../views/User/SearchedProducts.vue')
  }, 
  {
    path: '/basket',
    name: 'BasketProducts',
    meta:{
      layout: 'UserLayout'
    },
    component: () => import('../views/User/BasketProducts.vue')
  }, 
  {
    path: '/admin',
    name: 'Admin',
    redirect: { name: "AdminProducts" },
    meta:{
      layout: 'AdminLayout'
    },
    children:[
      {
        path: '/admin/products',
        name: 'AdminProducts',
        meta:{
          layout: 'AdminLayout'
        },
        component: () => import('../views/Admin/AdminProducts.vue')
      },
      {
        path: '/admin/addProduct',
        name: 'AddProduct',
        meta:{
          layout: 'AdminLayout'
        },
        component: () => import('../views/Admin/AddProduct.vue')
      },
      {
        path: '/admin/addBrand',
        name: 'AddBrand',
        meta:{
          layout: 'AdminLayout'
        },
        component: () => import('../views/Admin/AddBrand.vue')
      },
      {
        path: '/admin/users',
        name: 'AdminUsers',
        meta:{
          layout: 'AdminLayout'
        },
        component: () => import('../views/Admin/AdminUsers.vue')
      },
      {
        path: '/admin/addUser',
        name: 'AdminAddUser',
        meta:{
          layout: 'AdminLayout'
        },
        component: () => import('../views/Admin/AdminAddUser.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/EmptyView.vue')  
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  const  isAdmin = await JSON.parse(localStorage.getItem("users"));
  const isAuth = await !!JSON.parse(localStorage.getItem("users"))
  if(isAdmin?.isAdmin === true){
    if(isAdmin && to.meta.layout === 'UserLayout'){
      next("/admin")
    } else if(!isAdmin && to.meta.layout === 'AdminLayout'){
      next("/")
    }
  }else if(!isAuth && to.meta.layout === 'AdminLayout'){
    next({ name:"Login" })
  }else if(isAdmin?.isAdmin === false && to.meta.layout === 'AdminLayout'){
    next("/")
  }
  next()
  // if (to.meta.layout !== 'AuthLayout' && !isAuthenticated) next({ name: 'Login' })
  // else next()
})


export default router
