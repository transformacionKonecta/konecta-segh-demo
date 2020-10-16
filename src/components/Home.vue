<template>
    <v-app>
        <h1 class="px-3 mx-3 my-3"> Bienvenido Ramiro</h1>
        <h5 class="px-3 mx-3">Aquí podrás encontrar un resumen de actividades en equipo</h5>
            <!-- <Loading
             :loading="loading"
            /> -->
            <div>
                <div class=" dataSelect d-flex px-3 mx-3 my-2">
                <v-menu class="px-3 mx-3 my-2"
                v-model="menu1" :close-on-content-click="false" max-width="290">
                <template v-slot:activator="{ on }">
                    <v-text-field
                    class="px-3 mx-3 my-2"
                     prepend-icon="event"
                    :value="computedDateFormattedMomentjs"
                    clearable
                    label="Desde:"
                    readonly
                    v-on="on"
                    color="teal"
                    @click:clear="startDate= null"
                    ></v-text-field>
                </template>
                <v-date-picker
                    locale="ES-es"
                    color="teal"
                    no-title
                    v-model="startDate"
                    @click:date="getTimeOld"
                    @change="menu1 = false"
                ></v-date-picker>
             </v-menu>
             <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                <template v-slot:activator="{ on }">
                    <v-text-field
                    class="px-3 mx-3 my-2"
                    prepend-icon="event"
                    :value="computedDateFormattedMomentjs2"
                    clearable
                    label="Hasta:"
                    readonly
                    v-on="on"
                    color="teal"
                    @click:clear="endDate = null"
                    ></v-text-field>
                </template>
                <v-date-picker
                    locale="ES-es"
                    color="teal"
                    no-title
                    v-model="endDate"
                    @click:date="getTimeEnd"
                    @change="menu2 = false"
                ></v-date-picker>
             </v-menu>
            </div>
            <FunnelGraph
            v-if="(Object.values(total))[0]!==0"
            :values="Object.values(total)"
            />
            <div class="d-flex px-3 mx-1 my-3">
                <v-card 
                class= "table px-1 elevation-3 ml-1 mr-4 my-1 rounded-lg">
                     <v-card-title class="d-flex titleCard">
                        <v-img
                        class="mr-3"
                        src="../assets/call.svg"
                        aspect-ratio="1"
                        max-width="40"
                        ></v-img>
                        <span>Reclutadores</span> 
                        <v-spacer></v-spacer>
                        <v-btn
                        width="92"
                        class="ma-2 text-capitalize"
                        dark
                        color="#00BCD4">
                            Ver todo
                        </v-btn>
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
                        <template v-slot:item.showmore="{ item }">
                        <v-chip
                            dark
                        >
                            {{ item.showmore }}
                        </v-chip>
                        </template>
                    </v-data-table>
                </v-card>
                <v-card class= "graffic elevation-3 ml-4 mr-1 my-1 rounded-lg d-flex flex-column">
                    <v-card-title class="d-flex titleCard">
                        <v-img
                        class="mr-3"
                        src="../assets/pie-chart.svg"
                        aspect-ratio="1"
                        max-width="35"
                        ></v-img>
                        <span>Conversión de grupo</span> 
                        <v-spacer></v-spacer>
                        <v-btn
                        width="92"
                        class="ma-2 text-capitalize"
                        dark
                        color="#00BCD4">
                            Ver todo
                        </v-btn>
                    </v-card-title>
                    <Doughnut
                    v-if="(Object.values(total))[0]!==0"
                    class="d-flex px-3 mx-1 my-3"
                    :values="Object.values(convertion)"
                    :width="100"
                    :height="300"
                    :labels="['Aptos', 'No se presentó', 'Rechaza propuesta', 'No aptos']"
                    />
                    <div v-else-if="loadingTable"
                    class="d-flex px-3 mx-1 my-3"
                    >
                      Cargando...
                    </div>
                    <div v-else
                    class="d-flex px-3 mx-1 my-3"
                    >
                      No hay tipificaciones en ese rango de fechas
                    </div>
                </v-card>
            </div>
            </div>
    </v-app>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import {compareDate } from '../utils/hour'
import FunnelGraph from '../components/Graphics/FunnelGraph.vue'
import Doughnut from '../components/Graphics/Doughnut'
import Loading from '../components/Graphics/Spinner'

import { getProgramedEvaluationByIdPostulant } from '../firebase/evaluationMethods';
import { getProgramedInterviewsBySelector , getProgramedInterviewsByCall} from '../firebase/interviewMethods';
import { getUsersByRole, getUser } from '../firebase/userMethods';
    export default {
        data(){
            const today = new Date().toISOString().substr(0, 10);
            const todayArray = today.split('-');
            return {
                loading: true,
                loadingTable: true,
                startDate: today,
                endDate: today,
                menu1: false,
                menu2:false,
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
                    { text: 'Conversión', value: 'convertion'},
                    { text: 'Detalle', value: 'showmore'}
                ],
                interviewsByCall: [],
                interviewsBySelector: [],
                dateOld: `${todayArray[2]}/${todayArray[1]}/${todayArray[0]}`,
                dateEnd:`${todayArray[2]}/${todayArray[1]}/${todayArray[0]}`,
                conversion: [],
                total:{
                    tipification:0,
                    scheduled: 0,
                    aptos: 0,
                },
                convertion: {
                    aptos: 0,
                    noSePresento: 0,
                    rechazaPropuesta : 0,
                    noApto :0,
                }

            }
        },
        watch: {
            dateOld() {
                this.calls()
            },
            dateEnd(){
                this.calls()
            }
        },
        computed: {
            computedDateFormattedMomentjs() {
                return this.startDate ? moment(this.startDate).format("DD/MM/YYYY") : "";
            },
            computedDateFormattedMomentjs2() {
                return this.endDate ? moment(this.endDate).format("DD/MM/YYYY") : "";
            },
        },
        components: {
            FunnelGraph,
            Doughnut,
            Loading
        },
        methods: {
             getTimeOld(date) {
                 const dateOldArray = date.split('-');
                 this.dateOld = `${dateOldArray[2]}/${dateOldArray[1]}/${dateOldArray[0]}`;
            },
            getTimeEnd(date) {
                 const dateEndArray = date.split('-');
                 this.dateEnd = `${dateEndArray[2]}/${dateEndArray[1]}/${dateEndArray[0]}`;
            },
            async calls() {
                this.interviewsByCall= [];
                this.loadingTable =true;
                this.total = {
                    tipification:0,
                    scheduled: 0,
                    aptos: 0,
                };
                this.convertion= {
                    aptos: 0,
                    noSePresento: 0,
                    rechazaPropuesta : 0,
                    noApto :0,
                };
                const intsByCall = await getUsersByRole("Call")
                .then( user => Object.keys(user.val()))
                .then( callsIds => callsIds.forEach(callId => 
                    getUser(callId)
                    .then( user => `${user.name} ${user.lastName}`)
                    .then( name =>  getProgramedInterviewsByCall(callId)
                        .then( async interviewsByCall => {
                            if(!!interviewsByCall.val()){
                                const byDaysAgo = Object.values(interviewsByCall.val()).filter((e) => 
                                compareDate(e.fechaEntrevista, this.dateOld) && compareDate(this.dateEnd, e.fechaEntrevista))
                                // Por rango de fecha devuelve un array de evaluaciones
                                const promises = await byDaysAgo.map( (obj, i) => getProgramedEvaluationByIdPostulant(obj.id_postulante)
                                    .then(programedEvaluation =>!!programedEvaluation.val()? programedEvaluation.val(): 'No evaluacion'
                                    ))
                                    Promise.all(promises)
                                    .then(programedEvaluations => {
                                        console.log(programedEvaluations);
                                        const states = programedEvaluations.map(e => !(e==='No evaluacion')? Object.values(e)[0].estado: 'No evaluacion')
                                        const scheduled = states.filter((state) => state !== 'No evaluacion')
                                        const aptos = states.filter((state) => state === 'APTO')
                                        const noSePresento = states.filter((state) => state === 'No se presentó')
                                        const rechazaPropuesta = states.filter((state) => state === 'Rechaza Propuesta')
                                        const noApto = states.filter((state) => state === 'NO APTO')
                                        const convertion = !!scheduled.length? Math.round(aptos.length*10000/scheduled.length)/100 : 0
                                        this.loadingTable =false;
                                        if(states.length!==0){
                                        this.total.aptos += aptos.length
                                        this.total.scheduled += scheduled.length
                                        this.total.tipification += states.length

                                        this.convertion.aptos += aptos.length
                                        this.convertion.noSePresento += noSePresento.length
                                        this.convertion.rechazaPropuesta += rechazaPropuesta.length
                                        this.convertion.noApto += noApto.length
                                        this.loading = false;
                                        this.interviewsByCall.push ({
                                            interviewer: name,
                                            tipification:states.length,
                                            scheduled: scheduled.length,
                                            aptos: aptos.length,
                                            convertion: `${convertion}%`,
                                            showmore: 'Ver'
                                        })
                                        }
                                    })
                            } else {
                                //si no tiene entrevistas
                                    this.interviewsByCall.push({
                                    interviewer: name,
                                    tipification:0,
                                    scheduled: 0,
                                    aptos: 0,
                                    convertion: '0%',
                                    showmore: 'Ver'
                                })
                            }
                        })
                        // .catch(() => console.log('no hay data'))
                        )
                    ))
            },
            // async selectors(){
            //     const postlulantIds = await getUsersByRole("Selector")
            //     .then( async user =>  {
            //         const promises = await Object.keys(user.val()).forEach(callId => getUser(callId)
            //         .then( user => `${user.name.toLowerCase()} ${user.lastName.toLowerCase()}`)
            //         .then(  nameById =>  getProgramedInterviewsBySelector()
            //             .then( intsBySelectorName => {
            //                 const byName = Object.values(intsBySelectorName.val()).filter((e) => e.entrevistador.toLowerCase().includes(nameById))
            //                 const byDaysAgo = byName.filter((e) => compareDate(e.fechaEntrevista,this.dateOld))
            //                 return byDaysAgo.map( obj =>  getProgramedEvaluationByIdPostulant(obj.id_postulante)
            //                     .then(programedEvaluation => !!programedEvaluation.val()? programedEvaluation.val(): 'no evaluacion')
            //                 )
            //             })
            //             .then(promises => Promise.all(promises)
            //                 .then(programedEvaluations => ({
            //                     interviewer: nameById,
            //                     states: programedEvaluations.map(e => !(e==='no evaluacion')? Object.values(e)[0].estado: 'no evaluacion')
            //                 })))
            //             )
            //             .then(data => this.interviewsBySelector.push(data))
            //         )
            //         return promises
            //         })
            // }
        },
        created() {
            this.calls();
            this.selectors();
        },
    }
</script>

<style lang="scss" scoped>
    .dataSelect{
        width: 50%;
    }
    h1 {
       color:#2276BB;
       font-size: 32px;
    }
    h5{
        color: #979797;
        font-size: 16px;
    }
    .graffic{
        width: 40%;
        max-height: 100%;
    }
    .table{
        width: 60%;
    }
    .titleCard{
        color: #2276BB;
        font-size: 14px;
        border-bottom: 1px solid #2276BB;
    }
    .table-header {
    thead {
        background-color: black;
    }
}
    .text-start{
        text-transform: capitalize;
    }
</style>