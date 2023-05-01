import { ActivityIndicator, Image, Platform, StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import Lottie from 'lottie-react-native'
import { useNavigation } from "@react-navigation/native";
import { isIOS } from '../../constants';


export const SplashScreen = () => {

  const navigation = useNavigation();

  //>> Timer to show load the app
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('WelcomeScreen')
    }, 4000);
  }, []);

  return (
    <View style={styles.root}>
      <Image source={require('../../../assets//logos/adaptive-icon.png')} style={styles.imageStyle}/>
      {
        isIOS ? <ActivityIndicator size="large" color="#A375FF" style={{marginTop: 19}} />
        :
        <Lottie source={require('../../../assets/loader.json')} loop speed={0.75} autoPlay style={styles.animationStyle} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  animationStyle: {
    marginTop: '34%',
  }
})