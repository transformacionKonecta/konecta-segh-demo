import firebase from "firebase";

export const getProgramedInterviewsByCall= (idCall) => 
firebase
.database()
.ref("ENTREVISTA_PROGRAMADA")
.orderByChild("id_call").equalTo(idCall)
.once("value");

export const getProgramedInterviewsBySelector= async () => 
await firebase
.database()
.ref("ENTREVISTA_PROGRAMADA")
.once("value");