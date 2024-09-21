
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, orderBy, query, Timestamp, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcG3i4nt_Q0tPAKXRTX7n7VXETpslG49Q",
  authDomain: "get-lab-code.firebaseapp.com",
  projectId: "get-lab-code",
  storageBucket: "get-lab-code.appspot.com",
  messagingSenderId: "67910285750",
  appId: "1:67910285750:web:69ebb2511df96f4670a917"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const POSTcode = async (title , code) => {
    await addDoc(collection(db , "codes"), {
        title,
        code,
        createdAt: Timestamp.now()
    })
    console.log(`Document written successfully at ${Date.now()}`)
}

export const GETcode = async(setData , setLoading) => {
    setLoading(true)
    const querySnapshot = await getDocs(collection(db , "codes"))
    const data = []
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id , ...doc.data()})
    })

    setData(data)
    setLoading(false)
}

export const DELETEdoc = async(id , setData , setLoading) => {
    setLoading(true)
    const docRef = doc(db , "codes" , id)

    await deleteDoc(docRef)

    setLoading(false)
    GETcode(setData , setLoading)

}