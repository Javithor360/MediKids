import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid'

const firebaseConfig = {
  apiKey: "AIzaSyDs-GPoEVQu_moCWRtMYQqeoufG9ikYn4s",
  authDomain: "medikids-d9650.firebaseapp.com",
  projectId: "medikids-d9650",
  storageBucket: "medikids-d9650.appspot.com",
  messagingSenderId: "380098976169",
  appId: "1:380098976169:web:535243cac8b15bc78d4cb8"
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