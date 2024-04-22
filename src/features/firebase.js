import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCGaI_9Ze_rV9fcKBMPAVt19GHpev_609g",
    authDomain: "discord-clone-759b2.firebaseapp.com",
    projectId: "discord-clone-759b2",
    storageBucket: "discord-clone-759b2.appspot.com",
    messagingSenderId: "1097996133075",
    appId: "1:1097996133075:web:b45decd86085a8dd826a26"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {auth};
export default db;