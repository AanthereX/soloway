importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD6X8R2Qj_ltDr_soo-FYkUybvbVNbNGqs",
  authDomain: "soloway-dev-fd3d3.firebaseapp.com",
  projectId: "soloway-dev-fd3d3",
  storageBucket: "soloway-dev-fd3d3.appspot.com",
  messagingSenderId: "105570341540",
  appId: "1:105570341540:web:9afd7637123dd29e44cc31",
  measurementId: "G-7H534H1V60",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
