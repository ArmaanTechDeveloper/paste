
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcG3i4nt_Q0tPAKXRTX7n7VXETpslG49Q",
  authDomain: "get-lab-code.firebaseapp.com",
  projectId: "get-lab-code",
  storageBucket: "get-lab-code.appspot.com",
  messagingSenderId: "67910285750",
  appId: "1:67910285750:web:69ebb2511df96f4670a917"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const POSTcode = async (title , code) => {
    await addDoc(collection(db , "codes"), {
        title,
        code,
        createdAt: Timestamp.now()
    })
    console.log(`Document written successfully at ${Date.now()}`)
}

export const GETcode = async(setData) => {
    const querySnapshot = await getDocs(collection(db , "codes"))
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    })

    setData(data)
}