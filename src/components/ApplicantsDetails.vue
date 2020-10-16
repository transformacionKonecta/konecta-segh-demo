<template>
<v-container >
  <v-row>
      <v-col class="mb-2 pb-0">
        <h1 class="headline font-weight-bold mb-3">Perfil postulante</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <a class="teal--text subtitle-1 font-weight-bold" @click="$router.go(-1)">
        <v-icon>keyboard_arrow_left</v-icon>Regresar
      </a>
    </v-row>
  <div class="mt-4">
    <v-card width="800" outlined>
        <v-row class="ml-2 mt-2">
          <v-col cols="12" sm="12" md="12">
            <p
              class="title mb-1"
            >{{applicant.NOMBRES_APELLIDOS}}</p>
            <p class="text--primary font-weight-bold">Nro Doc: {{applicant.NUM_DOC}}</p>
          </v-col>
        </v-row>
        <v-tabs background-color="white" class="px-4" :grow="true">
          <v-tabs-slider color="teal"></v-tabs-slider>
          <v-tab class="text-capitalize">Perfil del Postulante</v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p class="title black--text mb-1">Datos Personales y de Contacto</p>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      label="Teléfono:"
                      v-model="applicant.TELEFONO"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      label="Correo:"
                      v-model="applicant.CORREO"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      label="Estado Civil:"
                      v-model="applicant.EST_CIVIL"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      label="Fecha de Nacimiento:"
                      v-model="applicant.FEC_NACIMIENTO"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      label="Género:"
                      v-model="applicant.GENERO"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      readonly
                      hide-details
                      label="Dirección:"
                      v-model="applicant.DIRECCION"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <p class="title black--text pt-4 mb-1">Datos de Formación</p>
                <v-row v-for="(item) in applicant.FORMACION" v-bind:key="item.id">
                <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="item.datosFormacion.grado_formacion"
                  readonly
                  label="Grado de Formación:"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="item.datosFormacion.institucion"
                  readonly
                  label="Institución:"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="item.datosFormacion.estado_estudios"
                  readonly
                  label="Estado de estudio:"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
                class="py-0"
                v-if="item.datosFormacion.horario_estudio"
              >
                <v-text-field
                  v-model="item.datosFormacion.horario_estudio"
                  readonly
                  label="Horario de estudio:"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
                class="py-0"
                v-if="item.datosFormacion.grado_formacion !== 'Secundaria'"
              >
                <v-text-field
                  v-model="item.datosFormacion.rubro_carrera"
                  readonly
                  label="Rubro de carrera:"
                ></v-text-field>
              </v-col>
                </v-row>
                <p class="title black--text pt-4 mb-1">Datos de Experiencia</p>
                <!-- **************************************************** -->
              <div v-for="(item, indexOf) in applicant.EXPERIENCIA" v-bind:key="item.id">
              <div v-if="item.datosExperiencia !== undefined">
                <!-- <p>{{item}}</p> -->
                <v-row
                  v-if="item.datosExperiencia.flag_se !== '1' && item.datosExperiencia.flag_se !== undefined"
                >
                  <p
                    class="subtitle-2 font-weight-bold pl-3 teal--text mb-1 pt-2 pb-0"
                  >Experiencia N° {{parseInt(indexOf) + 1}}</p>
                </v-row>
                <v-row
                  v-if="item.datosExperiencia.flag_se !== '1' && item.datosExperiencia.flag_se !== undefined"
                >
                  <v-col cols="12" sm="6" md="6" class="py-0">
                    <v-text-field
                      v-if="item.datosExperiencia.flag_ec === 1"
                      value="Call Center"
                      readonly
                      label="Tipo de Experiencia:"
                    ></v-text-field>
                    <v-text-field v-else value="Otros" hide-details label="Tipo de Experiencia:"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0">
                    <v-text-field
                      v-if="item.datosExperiencia.eo_empresa"
                      v-model="item.datosExperiencia.eo_empresa"
                      readonly
                      label="Empresa:"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      v-model="item.datosExperiencia.ec_empresa"
                      readonly
                      label="Empresa:"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    class="py-0"
                    v-if="item.datosExperiencia.ec_cliente"
                  >
                    <v-text-field
                      v-model="item.datosExperiencia.ec_cliente"
                      readonly
                      label="Cliente:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0">
                    <v-text-field
                      v-if="item.datosExperiencia.eo_rubro_empresa"
                      v-model="item.datosExperiencia.eo_rubro_empresa"
                      readonly
                      label="Rubro del Cliente:"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      v-model="item.datosExperiencia.ec_rubro_cliente"
                      readonly
                      label="Rubro del Cliente:"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    class="py-0"
                    v-if="item.datosExperiencia.ec_segmento"
                  >
                    <v-text-field
                      v-model="item.datosExperiencia.ec_segmento"
                      readonly
                      label="Segmento:"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="py-0">
                    <v-text-field
                      v-if="item.datosExperiencia.eo_tiempo_exp"
                      v-model="item.datosExperiencia.eo_tiempo_exp"
                      readonly
                      label="Tiempo de Experiencia (Meses):"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      v-model="item.datosExperiencia.ec_tiempo_exp"
                      readonly
                      label="Tiempo de Experiencia (Meses):"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12" sm="12" md="12" class="py-0">
                    <p>No cuenta con experiencia</p>
                  </v-col>
                </v-row>
              </div>
            </div>
                <!-- **************************************************** -->
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
  </div>
</v-container>
    
</template>

<script lang="ts">
  import Vue from 'vue'

export default {
  props: {
  id: {
    type: Number,
    required: true,
  },
  applicant: {
    type: Object,
    required: true
  }
  },
  data() {
    return {
      nombreIgc: ''
    }
  },
  mounted() {
    this.nombreIgc = localStorage.getItem('igc');
  },
  created() {

  },
}
</script>

<style scoped>

</style>