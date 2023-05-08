import { Text, View } from "react-native"
import { BaseToast, ErrorToast } from "react-native-toast-message"

export const toastConfig = {
  success: (props) => {
    <BaseToast 
      {...props}
      style={{borderLeftColor: '#A375FF'}}
      text1Style={{
        fontSize: 17,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  },
  error: (props) => {
    <ErrorToast 
        {...props}
        text1Style={{
          fontSize: 17,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 15
        }}
    />
  },
  tomatoToast: ({ text1, text2 }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{text2}</Text>
    </View>
  )
}