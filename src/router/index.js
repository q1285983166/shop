import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const originalPush = VueRouter.prototype.push; //拿到VueRouter的push函数
//重写调用push函数
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'CateGory',
        component: () =>
            import ('../views/CateGory.vue')
    },
    {
        path: '/shopcars',
        name: 'ShopCars',
        component: () =>
            import ('../views/ShopCars.vue'),
        meta: {
            login: true
        }
    },
    {
        path: '/my',
        name: 'My',
        component: () =>
            import ('../views/My.vue'),
        meta: {
            login: true
        }
    },
    {
        path: '/load',
        name: 'Load',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Load.vue')
    },
    {
        path: '/data',
        name: 'Data',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Data.vue')
    },
    {
        path: '/shopdetails/:sid',
        name: 'ShopDetails',
        props: true,
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/ShopDetails.vue')
    },
    {
        path: '/detail/:sid',
        name: 'DeTail',
        props: true,
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/DeTail.vue')
    },
    {
        path: '/submit/:sid',
        name: 'SubMit',
        props: true,
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/SubMit.vue')
    },
    {
        path: '/orderform/:sid',
        name: 'OrderForm',
        props: true,
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/OrderForm.vue')
    },
    {
        path: '/status/:sid',
        name: 'Status',
        props: true,
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Status.vue')
    },
    {
        path: '/hotlist',
        name: 'HotLIst',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/HotLIst.vue')
    },
    {
        path: '/hot_new_goods/:sid',
        name: 'Hot_New_Goods',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Hot_New_Goods.vue')
    },
    {
        path: '/vuexx',
        name: 'Vuexx',
        component: () =>
            import ('../views/Vuexx.vue')
    },
    {
        path: '/user/account',
        name: 'Account',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Account.vue')
    },
    {
        path: '/bill/:id',
        name: 'Bill',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Bill.vue')
    },
    {
        path: '/integral',
        name: 'Integral',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Integral.vue')
    },
    {
        path: '/order/:id',
        name: 'Order',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/Order.vue')
    },
    {
        path: '/user/user_coupon',
        name: 'UserCoupon',
        meta: {
            btmNav: true
        },
        component: () =>
            import ('../views/UserCoupon.vue')
    }
    
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.login && !store.getters.tokens) {
        next('/load');
    }
    next(); //继续放行
})

export default router