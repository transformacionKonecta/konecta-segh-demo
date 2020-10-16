<template>
    <v-card class= "funnels px-3 py-3 mx-5 my-3">
        <VueFunnelGraph :width="width" :height="height" :labels="labels"
              :values="values" :colors="colors" :sub-labels="subLabels" :direction="direction"
              :gradient-direction="gradientDirection"
              :animated="true" :display-percentage="true" 
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
                // subLabels: ['Direct', 'Social Media', 'Ads','extra','Direct', 'Social Media', 'Ads','extra', 'Direct', 'Social Media'],
                // values: [
                //     3,4,5
                // // with the given Labels and SubLabels here's what the values represent:
                // // 
                // // Direct, Social, Ads  
                // //    |      |     |  
                // //    v      v     v
                //     // [3000, 2500, 6500,4000, 3000, 2500, 6500,4000,3000, 2500 ], // Segments of "Impressions" from top to bottom
                //     // [3000, 1700, 1000, ,4000, 3000, 2500, 6500,4000,3000, 2500], // Segments of "Add To Cart" // Segments of "Buy"
                // ],
            // labels: ['Impressions', 'Add To Cart', 'Buy'],
            // subLabels: [],
            // values: [12000, 5700, 930],
            //     colors: [
            //         ['#FFB178', '#FF3C8E'], // color set for "Impressions" segment
            //         ['#A0BBFF', '#EC77FF'], // color set for "Add To Cart" segment
            //         ['#A0F9FF', '#7795FF']  // color set for "Buy" segment
            //     ],
                colors: ['#A4B8FF', '#C29EFF'],
                direction: 'horizontal',
                gradientDirection: 'horizontal',
                height: 300,
                width: 900
            };
        }
}
</script>

<style lang="scss" scoped>
 .funnels{
    background-color: #393862;
 }
</style>