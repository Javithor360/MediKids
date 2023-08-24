
//>> Import Libraries
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity, ImageBackground, Dimensions, BackHandler, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { useEffect } from 'react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../../components/LanguageSelector';
import Constants from 'expo-constants';

export const HomeScreen = () => {

  const { t } = useTranslation();

  const navigation = useNavigation()
  const Info = useSelector(state => state.responsible);
  const Patient = useSelector(state => state.patient);
  
  //>> Aviod Come Back
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      //! Close the app.
      BackHandler.exitApp();
    })
  }, [navigation]);
  const [view,setView] = useState(false);
  const [lngModal, setLngModal] = useState(false);

  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]}>
      <ScrollView>
        <View style={{backgroundColor:'white'}}>
          <View style={styles.waveTopContent}>
            <ImageBackground source={require('../../../../assets/waves/waves_start_top.png')} style={styles.waveImg}></ImageBackground>
            <View style={styles.TopLogoBtnContainer}>
              <View style={styles.TopLogoBtnContent}>
                <View style={[styles.itemContainer, {width: '20%', height: '100%'}]}>
                  <TouchableOpacity onPress={()=>navigation.navigate('NotificationScreen') } >
                    <MaterialCommunityIcons name="bell" size={34} color="#707070" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.itemContainer, {width: '60%', height: '100%'}]}>
                  <Image source={require('../../../../assets/logos/Logotype_Colored.png')} style={styles.logoHeader}/>
                </View>
                <View style={[styles.itemContainer, {width: '20%', height: '100%'}]}>
                  <TouchableOpacity  onPress={()=> setView(true)}>
                    <Entypo name="dots-three-horizontal" size={34} color="#707070" />
                  </TouchableOpacity>
  
                <Modal
                  animationType='fade'
                  onDismiss={() => console.log('close')}
                  onShow={() => console.log('show')}
                  transparent
                  visible={lngModal}
                >
                    <LanguageSelector closeModal={() => setLngModal(false)}/>
                </Modal>
                <Modal

                  animationType='fade'
                  onDismiss={() => console.log('close')}
                  onShow={() => console.log('show')}
                  transparent
                  visible={view}

                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(1,1,1, 0.5)',
                      justifyContent: 'center',
                    }}
                  >
                    <View style={{ height: '100%', width: '90%', backgroundColor: '#ffff', left: 45,  paddingTop: Constants.statusBarHeight }}>
                      <Text style={{ alignSelf: 'center', top: 10, fontSize: 20, color: '#707070', fontWeight: 'bold', }}>Opciones</Text>
                      <View style={{ height: '70%', width: '90%', top: 20, alignSelf: 'center', }}>
                        <TouchableOpacity style={{ width:'115%',height: '10%',alignItems: 'center',justifyContent: 'center',right:19, }}>
                        <Text style={{alignSelf: 'flex-start',left:20,fontSize:18,}}>Cambiar paciente</Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                        <TouchableOpacity style={{ width:'115%',height: '10%',alignItems: 'center',justifyContent: 'center',right:19, }}>
                        <Text style={{alignSelf: 'flex-start',left:20,fontSize:18,}}>Editar Perfil</Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                        <TouchableOpacity style={{ width:'115%',height: '10%',alignItems: 'center',justifyContent: 'center',right:19, }}>
                        <Text style={{alignSelf: 'flex-start',left:20,fontSize:18,}}>Cuenta</Text>
                        </TouchableOpacity>
                        <View style={styles.line}></View>
                        <TouchableOpacity onPress={()=> setLngModal(true)} style={{ width:'115%',height: '10%',alignItems: 'center',justifyContent: 'center',right:19}}>
                          <Text style={{alignSelf: 'flex-start',left:20,fontSize:18,}}>Cambiar idioma</Text>

                        </TouchableOpacity>
                        <View style={styles.line}></View>
                        <TouchableOpacity style={{ width:'115%',height: '10%',alignItems: 'center',justifyContent: 'center',right:19, }}> 
                        <Text style={{color:'red',fontSize:18,alignSelf: 'flex-start',left:20,}}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={styles.apptBtn1} onPress={() => setView(false)} >
                        <Text style={{ color: '#fff', fontSize: 13.5, }}>Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <View style={styles.welcomeMsg}>
              <Text style={{height: '100%', fontSize: 29, color: '#707070', fontFamily: 'poppinsRegular'}}>
                {/* ¡Hola! */}
                {t('homePage.welcomeMsg')}
              </Text>
              <Text style={{fontWeight:'bold', color: '#D58C8C',fontSize: 18, fontFamily: 'poppinsBold'}}>Encargado</Text>
            </View>
            <View style={styles.userNameDsp}>
              <View style={{height: '100%', justifyContent: 'center'}}>
                <Text style={{color: '#707070', fontSize: 18, fontFamily: 'poppinsRegular'}}>{Info.FirstNames} {Info.LastNames}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardInfoContainer}>
            <View style={{width: '100%', height: '16%',alignItems: 'center',}}>
              <View style={styles.childIconContainer}>
                <Image source={require('../../../../assets/icons/kid.png')} style={{width: '70%', resizeMode: 'contain',}} />
              </View>
            </View>
            <View style={{width: '100%', height: '37.5%', alignItems: 'center',}}>
              <View style={styles.patientData}>
                <View style={[styles.patienDataText, {width: '50%', height: '100%'}]}>
                  <Text style={styles.patientDataTitles} numberOfLines={1} ellipsizeMode="tail">Nombre del paciente:</Text>
                  <Text style={styles.patientDataEach} numberOfLines={1} ellipsizeMode="tail">{Patient.FirstNames} {Patient.LastNames}</Text>
                </View>
                <View style={[styles.patienDataText, {width: '25%', height: '100%'}]}>
                  <Text style={styles.patientDataTitles} numberOfLines={1} ellipsizeMode="tail">Edad:</Text>
                  <Text style={styles.patientDataEach} numberOfLines={1} ellipsizeMode="tail">{Patient.Age} años</Text>
                </View>
                <View style={[styles.patienDataText, {width: '25%', height: '100%'}]}>
                  <Text style={styles.patientDataTitles} numberOfLines={1} ellipsizeMode="tail">Género:</Text>
                  <Text style={styles.patientDataEach} numberOfLines={1} ellipsizeMode="tail">{Patient.Gender}</Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: '37.5%', alignItems: 'center',}}>
              <View style={styles.viewBtnContainer}>
                <View style={[styles.contentBtn, {width: '30%'}]}>
                  <Image source={require('../../../../assets/icons/medical-note.png')} style={{height: '60%', resizeMode: 'contain'}}></Image>
                </View>
                <View style={[styles.contentBtn, {width: '70%'}]}>
                  <TouchableOpacity style={styles.touchableViewBtn}onPress={()=>navigation.navigate('MyVaccines') }>
                    <Text style={{color: '#A375FF'}} >Ver Datos del Paciente</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <Text style={{marginTop: 30, fontSize: 29, color: '#707070',textDecorationLine: 'underline', textAlign: 'center', fontFamily: 'poppinsBold', marginBottom: -15}}>
            Recordatorios
          </Text>
          
          <View style={{height: 'auto', width: '100%', flexDirection: 'row',}}>
            <View style={styles.reminderContainer}>
              <View style={styles.reminderCard}>
                <Text style={{marginTop: 25, fontSize: 22,fontWeight: 600, color: '#000000', textAlign: 'center', fontStyle: 'italic'}}>Citas</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '15%', width: '100%',}}>
                  <Image source={require('../../../../assets/icons/note-time.png')} style={{height: '80%', resizeMode: 'contain', marginLeft: -5}}/>
                  <Text style={{fontSize: 35, color: '#A375FF', fontWeight: 600,}}>2</Text>
                </View>

                <Text style={{marginTop: 10, fontWeight: "900", fontSize: 15, color: '#d17878', textAlign: 'center'}}>Próxima cita:</Text>

                <Text style={{marginTop: 10, fontWeight: 600, color: '#707070'}}><Text style={{color: '#000000', fontWeight: "900", fontSize: 15,}}>Fecha: </Text>09/05/23</Text>

                <Text style={{marginTop: 10, fontWeight: 600, color: '#707070'}}><Text style={{color: '#000000', fontWeight: "900", fontSize: 15,}}>Hora: </Text>2:00 PM</Text>

                <TouchableOpacity style={styles.touchableViewBtn2}>
                  <Text style={{color: '#fff'}}>Más detalles</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.reminderContainer}>
              <View style={styles.reminderCard}>
              <Text style={{marginTop: 25, fontSize: 22, fontWeight: 600, color: '#000000', textAlign: 'center', fontStyle: 'italic'}}>Medicinas</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '15%', width: '100%',}}>
                  <Image source={require('../../../../assets/icons/recipe.png')} style={{height: '80%', resizeMode: 'contain', marginLeft: -5}}/>
                  <Text style={{fontSize: 35, color: '#A375FF', fontWeight: 600,}}>1</Text>
                </View>

                <Text style={{marginTop: 10, fontWeight: 600, color: '#707070'}}><Text style={{color: '#000000', fontWeight: "900", fontSize: 15,}}>Nombre: </Text>Te-entramitrozón</Text>

                <Text style={{marginTop: 10, fontWeight: 600, color: '#707070'}}><Text style={{color: '#000000', fontWeight: "900", fontSize: 15,}}>Prox. dosis: </Text>09/05/23</Text>

                <Text style={{marginTop: 10, fontWeight: 600, color: '#707070'}}><Text style={{color: '#000000', fontWeight: "900", fontSize: 15,}}>Dosis: </Text>50Ml</Text>

                <TouchableOpacity style={styles.touchableViewBtn2}>
                  <Text style={{color: '#fff'}}>Más detalles</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={{fontSize: 30, color: '#707070',textDecorationLine: 'underline', textAlign: 'center', fontFamily: 'poppinsBold', marginBottom: 15}}>
            Categorias
          </Text>

          <View style={[styles.categCardContainer, {backgroundColor: '#FDEBD0'}]}>
            <View style={{width: '35%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../../../assets/graphic-icons/gastro-icon.png')} style={{width: '70%', height: '60%', resizeMode: 'contain'}}/>
            </View>
            <View style={{width: 1.5, height: '55%', backgroundColor: '#B2BABB', borderRadius: 5}} />
            <View style={{width: '64%', height: '100%', padding: 10, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <Text style={{fontWeight: 600, fontSize: 20, color: "#707070", textAlign: 'center', fontStyle: 'italic'}}>Gastroenterología</Text>
              <Text style={{fontSize: 14, color: "#707070", textAlign: 'justify'}}>Especialistas capacitados y el mejor equipo para atender a tu hijo/a.</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Gastro') } style={styles.touchableViewBtn3}>
                  <Text style={{color: '#fff'}}>Más detalles</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.categCardContainer, {backgroundColor: '#D4E6F1'}]}>
            <View style={{width: '35%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../../../assets/graphic-icons/otorrino-icon.png')} style={{width: '70%', height: '60%', resizeMode: 'contain'}}/>
            </View>
            <View style={{width: 1.5, height: '55%', backgroundColor: '#B2BABB', borderRadius: 5}} />
            <View style={{width: '64%', height: '100%', padding: 10, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <Text style={{fontWeight: 600, fontSize: 20, color: "#707070", textAlign: 'center', fontStyle: 'italic'}}>Otorrinolaringología</Text>
              <Text style={{fontSize: 14, color: "#707070", textAlign: 'justify'}}>Especialistas capacitados y el mejor equipo para atender a tu hijo/a.</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Otorrino') } style={styles.touchableViewBtn3}>
                  <Text style={{color: '#fff'}}>Más detalles</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.categCardContainer, {backgroundColor:"#D5F5E3"}]}>
            <View style={{width: '35%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../../../assets/graphic-icons/neumologia-icon.png')} style={{width: '70%', height: '60%', resizeMode: 'contain'}}/>
            </View>
            <View style={{width: 1.5, height: '55%', backgroundColor: '#B2BABB', borderRadius: 5}} />
            <View style={{width: '64%', height: '100%', padding: 10, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <Text style={{fontWeight: 600, fontSize: 20, color: "#707070", textAlign: 'center', fontStyle: 'italic'}}>Neumología</Text>
              <Text style={{fontSize: 14, color: "#707070", textAlign: 'justify'}}>Especialistas capacitados y el mejor equipo para atender a tu hijo/a.</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('SpecialityInfoN') } style={styles.touchableViewBtn3}>
                  <Text style={{color: '#fff'}}>Más detalles</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  waveTopContent:{
    height: '100%',
    width: '100%',
  },
  waveImg: {
    flex: 1,
    height: 150,
    resizeMode: 'cover',
  },
  TopLogoBtnContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopLogoBtnContent:{
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeader: {
    width: '70%',
    resizeMode: 'contain'
  },
  titleContainer:{
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },  
  welcomeMsg:{
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    
  },
  userNameDsp: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfoContainer: { 
    width: '90%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A375FF',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 50,
    borderRadius: 20,
  },
  childIconContainer:{
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#D8D7FE',
    position: 'absolute',
    top: -60,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientData: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  patienDataText: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 5
  },
  patientDataTitles: {
    fontSize: 15.5,
    fontWeight: 600,
    color: '#fff',
  },
  patientDataEach: {
    color: '#fff',
  },
  viewBtnContainer: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }, 
  touchableViewBtn: {
    height: '50%',
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderContainer: {
    height: 390,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderCard: {
    height:'85%',
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 29,
    borderTopWidth: 9,
    borderTopColor: '#D8D7FE',
    flexDirection: 'column',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D8D7FE',
    elevation: 2
    // alignItems: 'center',
    // gap: 10
  },
  touchableViewBtn2: {
    height: '10%',
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#D58C8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginLeft: 5,
  },
  touchableViewBtn3: {
    height: '25%',
    width: '50%',
    borderRadius: 15,
    backgroundColor: '#D58C8C',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  categCardContainer: {
    width: '90%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDEB4',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    //iOS
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#000000',

  },
  User:{
    fontSize:20,
    marginTop:'-50%',
    marginBottom:'15%',
    marginLeft:'5%',
    color:'gray',
  },

  pointsT:{
    fontSize:50,
    color:'gray',
  },
  points:{
    marginLeft:'85%',
    position:'absolute',
    marginTop:'-5.5%',
  },
  scroll:{
    backgroundColor: 'red',
  },
  bell:{
    flexDirection:'row',
    marginTop:'-113%',
    marginLeft:'6%',
  },
  contLogo:{
    width: '66%',
    height:'8.3%',
    marginTop:'100%',
  },
  cont2:{
    flexDirection:'row',
  },
  recordatorio:{
    marginTop:'20%',
    marginLeft:'8%',
    fontSize:35,
    color:'gray',
    textDecorationLine:'underline',
  },
  kid:{
    position:'absolute',
    width:50,
    height:50,
    marginLeft:15,
    marginTop:15,
  },
  contKid:{
    backgroundColor:'#D8D8FF',
    marginTop:'-25%',
    borderRadius:100,
    borderStyle:'solid',
    padding:'15%',
    margin:'-15%',
    marginLeft:'35%',
    width:'10%',
    height:'10%',
  },
  waveTopContent:{
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  lol:{
    height: '90%',
  },
  contWave:{
    // position:'absolute',
    width: '100%',
    height:'70%',
  },
  saludo:{
    color:'gray',
    fontSize:40,
    marginBottom:'50%',
    marginTop:'15%',
    marginLeft:'5%',
  },
  Rol:{
    fontSize:20,
    marginBottom:'50%',
    marginTop:'-25%',
    marginLeft:'75%',
    color:'#d58c8c',
  },
//Paciente
  cardShadow:{
    width:'85%',
    height:'18%',
    backgroundColor:'#D8D8FF',
    marginTop:'-40%',
    borderRadius:20,
    borderStyle: 'solid',
    padding:'10%',
    margin:'-15%',
    marginLeft:'7.5%',
  },
  card:{
    width:'85%',
    height:'17%',
    backgroundColor:'#A375FF',
    marginTop:'-40%',
    borderRadius:20,
    borderStyle: 'solid',
    padding:'10%',
    margin:'-15%',
    marginLeft:'7.5%',
    bottom:28,
  },
  contbuttonEx:{
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    width:'80%',
    height:'25%',
    padding:'5%',
    marginLeft:'20%',
    marginTop:'-15%',
  },
  ViewExpediente:{
    color:'#A375FF',
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
  },
  TextCard:{
    flexDirection:'row',
    gap:1,
    margin:'15%',
    marginTop:'10%',
  },
  TextP1:{
    margin:'10%',
    marginLeft:'-35%',
    color:'white',
    fontWeight:'bold',
  },
  TextN:{
    color:'white',
    marginTop:'20%',
    marginLeft:'-71%',
  },
  TextE:{
    color:'white',
    marginTop:'20%',
    marginLeft:'-26%',
  },
  TextG:{
    color:'white',
    marginTop:'20%',
    marginLeft:'-32%',
  },
  TextP2:{
    margin:'10%',
    color:'white',
    fontWeight:'bold',
    marginLeft:'20%',
  },
  TextP3:{
    margin:'10%',
    color:'white',
    fontWeight:'bold',
    marginLeft:'25%',
  },
  medicalnote:{
    width:'15%',
    height:'30%',
    resizeMode:'contain',
  },
 //Fin Paciente 
  Image: {
    width: '85%',
    height:'37%', 
    marginTop:'-130%',
    marginLeft:'37%',
  },
  contshadow:{
    position: 'relative',
    backgroundColor: '#CDCDF3',
    width:'45%',
    height:'90%',
    borderRadius:20,
    borderColor:'#CDCDF3',
    borderWidth:1,
  },
  contrecordatorio:{
    position:'absolute',
    width:'100%',
    height:'94%',
    backgroundColor:'white',
    borderColor:'white',
    borderRadius:20,
    borderStyle: 'solid',
    top: 15,
  },
  contRe:{
    width:'100%',
    height:'40%',
    justifyContent: 'center',
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    gap:10
  },
  citas:{
    color:'gray',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17,
    top:5,
  },
  recetas:{
    color:'gray',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17,
    top:5,
  },
  recipe:{
    width:'29%',
    height:'25%',
    marginLeft:'15%',
    marginTop:'5%',
    resizeMode:'contain',
  },
  notetime:{
    width:'29%',
    height:'25%',
    marginLeft:'15%',
    marginTop:'5%',
    resizeMode:'contain',
  },
  numberCitas:{
    color:'#A375FF',
    fontWeight:'bold',
    fontSize:35,
    marginLeft:'50%',
    marginTop:'-26%',
  },
  numberRecetas:{
    color:'#A375FF',
    fontWeight:'bold',
    fontSize:35,
    marginLeft:'50%',
    marginTop:'-26%',
  },
  contextRe:{
    marginTop:'10%',
    marginLeft:'10%',
  },
  fecha:{
    top:2,
    color:'#707070',
  },
  hora:{
    top:5,
    color:'#707070',
  },
  horaText:{
    top:5,
    fontWeight:'bold',
    color:'#707070',
    fontSize:15,
  },
  fechaText:{
    top:1,
    fontWeight:'bold',
    color:'#707070',
    fontSize:15,
  },
  cantidad:{
    color:'#707070',
    top:5,
  },
  precioText:{
    fontWeight:'bold',
    top:5,
    color:'#707070',
    fontSize:15,
  },
  precio:{
    top:10,
    color:'#707070',
  },
  MediText:{
    fontWeight:'bold',
    color:'#707070',
    fontSize:15,
  },
  CitaProx:{
    fontWeight:'bold',
    bottom:2,
    color:'#707070',
    fontSize:15,
  },
  ButtonFarm:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'70%',
    height:'15%',
    padding:'5%',
    marginLeft:'15%',
    top:25,
  },
  ViewRecetas:{
    color:'white',
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
  },
  ButtonCitas:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'70%',
    height:'25%',
    padding:'5%',
    marginLeft:'10%',
    top:10,
  },
  ViewCitas:{
    color:'white',
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
  },
  categorias:{
    marginBottom:'-70%',
    marginLeft:'8%',
    fontSize:35,
    color:'gray',
    textDecorationLine:'underline',
  },
  Contcate:{
    top:'58%',
  },
  Contcategorias:{
    backgroundColor:'#FED5A0',
    height:'19%',
    width:'80%',
    left:45,
    borderRadius:20,
    top:-555,
  },
  Contcategorias1:{
    backgroundColor:'#FED5A0',
    height:'19%',
    width:'80%',
    left:45,
    borderRadius:20,
    top:-540,
  },
  Contcategorias2:{
    backgroundColor:'#FED5A0',
    height:'19%',
    width:'80%',
    left:45,
    borderRadius:20,
    top:-525,
  },
  neumologia:{
    left:4,
    top:40,
    height:'53%',
    width:'25%',
    resizeMode:'contain',
  },
  otorrino:{
    left:15,
    top:45,
    height:'50%',
    width:'21.10%',
    resizeMode:'contain',
  },
  gastro:{
    left:5,
    top:45,
    height:'47%',
    width:'25%',
    resizeMode:'contain',
  },
  neumologiaText:{
    fontSize:20,
    position:'absolute',
    left:90,
    top:10,
    fontWeight:'bold',
    color:'gray',
  },
  neumologiaText1:{
    fontSize:13,
    position:'absolute',
    left:95,
    top:35,
    fontWeight:'bold',
    right:10,
    textAlign:'justify',
  },
  ViewNeumologia:{
    color:'#FED5A0',
    bottom:7,
    textAlign:'center',
    height:15,
  },
  ViewOtorrino:{
    color:'#FED5A0',
    bottom:7,
    textAlign:'center',
    height:15,
  },
  bell1:{
    height:30,
    width:23,
    left:5,
  },
  ViewGastro:{
    color:'#FED5A0',
    bottom:7,
    textAlign:'center',
    height:15,
  },
  ButtonNeumologia:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'40%',
    height:'25%',
    padding:'5%',
    marginLeft:'55%',
    top:15,
  },
  ButtonOtorrino:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'40%',
    height:'25%',
    padding:'5%',
    marginLeft:'55%',
    top:20,
  },
  ButtonGastro:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'40%',
    height:'25%',
    padding:'5%',
    marginLeft:'55%',
    top:24,
  },
  apptBtn1:{
    width: '50%',
    height: 30,
    backgroundColor: '#B4B4D6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 25,
    left:'25%',
    position: 'absolute',
    alignSelf: 'flex-end',
},
line:{
  backgroundColor:'#CECEF6',
  height:'0.2%',
  width:'90%',
  alignSelf:'flex-start',
},
});