import React, {useEffect} from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { onMessageListener } from "./firebase_setup/firebase";

function App() {
  const user = JSON.parse(localStorage.getItem("user"))?.role;
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  //   onMessageListener().then(payload => {
  //     const options = {
  //       icon: "http://soloway-develop-web.s3-website-us-east-1.amazonaws.com/images/logo.PNG",
  //       body: payload?.notification?.body,
  //       dir: "ltr"
  //     };
  //     console.log(payload)
  //     new Notification(payload?.notification?.title, options);
  //   }).catch(err => console.log('failed: ', err));
  // }, []);

  // useEffect(() => {
  //   if (!("Notification" in window)) {
  //     console.log("Browser does not support desktop notification");
  //   } else {
  //     Notification.requestPermission();
  //   }
  // }, [])

  return (
    <div>
      <main>{user === "admin" ? <AdminRoutes /> : <UserRoutes />}</main>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
