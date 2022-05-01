import react from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from 'firebase.js';

const q= query(collection(db,"quiz_questions"));
const querySnapshot = await getDocs(q);
let r;
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  r=doc.data()
});
export {r};