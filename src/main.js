import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import config from './config'

//Import Materialize CSS
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

//Import custom styles
import '@/assets/css/appstyles.css'

//Import Lodash and add it to vue Prototype so that it is available in every component
import _ from 'lodash';  
Object.defineProperty(Vue.prototype, '$_', { value: _ });


//Import vue noty plugin
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
Vue.use(VueNoty, {
  theme: 'sunset',
  timeout: 1000,
  progressBar: true,
})

//Import Sweet Alert Plugin
import Swal from 'sweetalert2'

//Sweet Alert Configurations
const SwalDelete = Swal.mixin({
  title: 'Delete this item?',
  text: "The item will be deleted permanently",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#111',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Delete'
});
window.SwalDelete = SwalDelete;

Vue.config.productionTip = false

//Event Transmitter
 window.eventTransmitter= new Vue({});

new Vue({
  router,
  store,
  data: {
      appName : config.appName,
  },
  render: h => h(App),
}).$mount('#app')
