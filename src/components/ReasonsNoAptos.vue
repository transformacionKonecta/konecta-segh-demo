<template>
    <v-card class="pa-3 mx-3 my-3 ">
        <v-card-title class="text-center">
            Motivos de postulantes no aptos:
        </v-card-title>
        <div class="d-flex justify-space-between">
        <v-card v-for="item in clasification" :key="item.icon"
        class="ma-auto d-flex flex-column align-center elevation-0 card"
            width="175"
            height="175"
            >
            <v-img
                contain
                max-height="50"
                max-width="50"
                class="mt-4"
                :src="require(`../assets/${item.icon}`)"
            ></v-img>
        
            <v-card-title height="40px">
                {{item.value}}
            </v-card-title>
        
            <v-card-subtitle class="text text-center" width="200">
                {{item.text}}
            </v-card-subtitle>
        </v-card>
        </div>
    </v-card>
</template>

<script>
    export default {
        props:['clasification'],
    }
</script>

<style lang="scss" scoped>
.card{
    border-left: 1px solid black !important;
    border-right : 1px solid black !important;
}
.text{
    width: 100%;
}
</style>