import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hisdTab: true,
        token: null,
        loginInfo: null,
    },
    getters: {
        tokens(state) {
            let s = state.token; //判断vuex的state里面有没有token
            if (!s) { //如果vuex里面没有token去sessionStorage没有.
                s = sessionStorage.getItem('token');
                if (!s) {
                    s = document.cookie.substr(6); //截取cookie数据取出token值
                }
            }
            return s;
        },
    },
    mutations: {
        changeuser(state, payload) {
            state.hisdTab = payload;
        },
        // 保存token信息
        mutaToken(state, payload) {
            state.token = payload;
            document.cookie = "token=" + payload;
            sessionStorage.setItem('token', payload);
        },
        //保存登录用户信息
        saveLoginInfo(state, payload) {
            state.loginInfo = payload;
            let loginfo = JSON.stringify(payload);
            document.cookie += loginfo;
            sessionStorage.setItem('logininfo', loginfo);
        },
        escToken(state) {
            document.cookie = 'token=';
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('logininfo');
            state.token = null;
            state.loginInfo = null;
        },
    },
    actions: {
        actToken(context) {
            axios.get('api/user', {}).then(d => {
                //登录数据获取成功存储vuex或 sesstionStorage
                context.commit('saveLoginInfo', d.data.data);
            })
        }
    },
    modules: {
        loginuser: {
            namespaced: true,
            state: {},
            getters: {},
            mutations: {},
            actions: {},
        }
    }
})