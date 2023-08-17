import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'

//* Function to handle the label animation.

export const SetLabel = ({isLoading, Success, LabelText}) => {
  if(isLoading){
    //? Loading Animation
    return <ActivityIndicator color='white' />
  } else if(!isLoading && Success){ 
    //? Success Label
    return <><Entypo name="check" size={24} color="white" /><Text>Completado</Text></>
  } else if(!isLoading && !Success){
    //? Default Label
    return LabelText
  }
}