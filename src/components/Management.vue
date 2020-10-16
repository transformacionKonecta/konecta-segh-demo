<template>
  <v-container>
    <h2 class="ma-3">Gestiones</h2>
    <v-divider></v-divider>
    <AssistanceAdmin/>  
    <CardAccountService/> 
    <CardReferrals/> 
  </v-container>
</template>
<script>
import firebase from "firebase";
import moment from "moment";

import AssistanceAdmin from "../components/AssistanceAdmin";
import CardAccountService from "../components/CardAccountService";
import CardReferrals from "../components/CardReferrals";


export default {
  name: "ManagementAdmin",
  components:{
    AssistanceAdmin,
    CardAccountService,
    CardReferrals
  },
  data() {
    return {
      prueba: 'Holi'
    }
  },
  computed: {
  
  },
  mounted() {
  
  },
  methods: {
  
  
  },
};
</script>
<style>

</style>