var baseUrl = "http://192.168.3.34:8091/triberH5AppTest";
Vue.prototype.$axios = axios;    //把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求