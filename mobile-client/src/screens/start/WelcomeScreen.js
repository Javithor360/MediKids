//>> import
import { useState } from 'react';
import { BackHandler, Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { CustomButton } from '../../index';
import Constans from 'expo-constants'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { isIOS, isAN } from '../../constants';
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { MaterialIcons } from '@expo/vector-icons'; 
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

//>> constants
const { height } = Dimensions.get('window');

export const WelcomeScreen = () => {
  const navigation = useNavigation()
  const [lngModal, setLngModal] = useState(false);
   const { t } = useTranslation();
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
      <TouchableOpacity activeOpacity={0.5} style={styles.buttomCameBack} onPress={() => setLngModal(true)}>
          <MaterialIcons name="language" size={17} color="white" />
          <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>{t('welcomeScn.language_title')}</Text>
      </TouchableOpacity>
      <Modal 
        animationType='fade'
        transparent
        visible={lngModal}
      >
        <LanguageSelector closeModal={() => setLngModal(false)}/>
      </Modal>
      <SafeAreaView>
        <View>
          <ImageBackground style={styles.image} source={require('../../../assets/logos/adaptive-icon.png')} resizeMode='contain' />
        </View>
        <View style={styles.hr} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {t('welcomeScn.main_title')}
          </Text>
          <Text style={styles.paragrhap}>
            {t('welcomeScn.main_description')}
          </Text>
        </View>
        <View style={{...styles.hr, ...styles.hr2}} />
        <View style={styles.buttonView}>
          <CustomButton
            bgColor={'#A375FF'}
            paddingV={12}
            paddingH={0}
            marginH={0}
            marginV={7}
            width={'100%'}
            height={90}
            BorderRadius={10}
            fontFamily={'poppinsBold'}
            fontSize={20}
            textColor={'white'}
            Label={t('welcomeScn.login_btn')}
            handlePress={() => {navigation.navigate('LoginScreen');}}
            haveShadow={true}
          /> 

          <CustomButton 
            bgColor={'#fafafa'}
            paddingV={12}
            paddingH={0}
            marginH={0}
            marginV={7}
            width={'100%'}
            height={100}
            BorderRadius={10}
            fontFamily={'poppinsBold'}
            fontSize={20}
            textColor={'black'}
            Label={t('welcomeScn.register_btn')}
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
  buttomCameBack: {
    top: '5.4%',
    left: 15,
    backgroundColor: '#A375FF',
    position: 'absolute',
    borderRadius: 6,
    flexDirection: 'row',
    paddingHorizontal: 13,
    alignItems: 'center',
    paddingVertical: isIOS ? 6 : 0,
    zIndex: 2,
  },
  image: {
    height: isIOS ? height / 3 : height / 2.8 ,
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