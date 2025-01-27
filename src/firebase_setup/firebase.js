// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD6X8R2Qj_ltDr_soo-FYkUybvbVNbNGqs",
  authDomain: "soloway-dev-fd3d3.firebaseapp.com",
  projectId: "soloway-dev-fd3d3",
  storageBucket: "soloway-dev-fd3d3.appspot.com",
  messagingSenderId: "105570341540",
  appId: "1:105570341540:web:9afd7637123dd29e44cc31",
  measurementId: "G-7H534H1V60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);

// export const fetchTokenValue = () => {
//   return getToken(messaging, { vapidKey: 'BPvXGjA2SiJTdAvcAeMZXvufXYwV1fPK3HUT8P-VpN_9cyx2CrjMgshxut7sqR-NQXG7R-8R3J1n_ueuiTndWlo' }).then((currentToken) => {
//       if (currentToken) {
//           return currentToken;
//       } else {
//           return ""
//       }
//   }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//   });
// }

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//       onMessage(messaging, (payload) => {
//         resolve(payload);
//   });
// });

