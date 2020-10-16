import firebase from "firebase";

export const createRegisterReferrals = (data) => {
  console.log(data);
  const referidoKey = firebase
    .database()
    .ref("REFERIDOS")
    .push().key;
  firebase
    .database()
    .ref("REFERIDOS")
    .child(referidoKey)
    .set(data);
};

export const readReferrals = async () => {
  let newReferrals = [];
  const referrals = await firebase
    .database()
    .ref("REFERIDOS")
    .once("value");
  referrals.forEach((element) => {
    newReferrals.push({
      idReferral: element.key,
      ...element.val(),
    });
  });
  return newReferrals;
};


export const createRegisterReferralsIndividual = (data) => {
  console.log(data);
  const referidoKey = firebase
    .database()
    .ref("INDIVIDUALES")
    .push().key;
  firebase
    .database()
    .ref("INDIVIDUALES")
    .child(referidoKey)
    .set(data);
};

export const readReferralsIndividuals = async () => {
  let newReferrals = [];
  const referrals = await firebase
    .database()
    .ref("INDIVIDUALES")
    .once("value");
  referrals.forEach((element) => {
    newReferrals.push({
      idReferral: element.key,
      ...element.val(),
    });
  });
  return newReferrals;
};