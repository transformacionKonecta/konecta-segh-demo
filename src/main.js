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
    apiKey: "AIzaSyDLjXRMWXTBNNozor5IBbo58f0VoFVfkDM",
    authDomain: "seleccion-demo.firebaseapp.com",
    databaseURL: "https://seleccion-demo.firebaseio.com",
    projectId: "seleccion-demo",
    storageBucket: "seleccion-demo.appspot.com",
    messagingSenderId: "1077654316222",
    appId: "1:1077654316222:web:3faa6895f20b74139c6aef",
    measurementId: "G-ECS0F2D3J4"
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