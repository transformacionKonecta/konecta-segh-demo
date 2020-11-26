<template>
    <v-card class= "funnels px-3 py-3 mx-5 my-3">
        <VueFunnelGraph :width="width" :height="height" :labels="labels"
              :values="values" :colors="colors" :direction="direction"
              :gradient-direction="gradientDirection"
              :animated="true"
              :displayPercentage="false" 
        ></VueFunnelGraph>
    </v-card>
</template>

<script>
    import { VueFunnelGraph } from 'vue-funnel-graph-js';
    export default {
        components: {
            VueFunnelGraph
        },
        props: ['values'], 
        data() {
            return {
                labels: ['Tipificaciones', 'Entrevistas agendadas','Aptos'],
                colors: ['#4C52BC', '#CB95FF', '#C29EFF'],
                direction: 'horizontal',
                gradientDirection: 'horizontal',
                height: 220,
                width: 700
            };
        }
}
</script>

<style lang="scss" scoped>
 .funnels{
    background-color: #E5E5E5;
 }
</style>