"use strict";
//Firebase Messaging
// import firebase from "firebase/app";

importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAW_ZZ_j7WxxBoTEQwW104XvKU5MFHh-70",
    authDomain: "ticketer-3a2af.firebaseapp.com",
    projectId: "ticketer-3a2af",
    storageBucket: "ticketer-3a2af.appspot.com",
    messagingSenderId: "621638956569",
    appId: "1:621638956569:web:eb03f6a85dd6500047dc88",
  });
}
firebase.messaging();
//background notifications will be received here
firebase.messaging().onBackgroundMessage(async (message) => {
  if (Notification.permission === "granted") {
    if (navigator.serviceWorker)
      navigator.serviceWorker.getRegistration().then(async function (reg) {
        if (reg)
          await reg.showNotification(message.notification.title, {
            body: message.notification.body,
          });
      });
  }
});
