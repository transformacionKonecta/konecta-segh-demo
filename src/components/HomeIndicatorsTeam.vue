<template>
    <div class="px-3 mx-1 my-3">
         <h3 class="px-3 mx-3 my-3"> Indicadores de equipo</h3>
        <div class="d-flex justify-space-between px-3 mx-1 my-3">
            <v-card v-for="(item, index) in items"
                :key="index"
                max-width="250">
                <v-list-item three-line>
                    <v-img
                        class="mr-3"
                        :src="require(`../assets/${item.img}`)"
                        aspect-ratio="1"
                        max-width="50"
                        ></v-img>
                    <v-list-item-content>
                        <div class="mb-4">
                        {{item.title}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                        {{`${item.percentage}%`}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Actualizado al {{item.update}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        props:['items'],
    }
</script>

<style lang="scss" scoped>
h3{
       color:#2276BB;
    }
</style>