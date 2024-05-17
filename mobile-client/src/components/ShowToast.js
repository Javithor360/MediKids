import { Toast } from 'react-native-toast-message/lib/src/Toast'

//! Show the Emergent Message (toast).

export const ShowToast = (type, text1, text2) => {
  return (
    Toast.show({
      type:type,
      text1:text1,
      text2:text2,
      duration: 4000
    })
  )
}
