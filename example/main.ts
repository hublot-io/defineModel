import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify'
import Preview from '@hublot-io/vite-plugin-vue-demi-component-preview/client';
import HublotDatePicker from '@hublot-io/core-ui/molecules/HublotDatePicker.vue'
import 'vuetify/dist/vuetify.min.css'
// import { carnot, hublot } from '@hublot-io/core-ui/theme/theme-provider'

Vue.use(Vuetify)

const opts = {}

const vuetify =  new Vuetify({
 // theme: { themes: { light: { ...hublot } } },
  icons: { iconfont: 'mdi' },
})

// Vue.use(Preview);

console.log("vite", HublotDatePicker)


const app = new Vue({
  vuetify,
  data : { 
      compnent : App
  },
  computed: {
      ViewComponent () {
        console.log("app", this.compnent)
        return this.compnent ||  { template: '<p>Page not found</p>' }
      }
    },
  el: '#app',
  render(h: any) {  return h(App) },
})


// Preview(app)

/*
setTimeout(() => { 
    console.log("components")
   //app.compnent =  { template: '<HelloWorld/>' }
}, 1000)

*/


