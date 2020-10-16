import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from './store'
// import firebase from 'firebase';
import { Datetime } from 'vue-datetime'
import firebase from 'firebase/app';
import VuePromiseBtn from 'vue-promise-btn'
import 'vue-promise-btn/dist/vue-promise-btn.css'

import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)
Vue.use(VuePromiseBtn)

require('firebase/firestore');

const configOptions = {

  // apiKey: "AIzaSyD7BgowPMHgkRz7Tkd4SBjFiegIybPOL88",
  // authDomain: "seleccion-digital.firebaseapp.com",
  // databaseURL: "https://seleccion-digital.firebaseio.com",
  // projectId: "seleccion-digital",
  // storageBucket: "seleccion-digital.appspot.com",
  // messagingSenderId: "165269710063",
  // appId: "1:165269710063:web:20a6c5611b6f587f5da71a",
  // measurementId: "G-MMDEVB0DW0" 

  
/*   apiKey: "AIzaSyB5Ap0VYAT3-rkIxVGu9eBp6oEf9VJZyas",
   authDomain: "konectase-desa.firebaseapp.com",
   databaseURL: "https://konectase-desa.firebaseio.com",
   projectId: "konectase-desa",
   storageBucket: "konectase-desa.appspot.com",
   messagingSenderId: "962491687547",
   appId: "1:962491687547:web:a0fcbee16feb4ad0a9b8de",
   measurementId: "G-ZWE6D4HTXB" */

//  OLD fiorella
  apiKey: "AIzaSyDFb0EaWaPKCq37BuZSkoY2193PNZrUx0I",
  authDomain: "konecta-seleccion.firebaseapp.com",
  databaseURL: "https://konecta-seleccion.firebaseio.com",
  projectId: "konecta-seleccion",
  storageBucket: "konecta-seleccion.appspot.com",
  messagingSenderId: "212657214250",
  appId: "1:212657214250:web:34e59f4f06c30511644453",
  measurementId: "G-FZ4MPDHR8G"  
};

// Initialize Firebase
firebase.initializeApp(configOptions);


Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


new Vue({
  router,
  store,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')