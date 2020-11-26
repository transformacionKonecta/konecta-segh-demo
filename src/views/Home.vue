<template>
    <v-app>
        <h1 class="px-3 mx-3 my-3"> Bienvenido</h1>
        <h5 class="px-3 mx-3">
            Aquí podrás encontrar un resumen de las actividades en tu equipo. Recuerda que la información que se visualiza en esta pantalla está actualizada hasta al cierre del día de ayer.
        </h5>
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
                    :max="yesterday"
                    v-model="startDate"
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
                    :max="new Date().toISOString().slice(0,10)"
                    v-model="endDate"
                    @change="menu2 = false"
                ></v-date-picker>
             </v-menu>
              <v-btn width="152" class="ma-2" dark color="#EF6C00"
              v-on:click="getTime"
               >
                <v-icon
                left>search</v-icon>Buscar
                <v-progress-circular
                class="ml-2"
                 v-if="loadingTable"
                 left
                 :size="25"
                 :width="5"
                 color="primary"
                indeterminate
                
                ></v-progress-circular>
             </v-btn>
            </div>
            <div class="d-flex">
                <FunnelGraph
                :values="Object.values(total)"
                />
                <v-card class= "graffic elevation-3 ml-4 mr-1 my-1 rounded-lg d-flex flex-column">
                    <v-card-title class="d-flex titleCard">
                        <v-img
                        class="mr-3"
                        src="../assets/pie-chart.svg"
                        aspect-ratio="1"
                        max-width="35"
                        ></v-img>
                        <span>Conversión de grupo</span> 
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
            <HomeIndicatorsTeam
            :items="indicatorsByTeam"
            />
            <div class="d-flex px-3 mx-1 my-3">
               <RecruiterTable
                :loadingTable="loadingTable"
                :interviewsByCall="interviewsByCall"
               />
               <SelectorTable
               :loadingTable="loadingTable"
               :dateOld="dateOld"
               :dateEnd="dateEnd"
               :searchAgain ="searchAgain"
               :getSelectorInfo="getSelectorInfo"
               />
            </div>
            </div>
    </v-app>
</template>

<script>
import moment from "moment";
import {compareDate } from '../utils/hour'
import FunnelGraph from '../components/Graphics/FunnelGraph.vue'
import Doughnut from '../components/Graphics/Doughnut'
import Loading from '../components/Graphics/Spinner'
import RecruiterTable from '../components/HomeRecruiterTable'
import HomeIndicatorsTeam from '../components/HomeIndicatorsTeam'
import SelectorTable from '../components/HomeSelectorTable'
import { getProgramedEvaluationByIdPostulant } from '../firebase/evaluationMethods';
import { getProgramedInterviewsByCall} from '../firebase/interviewMethods';
import { getUsersByRole, getUser } from '../firebase/userMethods';

export default {
        data(){
            const hoy = new Date();
            const milisegundosDay = 24 * 60 * 60 * 1000;
            const yes =  new Date(hoy.getTime()- milisegundosDay);
            const today = hoy.toISOString().substr(0, 10);
            const todayArray = today.split('-');
            const yesterday = new Date(`${yes.toISOString().substr(0, 10)} 06:00`)
            return {
                searchAgain:false,
                loading: true,
                loadingTable: true,
                startDate: yesterday.toISOString().slice(0,10),
                endDate: today,
                menu1: false,
                menu2:false,
                interviewsByCall: [],
                dateOld: `${todayArray[2]}/${todayArray[1]}/${todayArray[0]}`,
                dateEnd:`${todayArray[2]}/${todayArray[1]}/${todayArray[0]}`,
                yesterday: yesterday.toISOString().slice(0,10),
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
                },
                indicatorsByTeam:[{
                    img:'management.svg',
                    title: 'Productividad de Call',
                    percentage: 0,
                    update: yesterday.toISOString().slice(0,10)
                },{
                    img:'video-calling.svg',
                    title: 'Presentismo Call',
                    percentage: 0,
                    update: yesterday.toISOString().slice(0,10)
                },
                {   img:'vote.svg',
                    title: 'Calidad Call',
                    percentage: 0,
                    update: yesterday.toISOString().slice(0,10)
                },{ img:'selection.svg',
                    title: 'Productividad Selección',
                    percentage: 0,
                    update: yesterday.toISOString().slice(0,10)
                }] 

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
            Loading,
            RecruiterTable,
            HomeIndicatorsTeam,
            SelectorTable,
        },
        methods: {
            getSelectorInfo(aptos,entrevistados){
                this.indicatorsByTeam[3].percentage = Math.round(aptos/entrevistados*10000)/100
            },
            addZeroInterviewsCall(name){
                this.interviewsByCall.push({
                    interviewer: name,
                    tipification:0,
                    scheduled: 0,
                    aptos: 0,
                    convertion: '0%',
                    noAptos: 0,
                    noSePresento: 0,
                    rechazaPropuesta: 0,
                    reasonsNoAptos:[],
                    fecha: `${this.startDate} hasta ${this.endDate}`
                })
            },
            reasonsNoAptos(objNoAptos){
                return objNoAptos.map((noApto) => (Object.values(noApto)[0].itemNoApto === undefined)? 'Otros (especificar)': Object.values(noApto)[0].itemNoApto);
            },
            getTime() {
                 const dateOldArray = this.startDate.split('-');
                 this.dateOld = `${dateOldArray[2]}/${dateOldArray[1]}/${dateOldArray[0]}`;
                 const dateEndArray = this.endDate.split('-');
                 this.dateEnd = `${dateEndArray[2]}/${dateEndArray[1]}/${dateEndArray[0]}`;
                 this.calls()
                 this.searchAgain= !this.searchAgain
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
                                ///
                                if(byDaysAgo.length !== 0) {
                                // Por rango de fecha devuelve un array de evaluaciones
                                const promises = await byDaysAgo.map( (obj, i) => getProgramedEvaluationByIdPostulant(obj.id_postulante)
                                    .then(programedEvaluation =>!!programedEvaluation.val()? {... programedEvaluation.val() , fechaEntrevista: obj.fechaEntrevista}: 'No evaluacion'
                                    ))
                                    Promise.all(promises)
                                    .then(programedEvaluations => {
                                        const objNoAptos = programedEvaluations.filter(e => Object.values(e)[0].estado === 'NO APTO');
                                        const states = programedEvaluations.map(e => !(e==='No evaluacion')? Object.values(e)[0].estado: 'No evaluacion')
                                        const scheduled = states.filter((state) => state !== 'No evaluacion')
                                        const aptos = states.filter((state) => state === 'APTO')
                                        const noSePresento = states.filter((state) => state === 'No se presentó')
                                        const rechazaPropuesta = states.filter((state) => state === 'Rechaza Propuesta')
                                        const noApto = states.filter((state) => state === 'NO APTO')
                                        const convertion = !!scheduled.length? Math.round(aptos.length*10000/scheduled.length)/100 : 0
                                        this.loadingTable =false;
                                        if(states.length!==0){
                                        // total ---------
                                        this.total.aptos += aptos.length
                                        this.total.scheduled += scheduled.length
                                        this.total.tipification += states.length
                                        // convertion ------
                                        this.convertion.aptos += aptos.length
                                        this.convertion.noSePresento += noSePresento.length
                                        this.convertion.rechazaPropuesta += rechazaPropuesta.length
                                        this.convertion.noApto += noApto.length
                                        // indicators-------
                                        this.indicatorsByTeam[0].percentage = Math.round(this.total.scheduled/this.total.tipification*10000)/100
                                        this.indicatorsByTeam[1].percentage = Math.round((1-(this.convertion.noSePresento/this.total.scheduled))*10000)/100
                                        this.indicatorsByTeam[2].percentage = Math.round(this.total.aptos/this.total.scheduled*10000)/100
                                        this.interviewsByCall.push ({
                                            callId,
                                            interviewer: name,
                                            tipification:states.length,
                                            scheduled: scheduled.length,
                                            convertion: `${convertion}%`,
                                            aptos: aptos.length,
                                            noAptos: noApto.length,
                                            noSePresento: noSePresento.length,
                                            rechazaPropuesta: rechazaPropuesta.length,
                                            reasonsNoAptos: this.reasonsNoAptos(objNoAptos),
                                            fecha: `${this.startDate} hasta ${this.endDate}`
                                        })

                                        }
                                        
                                    })
                                }
                                 else {
                                this.addZeroInterviewsCall(name)
                                this.loadingTable = false;
                            }

                            } else {
                                this.addZeroInterviewsCall(name)
                            }
                        })
                        )
                    .catch((e) =>alert(e))
                    ))
            },
        },
        created() {
            this.calls();
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
        width: 50%;
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