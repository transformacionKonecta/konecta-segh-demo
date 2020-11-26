<template>
    <div>     
     <h1 class="px-3 mx-3 my-3">{{call.interviewer}}</h1>
     <h4 class="px-3 mx-3">Aquí podrás encontrar un resumen de las actividades de {{call.interviewer}} en la fecha {{date}}.</h4>
     <a class="teal--text subtitle-1 my-5 mx-3 font-weight-bold" @click="$router.go(-1)">
        <v-icon>keyboard_arrow_left</v-icon>Regresar
      </a>
     <HomeIndicatorsTeam
         :items="indicatorsByTeam"
    />
    <v-data-table
        :items="[call]"
        :headers="headers"
        hide-default-footer
        dense
        class="px-2 my-4 elevation-6 mx-6 rounded-lg"
    >
    </v-data-table>
    <div class="d-flex justify-space-around">
        <v-card class= "elevation-3 ml-4 mr-1 my-1 rounded-lg d-flex flex-column">
            <v-card-title class="d-flex titleCard">
                <v-img
                class="mr-3"
                src="../assets/pie-chart.svg"
                aspect-ratio="1"
                max-width="35"
                ></v-img>
                <span>Estados de postulantes agendados</span> 
            </v-card-title>
            <Doughnut
                v-if="Number(this.call.scheduled)!== 0"
                class="d-flex px-3 mx-1 my-3"
                :values="calidad"
                :width="400"
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
        <v-card class= "elevation-3 ml-4 mr-1 my-1 rounded-lg d-flex flex-column">
             <v-card-title class="d-flex titleCard">
                <v-img
                class="mr-3"
                src="../assets/pie-chart.svg"
                aspect-ratio="1"
                max-width="35"
                ></v-img>
                <span>Resultados de la base trabajada</span> 
            </v-card-title>
        <LineGraphic
            :value="tipificacionesByWeek"
            :value2="agendadosByWeek"
            :labels="arrayWeek"
            :title="'Tipificaciones'"
            :title2="'Agendados'"
            :size="[600, 300]"
            :title3="'Aptos'"
            :value3="aptosByWeek"
        />
        </v-card>
        </div>
        <ReasonsNoAptos :clasification="clasificationReasonNoAptos"/>
    </div>
</template>

<script>
import HomeIndicatorsTeam from '../components/HomeIndicatorsTeam'
import RecruiterTable from '../components/HomeRecruiterTable'
import Doughnut from '../components/Graphics/Doughnut'
import LineGraphic from '../components/Graphics/LineGraphic'
import ReasonsNoAptos from '../components/ReasonsNoAptos.vue'
import { getProgramedEvaluationByIdPostulant } from '../firebase/evaluationMethods';
import { getProgramedInterviewsByCall} from '../firebase/interviewMethods';
import { isMoment } from 'moment'

    export default {
        
     data(){
          const hoy = new Date();
            const milisegundosDay = 24 * 60 * 60 * 1000;
            const yes =  new Date(hoy.getTime()- milisegundosDay);
            const today = hoy.toISOString().substr(0, 10);
            const todayArray = today.split('-');
            const yesterday = new Date(`${hoy.toISOString().substr(0, 10)} 06:00`)
            const arraySemanal = [0,1,2,3,4,5,6].map((i) => new Date(yesterday.getTime()- i*milisegundosDay).toISOString().substr(0, 10)).reverse()
            const arrayWeek= arraySemanal.map((day) =>{
                const date= day.split('-');
                return `${date[2]}/${date[1]}/${date[0]}`;
            })
         return{
             call: {},
             indicatorsByTeam:[],
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
            ],
            calidad: [],
            arrayWeek,
            tipificacionesByWeek: [],
            agendadosByWeek: [],
            aptosByWeek: [],
            reasonsNoAptos: [],
            clasificationReasonNoAptos: {
            },
            date: '',
         }
     },
     components:{
        HomeIndicatorsTeam,
        RecruiterTable,
        Doughnut,
        LineGraphic,
        ReasonsNoAptos
     },
     watch: {
        reasonsNoAptos(){
            this.clasificationReasonNoAptos = [
            {text: 'Por Requisitos                ' , icon: 'requisitos.svg',
             value:  this.reasonsNoAptos.filter((r) => r === 'Por Requisitos').length},
            {text: 'No cumple con las competencias' ,icon: 'noOk.svg',
             value:  this.reasonsNoAptos.filter((r) => r === 'No cumple con las competencias').length},
            {text: 'No cumple requerimientos técnicos' , icon: 'config.svg',
            value:  this.reasonsNoAptos.filter((r) => r === 'No cumple requerimientos técnicos').length},
            {text: 'No disponibilidad de horarios' , icon: 'clock.svg',
            value:  this.reasonsNoAptos.filter((r) => r === 'No disponibilidad de horario').length},
            {text: 'Mala Actitud                ' , icon: 'bad.svg',
            value:  this.reasonsNoAptos.filter((r) => r === 'Mala actitud').length},
            {text: 'Otros                       ' , icon: 'question.svg',
            value: this.reasonsNoAptos.filter((r) => r === 'Otros (especificar)').length} ,
            ]
        }
    },
     methods:{
         weekData(callId){
             getProgramedInterviewsByCall(callId)
                .then( interviewsByCall => {
                    if(!!interviewsByCall.val()){
                        const byWeek = this.arrayWeek.map((day) => Object.values(interviewsByCall.val()).filter((e) => e.fechaEntrevista === day))
                        this.tipificacionesByWeek = byWeek.map((int) => int.length)
                        ///
                        byWeek.map((intsByDay,index)=> {
                          
                        // Por rango de fecha devuelve un array de evaluaciones
                            const promises = intsByDay.map( (obj, i) => getProgramedEvaluationByIdPostulant(obj.id_postulante)
                                .then(programedEvaluation =>!!programedEvaluation.val()? {... programedEvaluation.val() , fechaEntrevista: obj.fechaEntrevista}: 'No evaluacion'
                                    ))
                                    Promise.all(promises)
                                    .then(programedEvaluations => {
                                        const states = programedEvaluations.map(e => !(e==='No evaluacion')? Object.values(e)[0].estado: 'No evaluacion')
                                        const evaluation = states.filter((state) => state !== 'No evaluacion').length
                                        const aptos = states.filter((state) => state === 'APTO').length
                                        const objNoAptos = programedEvaluations.filter(e => Object.values(e)[0].estado === 'NO APTO');
                                        // const reasonsNoAptos = objNoAptos.map((noApto) => (Object.values(noApto)[0].itemNoApto === undefined)? 'Otros (especificar)': Object.values(noApto)[0].itemNoApto);
                                        // this.reasonsNoAptos = this.reasonsNoAptos.concat(reasonsNoAptos);
                                        this.agendadosByWeek[index]= evaluation;
                                        this.aptosByWeek[index]= aptos
                                    })
                        })
                    } 
                })
         }
     },
     created() {
        this.call= this.$route.query;
        this.date = this.$route.query.fecha;
        const agendados = Number(this.call.scheduled);
        const tipificaciones =Number(this.call.tipification);
        const noSePresento = Number(this.call.noSePresento);
        const aptos = Number(this.call.aptos);
        const noAptos = Number(this.call.noAptos)
        const rechazaPropuesta = Number(this.call.rechazaPropuesta);
        this.indicatorsByTeam =[{
            img:'management.svg',
            title: 'Productividad',
            percentage: (tipificaciones!==0)? Math.round(agendados/tipificaciones*10000)/100:0,
            update: this.arrayWeek[6] ,
        },{
            img:'video-calling.svg',
            title: 'Presentismo',
            percentage: agendados!==0? Math.round((1-(noSePresento/agendados))*10000)/100:0,
            update: this.arrayWeek[6],
        },
        {
            img:'vote.svg',
            title: 'Calidad',
            percentage: agendados!==0? Math.round(aptos/agendados*10000)/100:0,
            update: this.arrayWeek[6],
        }]
        this.calidad = [aptos, noSePresento, rechazaPropuesta,noAptos ];
        this.reasonsNoAptos = this.call.reasonsNoAptos;
        this.weekData(this.call.callId)
    },
    }
</script>

<style lang="scss" scoped>
</style>