
//>> Importing libraries
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//>> Importing components
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';
const { height } = Dimensions.get('window');

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 3, position:'relative' }}>
        <View style={{flexDirection: 'column', position: 'relative',}}>
          <ImageBackground resizeMode='cover' style={styles.waveTop} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <TouchableOpacity activeOpacity={0.5} style={styles.buttomCameBack} onPress={() => navigation.navigate('WelcomeScreen')}>
            <MaterialIcons name="arrow-back-ios" size={17} color="white" />
            <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:2, flexDirection: 'column',backgroundColor: '#fff', paddingHorizontal:'3%', paddingVertical:'3%'}} >
          <View style={{height: height  , flexDirection:'column', justifyContent:'flex-start', alignItems:'center', gap: 8 }} >
            <Image style={styles.Image} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={styles.Text}>¡Bienvenido!</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Email"
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
                marginV={isIOS ? 2 : 6}
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
        <View style={{position: 'absolute', bottom: 0, left: 0, right: 0,}}>
          <ImageBackground resizeMode='cover' style={styles.waveTop} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
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
  waveTop:{
    height: 100,
    position: 'relative',
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
    fontSize:35,
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
  buttomCameBack: {
    top: '50%',
    left: 15,
    backgroundColor: '#A375FF',
    position: 'absolute',
    borderRadius: 6,
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignItems: 'center',
    paddingVertical: isIOS ? 8 : 0
  }
});