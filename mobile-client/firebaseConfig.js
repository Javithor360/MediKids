import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid'

const firebaseConfig = {
  apiKey: "AIzaSyBgF3JdVnTVC8ABW7cl01GCrv91ypLwT48",
  authDomain: "medikids-b1d14.firebaseapp.com",
  projectId: "medikids-b1d14",
  storageBucket: "medikids-b1d14.appspot.com",
  messagingSenderId: "517626119973",
  appId: "1:517626119973:web:f6cc9a73bf16da41367ccc"
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