(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd575150"],{"9c5f":function(t,a,s){"use strict";s("e77a")},d930:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"ClassIfy"},[s("load-ing",{attrs:{show:t.show}}),s("van-search",{attrs:{shape:"round",placeholder:"请输入搜索关键词"}}),s("div",{staticClass:"none"}),s("van-tabs",{staticClass:"ClassIfy_ul",attrs:{scrollspy:"",sticky:""}},t._l(t.data,(function(a){return s("van-tab",{key:a.id,staticClass:"ClassIfy_li",attrs:{title:a.cate_name}},[s("div",[s("div",{staticClass:"tap"},[t._v(t._s(a.cate_name))]),s("ul",t._l(a.children,(function(a){return s("router-link",{key:a.id,attrs:{tag:"li",to:"/shopdetails/"+a.id+"?title="+a.cate_name}},[s("img",{attrs:{src:a.pic,alt:""}}),s("p",[t._v(t._s(a.cate_name))])])})),1)])])})),1)],1)},e=[],i=s("80da"),c={data:function(){return{data:[],show:!0}},created:function(){var t=this;this.show=!0,this.$axios.get("/api/category").then((function(a){t.data=a.data.data,t.show=!1}))},components:{LoadIng:i["a"]}},l=c,o=(s("9c5f"),s("2877")),r=Object(o["a"])(l,n,e,!1,null,null,null);a["default"]=r.exports},e77a:function(t,a,s){}}]);
//# sourceMappingURL=chunk-dd575150.98316484.js.map