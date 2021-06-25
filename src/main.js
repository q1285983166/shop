import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/animate4.1.min.css"
import './assets/css/reset.min.css'
import 'amfe-flexible';
import 'vant/lib/index.css'
import {
    AddressList,
    Tabbar,
    TabbarItem,
    Search,
    Swipe,
    SwipeItem,
    Lazyload,
    Grid,
    GridItem,
    Icon,
    Cell,
    CellGroup,
    Card,
    Tab,
    Tabs,
    Overlay,
    Loading,
    Form,
    Field,
    Button,
    Toast,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Sku,
    Stepper,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
    ContactCard,
    Popup,
    CouponCell,
    CouponList,
    RadioGroup,
    Radio,
    Step,
    Steps,
    Image as VanImage,
    Empty,
    Divider,
    Dialog

} from 'vant'

Vue.use(Tabbar).use(TabbarItem).use(Search).use(Swipe).use(SwipeItem)
Vue.use(Lazyload).use(Grid).use(GridItem).use(Icon).use(Cell).use(CellGroup)
Vue.use(Card).use(Tab).use(Tabs).use(Overlay).use(Loading).use(Form)
Vue.use(Field).use(Button).use(Toast).use(GoodsAction).use(GoodsActionIcon)
Vue.use(GoodsActionButton).use(Sku).use(Stepper).use(Checkbox).use(CheckboxGroup)
Vue.use(SubmitBar).use(ContactCard).use(Popup).use(CouponCell).use(CouponList)
Vue.use(RadioGroup).use(Radio).use(Step).use(Steps).use(VanImage).use(Empty)
Vue.use(Divider).use(AddressList).use(Dialog)

Vue.config.productionTip = false
let playMusic = null;
new Vue({
    router,
    store,
    data: {
        playMusic
    },
    render: h => h(App)
}).$mount('#app')