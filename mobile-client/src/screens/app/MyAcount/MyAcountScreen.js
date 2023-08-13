import { ScrollView, StyleSheet, Text, View,TouchableOpacity, ImageBackground, StatusBar, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScreenTitle } from '../../../index';
//Import Icons
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import {LinearGradient} from 'expo-linear-gradient'
//Redux
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';

export const MyAcountScreen = () => {
  const responsible = useSelector(state => state.responsible)
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]}>
        <ScrollView style={styles.SafeAreaView}>
            <View style={{backgroundColor:'#fff'}}>
                <ScreenTitle
                    Label={"Mi Cuenta"}
                    IconName={"account-circle"}
                    fontSize={20}
                    textColor={'#FFFFFF'}
                    paddingH={40}
                />
                <View style={styles.containPhoto}>
                    <View style={styles.profilePhotoWrapper}>
                        <ImageBackground style={styles.profilePhotoImage} source={{uri: responsible.ProfilePhotoUrl}}>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.ContainerView}>
                    <Text>hola</Text>
                </View>
                {/* <View style={styles.Contain1}>
                    
                    
                </View>
                <View style={styles.Contain2}>
                    <Text style={styles.Datos}>Datos del Encargado</Text>
                    <View style={styles.ContainDatos}>
                        <View style={styles.ContainCardShadow} >
                            <View style={styles.Card}>
                                <View style={styles.ContainCard}>
                                    <View style={styles.ContainCardText2}>
                                        <View style={{flexDirection: 'row'}}>
                                            <AntDesign name="profile" size={24} color="#A375FF" marginLeft='5%' marginTop='1%' />
                                            <Text style={styles.Nombre}>Nombre:</Text>
                                        </View>
                                        <Text style={styles.NombreT}>{responsible.FirstNames} {responsible.LastNames}</Text>
                                    </View>
                                    <View style={styles.line}></View>
                                    <View style={styles.ContainCardText2}>
                                        <View style={{flexDirection: 'row',}}>
                                            <MaterialIcons name="alternate-email" size={24} color="#A375FF" marginLeft='5%' marginTop='1%' />
                                            <Text style={styles.Email}>Email:</Text>
                                        </View>
                                        <Text style={styles.EmailT}>{responsible.Email}</Text>
                                    </View>
                                    <View style={styles.line}></View>
                                    <View style={styles.ContainCardText}>
                                        <AntDesign name="idcard" size={24} color="#A375FF" marginLeft='5%' marginTop='1%' />
                                        <Text style={styles.DUI}>DUI:</Text>
                                        <Text style={styles.DUIT}>{responsible.DUI}</Text>
                                    </View>
                                    <View style={styles.line}></View>
                                    <View style={[styles.ContainCardText, {marginBottom: 10,}]}>
                                        <AntDesign name="phone" size={24} color="#A375FF"  marginLeft='5%' />
                                        <Text style={styles.NumTele}>Teléfono:</Text>
                                        <Text style={styles.NumTeleT}>{responsible.Phone}</Text>
                                    </View>
                                </View>
                                <View style={styles.line}></View>
                                <View style={{width: '100%', height: 60, marginTop: 4, justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => {navigation.navigate('SelectProfilePhotoScreen')}} style={{ height: '75%',width: '90%',borderRadius: 15,backgroundColor: '#FFDEB4',alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10}}>
                                        <FontAwesome5 name="user-circle" size={24} color="#707070" />
                                        <Text style={{color: '#707070', fontSize: 16}}>Cambiar Foto de Perfil</Text>
                                    </TouchableOpacity>
                                </View>    
                            </View>
                        </View>
                    </View>
                </View> */}
            </View>
        </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
ContainerView: {
    backgroundColor:'#FFFFFF',
    marginTop:-70,
    paddingTop: '20%',
    //iOS
    shadowColor: '#BBBBBB',
    // shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#000',
    borderRadius: 30,
    paddingBottom: 30,
    paddingHorizontal: 20
},
Titulo:{
    fontSize:25,
    bottom:'10%',
    alignSelf:'flex-start',
    marginLeft:'10%',
    color:'#707070',
},
LineTitulo:{
   backgroundColor:'#707070',
   height:2,
   width:'5%',
   alignSelf:'flex-start',
   marginTop:'20%',
   marginLeft:'4%',
   bottom:'6%',
},
Datos:{
    fontSize:30,
    fontWeight:'bold',
    color:'#A375FF',
},
SafeAreaView:{
    height:'100%',
    marginTop: Constants.statusBarHeight
},
Contain1:{
    height:350,
    alignItems:'center',
    backgroundColor: '#CECEF'
},
Contain2:{
    height:550,

},
ContainDatos:{
    width:'100%',
    height:'90%',
    marginTop:'10%',
},
Card:{
    backgroundColor:'white',
    width:'100%',
    height:'100%',
    marginTop:'4%',
    borderRadius:20,
    alignSelf:'center',
    borderWidth:1,
    borderColor:'#CECEF6',
},
ContainCard:{
    gap:10,
    marginTop:'8%',
    width:'100%',
},
ContainCardShadow:{
    backgroundColor:'#CECEF6',
    width:'80%',
    height:'80%',
    alignSelf:'center',
    borderRadius:20,
    position:'absolute',
    elevation: 2
},
line:{
    backgroundColor:'#CECEF6',
    height:'0.2%',
    width:'90%',
    alignSelf:'center',
},
ContainCardText:{
    flexDirection:'row',
},
Nombre:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
Apellido:{
    fontSize:20,
    marginLeft:'17%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
Email:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
DUI:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
NumTele:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
NombreT:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
},
ApellidoT:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
},
EmailT:{
    fontSize:20,
    marginLeft:'6%',
    marginVertical:'1%',
},
DUIT:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
},
NumTeleT:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
},
containPhoto:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-5%',
    zIndex: 1000
},
profilePhotoWrapper:{
    height: 130,
    width: 130,
    marginVertical: '2%',
    borderRadius: 100,
    overflow: 'hidden',
 },
 ContainCardText2: {
    flexDirection: 'column',
 },
 profilePhotoImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
 },  
 hr: {
    width: '70%',
    height: '.5%',
    backgroundColor: '#D8D7FE',
    marginTop: 12,
    borderRadius: 3,
    marginHorizontal: '15%',
 },
 customMarginB_1: {
    marginBottom: 10,
 },
 customMarginB_2: {
    marginBottom: 3,
 },
 uploadBtn: {
    paddingHorizontal: '12%',
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#D8D7FE',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
 },
 uploadTxt:{
    fontSize: 18,
    color: '#707070',
    fontFamily: 'poppinsRegular',
    marginTop: 5,
    paddingVertical: 0
 }
})