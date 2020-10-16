import firebase from "firebase";

export async function getUser(UID) {
  const snapshot = await firebase.database().ref("USERS/" + UID).once('value')
return snapshot.val();
}

export const getUserData = (userId) => {
  console.log(userId);
  let userData = [];
  firebase
    .database()
    .ref("USERS/" + userId)
    .once("value", (snap) => {
      userData.push({datosUser:snap.val()});
    });
  return userData;
};

export const getUsersByRole= (role) => 
  firebase
  .database()
  .ref("USERS")
  .orderByChild("userRole").equalTo(role).once("value");


  export async function getAllUser() {
    const snapshot = await firebase
      .database()
      .ref("USERS")
      .once("value")
    return snapshot;
  };
  