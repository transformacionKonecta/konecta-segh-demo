import firebase from "firebase";

export const createAccount = (name) => {
  const cuentaKey = firebase
    .database()
    .ref("CUENTAS")
    .push().key;
  firebase
    .database()
    .ref("CUENTAS")
    .child(cuentaKey)
    .set({
      nombreCuenta: name,
    });
};

export const readServices = async () => {
  let newServices = [];
  const services = await firebase
    .database()
    .ref("SERVICIOS")
    .once("value");
  services.forEach((element) => {
    newServices.push({
      idService: element.key,
      ...element.val(),
    });
  });
  return newServices;
};

export const createService = (data) => {
  const serviceKey = firebase
    .database()
    .ref("SERVICIOS")
    .push().key;
  firebase
    .database()
    .ref("SERVICIOS")
    .child(serviceKey)
    .set(data);
};

export const readAccounts = async () => {
  let newAccounts = [];
  const accounts = await firebase
    .database()
    .ref("CUENTAS")
    .once("value");
  accounts.forEach((element) => {
    newAccounts.push({
      idCuenta: element.key,
      nombreCuenta: element.val().nombreCuenta,
    });
  });
  return newAccounts;
};

export const updateService = (id, data) => {
  firebase
    .database()
    .ref("SERVICIOS")
    .child(id)
    .update(data);
};

export const deleteService = (id) => {
  firebase
    .database()
    .ref("SERVICIOS")
    .child(id)
    .remove();
};
