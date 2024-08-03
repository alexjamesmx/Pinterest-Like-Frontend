// src/firebase-messaging-sw.template.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "%%REACT_APP_FIREBASE_API_KEY%%",
  authDomain: "%%REACT_APP_FIREBASE_AUTH_DOMAIN%%",
  projectId: "%%REACT_APP_FIREBASE_PROJECT_ID%%",
  storageBucket: "%%REACT_APP_FIREBASE_STORAGE_BUCKET%%",
  messagingSenderId: "%%REACT_APP_FIREBASE_MESSAGING_SENDER_ID%%",
  appId: "%%REACT_APP_FIREBASE_APP_ID%%",
  measurementId: "%%REACT_APP_FIREBASE_MEASUREMENT_ID%%",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
