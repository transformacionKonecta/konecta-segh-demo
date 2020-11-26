<template>
     <v-card 
    class= "table px-1 elevation-3 ml-1 mr-4 my-1 rounded-lg">
            <v-card-title class="d-flex titleCard">
            <v-img
            class="mr-3"
            src="../assets/call.svg"
            aspect-ratio="1"
            max-width="40"
            ></v-img>
            <span>Equipo call</span> 
            <v-spacer></v-spacer>
        </v-card-title>
        <div v-if="loadingTable"
        class="d-flex px-3 mx-1 my-3"
        >
            Cargando...
        </div>
        <v-data-table
        v-else
        dense
        :headers="headers"
        :items="interviewsByCall"
        :items-per-page="interviewsByCall.length"
        hide-default-footer
        item-key="name"
        class="elevation-1 rounded-0 my-3 mx-1"
        >
        <template  v-slot:[`item.actions`]="{item}">
                <v-btn @click="eventBusEmit(item)"
                >Ver
                </v-btn>
        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        props: ['interviewsByCall','loadingTable'],
        data(){
            return{
                headers: [
                    {
                    text: 'Nombres y apellidos',
                    align: 'start',
                    sortable: false,
                    value: 'interviewer',
                    },
                    { text: 'Tipificación', value: 'tipification' },
                    { text: 'Agendados', value: 'scheduled' },
                    { text: 'Aptos', value: 'aptos' },
                    { text: 'Calidad', value: 'convertion'},
                    { text: 'Detalle', value: 'actions', sortable: false },
                ],
            }
        },
        methods: {
            eventBusEmit(item){
               this.$router.push({ path:`/home/call`,query: item })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>