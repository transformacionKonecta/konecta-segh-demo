import firebase from "firebase";

export const getProfiles = ()=> {
  const db = firebase.database();
  const ref = db.ref("PROFILES");
  let profiles = [];
  ref.on("value", function(querySnapshot) {
    querySnapshot.forEach(function(datoSnapshot) {
      profiles.push(datoSnapshot.val().name);
    });
  });
  return profiles;
}

export const getIgcByName = async(name) => {
  let dataIgc = [];
  const db = firebase.database();
  const ref = db.ref("DATOS_PROCESO_IGC");
  let snap = await ref
    .orderByChild("nombreIgc")
    .equalTo(name)
    .once("value")
  snap.forEach((elem) => {
      dataIgc.push({ ...elem.val(), id_igc: elem.key });
    });
  return dataIgc;
}