import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constans from 'expo-constants'
import { isIOS, isAN, navBarHeight } from '../../constants';
import { CustomButton } from '../../index';
const { height } = Dimensions.get('window');
export const LoginScreen = () => {
  const [text, setText] = useState('');
  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 3, position:'relative',}}>
        <View style={{flexDirection: 'column', position: 'relative',}}>
          <ImageBackground resizeMode='cover' style={styles.waveTop} source={require("../../../assets/waves/wave-top-login.png")}/> 
          <Text style={{ top: '50%', left: 20, position: 'absolute',}}>LOL</Text>
        </View>
        <View style={{flex:2, flexDirection: 'column',backgroundColor: '#fff', paddingHorizontal:'3%', paddingVertical:'3%'}} >
          <View style={{height: height / 1.5, flexDirection:'column', justifyContent:'flex-start', alignItems:'center', gap: 8 }} >
            <Image style={styles.Image} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={styles.Text}>¡Bienvenido!</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Contraseña"
              placeholderTextColor="gray"
            />
            <Text style={styles.TextP} onPress={()=>navigation.navigate('ForgotPassword') }>Olvidé mi contraseña</Text>
            
            <View style={styles.buttonView}>
              <CustomButton 
                bgColor={'#A375FF'}
                paddingV={0}
                paddingH={0}
                marginH={0}
                marginV={6}
                width={'100%'}
                height={'100%'}
                BorderRadius={10}
                fontFamily={'poppinsBold'}
                fontSize={16}
                textColor={'white'}
                Label={"Iniciar sesión"}
                handlePress={() => {navigation.navigate('RegisterScreen');}}
                haveShadow={true}
              /> 
            </View>
            <View style={styles.cont2} >
              <Text style={styles.TextCount}>¿No tienes una cuenta?</Text>
              <TouchableOpacity>
                <Text style={styles.TextReg} onPress={()=>navigation.navigate('Register')}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* <View style={{flex:1 , alignSelf: 'flex-end', width: '100%', height: '100%', paddingTop: '22.7%',}}>
          <ImageBackground resizeMode='cover' style={styles.waveTop} source={require("../../../assets/waves/wave-bottom-login.png")}/> 
        </View> */}
      </View>
    </>
)}

const styles = StyleSheet.create({
  buttonView: {
    paddingHorizontal: 0,
    height: isIOS ? 45 : 55,
    width: '90%',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  waveContainer: {
    position: 'absolute',
    top:0,
    backgroundColor: 'green',
  },
  waveTop:{
    height: 100,
    position: 'relative',
  },
  mainParentContainer: {
    height: '68%',
    backgroundColor:'red',
    flexDirection:'column'
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'blue',
  },
  Maincontainer: {
    height: '100%',
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  mainContentContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 15,
    width: '100%',
    height: '82%',
  },
  Image: {
    resizeMode: 'contain',
    height: isIOS ? height / 15.5 : height / 12.5 ,
  },
  Text:{
    color: '#A375FF',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:30,
    fontFamily: 'poppinsBold',
  },
  input:{
    width:'90%',
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#F4F1FF',
    borderColor: '#D8D7FE',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius:20,
    fontSize: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'poppinsRegular',
    height: 55,
  },
  TextP:{
    textDecorationLine:'underline',
    color: '#707070',
    alignSelf: 'flex-start',
    marginLeft:'6%',
    fontSize:15,
    fontWeight:'bold',
    fontFamily: 'poppinsRegular',
  },
  roundButton1:{
    backgroundColor: '#765FF2',
    textAlign:'center',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    width:'50%',
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  TextButton:{
    color: 'white',
    textAlign:'center',
    justifyContent: 'center',
    margin:'5%',
    fontSize:20,
    fontFamily: 'poppinsRegular',
  },
  TextCount:{
    textAlign:'center',
    color:'#707070',
    fontSize: 16,
    fontFamily: 'poppinsRegular',
  },
  TextReg:{
    color:'#A375FF',
    fontSize:16,
    fontFamily: 'poppinsBold',
  },
  cont2:{
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection:'row',
    gap: 5,
  },
});