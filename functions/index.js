const functions = require("firebase-functions");
require("dotenv").config();
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
require("dotenv").config();

const { EMAIL, PASSWORD } = process.env;

exports.sendEmailPostulante = functions.database
  .ref("/POSTULANTES/{uid}")
  .onCreate((snap, ctx) => {
    const val = snap.val();
    console.log(val);
    let authData = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    authData
      .sendMail({
        from: "vivekonecta@grupokonecta.com",
        to: `${val.correo}`,
        subject: "PROCESO DE SELECCIÓN KONECTA",
        html: `<html>
            	<p>
            	Hola ${val.nombres} ¡Muchas gracias por iniciar tu proceso con nosotros! Nos estaremos comunicando contigo para programar la cita.</p>
            	</br>
            	<p> Saludos </p>
            	</br>
            	<p>Gestión Humana</p>
            	<p>Konecta Perú</p>
            </html>`,
      })
      .then((res) => console.log("Correo enviado exitosamente"))
      .catch((err) => console.log(err));
  });

exports.sendEmailPostulanteNoApto = functions.database
  .ref("/EVALUACION_PROGRAMADA/{uid}")
  .onCreate((snap, ctx) => {
    const val = snap.val();
    console.log(val);
    var fullName = val.nombres;
    var separa = fullName.split(" ");
    var nombre = separa[0];
    if (val.estado === "NO APTO") {
      let authData = nodemailer.createTransport({
        service: "gmail", //smtp.gmail.com  //in place of service use host...
        secure: false, //true
        port: 25, //465
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      authData
        .sendMail({
          from: "vivekonecta@grupokonecta.com",
          to: `${val.correo}`,
          subject: "ENTREVISTA KONECTA",
          html: `<html>
                <p>
                Hola ${nombre} Queremos agradecerte por participar en todo el proceso de selección. En este momento no tenemos una campaña que se ajuste a tu perfíl, pero ya estás registrado/a con nosotros y esperamos que pronto seas parte de esta gran familia.</p>
                </br>
                <p> Saludos </p>
                </br>
                <p>Gestión Humana</p>
                <p>Konecta Perú</p>
                </html>`,
        })
        .then((res) => console.log("Correo enviado exitosamente"))
        .catch((err) => console.log(err));
    }
  });

exports.sendEmailEntrevistaUpdate = functions.database
  .ref("/ENTREVISTA_PROGRAMADA/{uid}")
  .onUpdate((change, ctx) => {
    const val = change.after.val();
    console.log(val);
    var fullName = val.nombres;
    var separa = fullName.split(" ");
    var nombre = separa[0];
    let authData = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    authData
      .sendMail({
        from: "vivekonecta@grupokonecta.com",
        to: `${val.correo}, ${val.correoEntrevistador}`,
        subject: "ENTREVISTA KONECTA REPROGRAMADA",
        html: `<html>
                <p>
                Hola ${nombre} Queremos comunicarte que tu entrevista a sido reprogramada para el día ${val.fechaEntrevista} a las: ${val.horaEntrevista} </p>
								<a href="${val.meetLink}"> LINK DE LA VIDEOLLAMADA </a>
								<p>${val.meetLink}</p>
                </br>
                <p> Saludos </p>
                </br>
                <p>Gestión Humana</p>
                <p>Konecta Perú</p>
                </html>`,
      })
      .then((res) => console.log("Correo enviado exitosamente"))
      .catch((err) => console.log(err));
  });


  exports.sendEmailMassive = functions.database
    .ref("/FORMACION/{uid}")
    .onCreate((snap, ctx) => {
      
    const val = snap.val();
    console.log(val);
      let authData = nodemailer.createTransport({
        service: "gmail", //smtp.gmail.com  //in place of service use host...
        secure: false, //true
        port: 25, //465
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      authData
        .sendMail({
          from: "vivekonecta@grupokonecta.com",
          to: `${val.arrayEmails.toString()}`,
          subject: "ENTREVISTA KONECTA",
          html: `<html>
                <p>
                  Felicidades has pasado a la etapa de formación, ahora ya eres parte de esta gran familia. Tu capacitación iniciará el día ${val.fecCapProceso}</p>
                </br>
                <p> Saludos </p>
                </br>
                <p>Gestión Humana</p>
                <p>Konecta Perú</p>
                </html>`,
        })
        .then((res) => console.log("Correos enviado exitosamente"))
        .catch((err) => console.log(err));
});

/* exports.sendEmailMassiveFormacion = functions.database
  .ref("/POSTULANTES/{uid}")
  .onUpdate((change, ctx) => {
    const val = change.after.val();
    console.log(val);
    var fullName = val.nombres;
    var separa = fullName.split(" ");
    var nombre = separa[0];
    let authData = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    authData
      .sendMail({
        from: "vivekonecta@grupokonecta.com",
        to: `${val.correo}`,
        subject: "ETAPA FORMACIÓN",
        html: `<html>
                <p>
                Hola ${nombre}. Queremos agradecerte por participar en todo el proceso de selección. Y queremos informarte que has pasado a la etapa de formación, se te estará comunicando el día de Inicio de tus capacitaciones.</p>
                </br>
                <p> Saludos </p>
                </br>
                <p>Gestión Humana</p>
                <p>Konecta Perú</p>
                </html>`,
      })
      .then((res) => console.log("Correo enviado exitosamente"))
      .catch((err) => console.log(err));
  }); */
