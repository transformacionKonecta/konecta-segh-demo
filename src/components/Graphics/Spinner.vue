<template>
     <v-dialog v-model="loading" persistent width="300" height="300">
        <v-card class="mx-auto d-flex justify-center align-center" width="300" height="300">
            <v-card-text class="d-flex justify-center align-center text-center">
            <v-progress-circular
                :size="50"
                color="teal"
                indeterminate
                class="divProgress"
            ></v-progress-circular>
            <p class="mt-10 subtitle-1 font-weight-bold">Cargando datos...</p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ["loading"]
    }
</script>

<style lang="scss" scoped>

</style>