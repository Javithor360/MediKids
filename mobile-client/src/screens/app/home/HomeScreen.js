import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {CustomButton} from '../../../index'
import { useNavigation } from '@react-navigation/native'

export const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <Text>HomeApp</Text>
      <View style={styles.buttonView}>
        <CustomButton 
          bgColor={'#fafafa'}
          paddingV={15}
          paddingH={20}
          marginH={0}
          marginV={0}
          width={200}
          height={100}
          BorderRadius={10}
          fontFamily={'poppinsBold'}
          fontSize={20}
          textColor={'black'}
          Label={"Otra Screen"}
          handlePress={() => {navigation.navigate('Other');}}
          haveShadow={true}
        /> 
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttonView: {
    paddingHorizontal: 20,
    height: '30%',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'center',
  }
})