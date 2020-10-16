<template>
  <component :is="layout"></component>
</template>
<script>
  import LoginLayout from './components/layouts/login'
  import PrincipalLayout from './components/layouts/principal'
  import {mapState} from 'vuex'
  export default {
    components: {LoginLayout, PrincipalLayout},
    computed: mapState(['layout'])
  }
</script>

import {mapState} from 'vuex'
  export default {
    components: {Coach},
    computed: mapState(['layout'])
  }