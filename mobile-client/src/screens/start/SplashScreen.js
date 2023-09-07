
//>> Importing libraries
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import Lottie from 'lottie-react-native'
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';

//>> Importing Components
import { isIOS } from '../../constants';
import { ChangeSBColor } from '../../store/slices/starterSlice';

export const SplashScreen = () => {
  const State = useSelector(state => state.starter.State);
  const Responsible = useSelector(state => state.responsible);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  //>> Navigation to the corresponding component.
  useEffect(() => {
    if(State !== null && Responsible !== null) {
      setTimeout(() => {
        if (!State) {
          navigation.navigate('WelcomeScreen');
        } else if (Responsible.Email_Verify_code != null) {
          navigation.replace('SplashVerifyCode', {goDash: true, goSP: Responsible.ProfilePhotoUrl == 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216' ? true : false});
        } else if (Responsible.ProfilePhotoUrl == 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216') {
          navigation.replace('SplashSelectProfilePhoto', {haveButton: false, goDash: true});
        } else if(State) {
          navigation.replace('SelectPatientScreen');
        }
        dispatch(ChangeSBColor('#e4e2ff'))
      }, 4000);
    }
  }, [State, Responsible]);

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
    backgroundColor: '#fff'
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