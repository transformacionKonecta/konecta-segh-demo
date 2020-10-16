import firebase from "firebase";

export const getProgramedEvaluationByIdPostulant= async (idPostulant) => 
await firebase
.database()
.ref("EVALUACION_PROGRAMADA")
.orderByChild("id_postulante").equalTo(idPostulant)
.once("value");


export const getEvaluationByChild = (key, value) => {
  const db = firebase.database();
  const ref = db.ref("EVALUACION_PROGRAMADA");
  let postulanteEvaluacion = [];
  ref
    .orderByChild(key)
    .equalTo(value)
    .on("value", function(querySnapshot) {
      querySnapshot.forEach(function(datoSnapshot) {
        postulanteEvaluacion.push(datoSnapshot.val());
      });
    });
  return postulanteEvaluacion;
}

