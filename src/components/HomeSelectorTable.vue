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
            <span>Equipo Selector</span> 
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
        :items="interviewsBySelector"
        :items-per-page="interviewsBySelector.length"
        hide-default-footer
        item-key="name"
        class="elevation-1 rounded-0 my-3 mx-1"
        >
        </v-data-table>
        <!-- <CallDetail/> -->
    </v-card>
</template>

<script>
import {compareDate } from '../utils/hour'
import { getProgramedEvaluationByIdPostulant } from '../firebase/evaluationMethods';
import { getProgramedInterviewsBySelector } from '../firebase/interviewMethods';
import { getUsersByRole, getUser } from '../firebase/userMethods';

    export default {
        props:["dateEnd", "dateOld", "loadingTable","searchAgain","getSelectorInfo"],
        data(){
            return{
                interviewsBySelector:[],
                total:{
                    scheduled: 0,
                    interviewed: 0,
                    aptos: 0,
                },
                productivity:{
                    aptos: 0,
                    noSePresento: 0,
                    rechazaPropuesta : 0,
                    noApto :0,
                },
                headers: [
                    {
                    text: 'Nombres y apellidos',
                    align: 'start',
                    value: 'selector',
                    },
                    { text: 'Agendados', value: 'scheduled' },
                    { text: 'Entrevistados', value: 'interviewed' },
                    { text: 'Aptos', value: 'aptos' },
                    { text: 'Productividad', value: 'productivity'},
                ],
            }
            
        },
        watch:{
            searchAgain(){
                this.selectors('Call/Selector');
                this.selectors('Selector');
            }
        },
        created() {
            this.selectors('Call/Selector');
            this.selectors('Selector');
        },
        methods:{
            addZeroInterviewsSelector(name){
                this.interviewsBySelector.push({
                    selector: name,
                    scheduled: 0,
                    interviewed: 0,
                    aptos: 0,
                    productivity: '0%',
                    noAptos: 0,
                    noSePresento: 0,
                    rechazaPropuesta: 0,
                })
            },
            async selectors(type){
                this.interviewsBySelector= [];
                this.total = {
                    scheduled: 0,
                    interviewed:0,
                    aptos: 0,
                };
                this.productivity= {
                    aptos: 0,
                    noSePresento: 0,
                    rechazaPropuesta : 0,
                    noApto :0,
                };
                const postlulantIds = getUsersByRole(type)
                .then(  user =>  {
                    console.log(Object.values(user.val()));
                    const promises =  Object.keys(user.val())
                    .forEach(callId => {
                    getUser(callId)
                    .then( user => `${user.name} ${user.lastName}`)
                    .then(  async name =>  await getProgramedInterviewsBySelector(name)
                        .then( async intsBySelectorName => {
                            if(!!intsBySelectorName.val()){
                            const byDaysAgo = Object.values(intsBySelectorName.val()).filter((e) => 
                                compareDate(e.fechaEntrevista, this.dateOld) && compareDate(this.dateEnd, e.fechaEntrevista))
                                if(byDaysAgo.length !== 0) {
                                 const promises = await byDaysAgo.map( (obj, i) => getProgramedEvaluationByIdPostulant(obj.id_postulante)
                                    .then(programedEvaluation =>!!programedEvaluation.val()? {... programedEvaluation.val() , fechaEntrevista: obj.fechaEntrevista}: 'No evaluacion'
                                    ))
                                    Promise.all(promises)
                                    .then(programedEvaluations => {
                                        const states = programedEvaluations.map(e => !(e==='No evaluacion')? Object.values(e)[0].estado: 'No evaluacion')
                                        const scheduled = states.filter((state) => state !== 'No evaluacion')
                                        const aptos = states.filter((state) => state === 'APTO')
                                        const noSePresento = states.filter((state) => state === 'No se presentó')
                                        const entrevistados = scheduled.length - noSePresento.length
                                        const rechazaPropuesta = states.filter((state) => state === 'Rechaza Propuesta')
                                        const noApto = states.filter((state) => state === 'NO APTO')
                                        const productivity = !!scheduled.length? Math.round(aptos.length*10000/entrevistados)/100 : 0
                                        if(states.length!==0){
                                        // total ---------
                                        this.total.aptos += aptos.length
                                        this.total.scheduled += scheduled.length
                                        this.total.interviewed += entrevistados
                                        // convertion ------
                                        this.productivity.aptos += aptos.length
                                        this.productivity.noSePresento += noSePresento.length
                                        this.productivity.rechazaPropuesta += rechazaPropuesta.length
                                        this.productivity.noApto += noApto.length
                                        // indicators-------
                                        // this.indicatorsByTeam[0].percentage = Math.round(this.total.scheduled/this.total.tipification*10000)/100
                                        // this.indicatorsByTeam[1].percentage = Math.round((1-(this.convertion.noSePresento/this.total.scheduled))*10000)/100
                                        // this.indicatorsByTeam[2].percentage = Math.round(this.total.aptos/this.total.scheduled*10000)/100
                                        this.getSelectorInfo(this.total.aptos,this.total.interviewed)
                                        this.interviewsBySelector.push({
                                            selector: name,
                                            scheduled: scheduled.length,
                                            interviewed: entrevistados,
                                            productivity: `${productivity }%`,
                                            aptos: aptos.length,
                                            noAptos: noApto.length,
                                            noSePresento: noSePresento.length,
                                            rechazaPropuesta: rechazaPropuesta.length,
                                        })
                                        }
                                        
                                    })
                                }else{
                                    this.addZeroInterviewsSelector(name) 
                                }

                            }
                            else{
                                this.addZeroInterviewsSelector(name) 
                            }
                        
                        }))
                    }
                    )
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>