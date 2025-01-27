import { ref, getDatabase, push, onValue } from "firebase/database";
import { app } from "../firebase_setup/firebase";
const db = getDatabase(app);

export const Firebase = {
  sendProjectMessage: async function (params) {
    push(ref(db, `projects/${params?.pId}/messages`), params);
  },
  getProjectMessages: async function (pId, setMessages) {
    onValue(ref(db, `projects/${pId}/messages`), (snapshot) => {
      let data = [];
      snapshot.forEach((item) => {
        data.push({
          ...item.val(),
          messageId: item.key,
        });
      });
      setMessages(data);
    });
  },
  sendProjectTaskMessage: async function (params) {
    push(
      ref(db, `projects/${params?.pId}/tasks/${params?.tId}/messages`),
      params
    );
  },
  getProjectTaskMessages: async function (pId, tId, setMessages) {
    onValue(ref(db, `projects/${pId}/tasks/${tId}/messages`), (snapshot) => {
      let data = [];
      snapshot.forEach((item) => {
        data.push({
          ...item.val(),
          messageId: item.key,
        });
      });
      setMessages(data);
    });
  },
};
