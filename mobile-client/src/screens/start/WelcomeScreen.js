//>> import
import { BackHandler, Dimensions, Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View,  } from 'react-native'
import { CustomButton } from '../../index';
import Constans from 'expo-constants'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { isIOS, navBarHeight } from '../../constants';

//>> constants
const { height } = Dimensions.get('window');

export const WelcomeScreen = () => {
  const navigation = useNavigation()

  //>> Aviod Come Back
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      //! Close the app.
      BackHandler.exitApp();
    })
  }, [navigation]);

  return (
    <>
      <View style={styles.imageBgView}>
        <ImageBackground style={styles.imageBg} source={require('../../../assets/waves/waves_start_top.png')} resizeMode='contain' />
      </View>
      <SafeAreaView>
        <View>
          <ImageBackground style={styles.image} source={require('../../../assets/logos/adaptive-icon.png')} resizeMode='contain' />
        </View>
        <View style={styles.hr} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            ¡La mejor atención para los pequeños!
          </Text>
          <Text style={styles.paragrhap}>
            MediKids te ofrece la mejor calidad de atención medica especializada en pediatría.
          </Text>
        </View>
        <View style={{...styles.hr, ...styles.hr2}} />
        <View style={styles.buttonView}>
          <CustomButton
            bgColor={'#A375FF'}
            paddingV={15}
            paddingH={20}
            marginH={0}
            marginV={8}
            width={'100%'}
            height={90}
            BorderRadius={10}
            fontFamily={'poppinsBold'}
            fontSize={20}
            textColor={'white'}
            Label={"Iniciar Sesión"}
            handlePress={() => {navigation.navigate('LoginScreen');}}
            haveShadow={true}
          /> 

          <CustomButton 
            bgColor={'#fafafa'}
            paddingV={15}
            paddingH={20}
            marginH={0}
            marginV={8}
            width={'100%'}
            height={100}
            BorderRadius={10}
            fontFamily={'poppinsBold'}
            fontSize={20}
            textColor={'black'}
            Label={"Registrarse"}
            handlePress={() => {navigation.navigate('RegisterScreen');}}
            haveShadow={true}
          /> 
        </View>
      </SafeAreaView>
      <View style={styles.imageBgViewBtn}>
        <ImageBackground style={styles.imageBg} source={require('../../../assets/waves/waves_start_buttom.png')} resizeMode='contain' />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    height: isIOS ? height / 3 : height / 2.5 ,
    marginTop: isIOS ? '5%' : '15%',
  },
  imageBg:{
    flex: 1,
    position: 'relative',
    height: 100,
    marginTop: -10,
  },
  imageBgView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Constans.statusBarHeight,
    zIndex: -1,
  },
  imageBgViewBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Constans.statusBarHeight,
    paddingBottom: 80,
    zIndex: -1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  }, 
  title: {
    fontSize: 32,
    color: '#A375FF',
    fontFamily: 'poppinsBold',
    textAlign: 'center'
  },
  hr: {
    width: '80%',
    height: '1%',
    backgroundColor: '#D8D7FE',
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 3,
    marginHorizontal: '10%',
  },
  hr2: {
    marginTop: 30
  },
  paragrhap: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'poppinsRegular',
    textAlign: 'center',
    marginTop: isIOS ? 20 : 0,
  },
  buttonView: {
    paddingHorizontal: 20,
    paddingVertical: isIOS ? '4%' : '6%',
    height: '25%',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'center',
  }
})