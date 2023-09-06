import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid'

const firebaseConfig = {
  apiKey: "AIzaSyAsJOMIOpLYJ7Atn3tBenHaLTag13N9oLs",
  authDomain: "medikids-firebase.firebaseapp.com",
  projectId: "medikids-firebase",
  storageBucket: "medikids-firebase.appspot.com",
  messagingSenderId: "179475869697",
  appId: "1:179475869697:web:f966d2de80c35002a3d000"
};

const appFirebase = initializeApp(firebaseConfig);
export const fireStorage = getStorage(appFirebase);

export const uploadFile = async (imageUri, file) => {
  const name = uuid.v4();
  const res = await fetch(imageUri);
  const blob = await res.blob();

  const storageRef = ref(fireStorage, `${file}/${name}`);
  await uploadBytes(storageRef, blob);
  return name;
}