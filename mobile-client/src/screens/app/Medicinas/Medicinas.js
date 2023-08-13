
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View,Image,TouchableOpacity, ScrollView,Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenTitle } from '../../../index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react'
export const Medicinas = () => {
    const navigation = useNavigation();
    const [view,setView] = useState(false);
  return (
    <SafeAreaView>
      
         <ScrollView style={styles.fullScreenContainer}>
            <ScreenTitle 
                Label={"Medicinas"}
                IconName={"clipboard-text-multiple"}
                fontSize={20}
                textColor={'#FFFFFF'}
                paddingH={30}
            /> 
            <View style={styles.chooseBanner}>
                <View style={styles.chooseContent}>
                   
                    <View style={styles.rightTextSctn}>
                        <View style={styles.linee}></View>
                        <Text style={styles.titleBanner}>Medicamentos recetados</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardsContainer}>
            <View style={styles.card}>
                    
                    <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                        <View style={styles.IconTextSpc}>
                            <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                            </View>
                            <View style={styles.spcTitleC}>
                                <Text style={styles.spcTitle}>Tetratomisil 500</Text>
                         
                            </View>
                        </View>
                       
                        <View style={{  height: '65%',padding: 6,}}>
                    
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Dosis:</Text>
                                      <Text style={{ color: '#707070',}}>Una tableta de 500mg cada 12 horas</Text>
                                  </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Inicio del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                      
                                  </View>
                                  <View style={styles.InfoText} >
                                  <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Fin del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/09/2023</Text>
                                    </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                      <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                  </View>
                       
                           
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    
                    <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                        <View style={styles.IconTextSpc}>
                            <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                            </View>
                            <View style={styles.spcTitleC}>
                                <Text style={styles.spcTitle}>Tetratomisil 500</Text>
                         
                            </View>
                        </View>
                       
                        <View style={{  height: '65%',padding: 6,}}>
                    
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Dosis:</Text>
                                      <Text style={{ color: '#707070',}}>Una tableta de 500mg cada 12 horas</Text>
                                  </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Inicio del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                      
                                  </View>
                                  <View style={styles.InfoText} >
                                  <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Fin del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/09/2023</Text>
                                    </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                      <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                  </View>
                       
                           
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    
                    <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                        <View style={styles.IconTextSpc}>
                            <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                            </View>
                            <View style={styles.spcTitleC}>
                                <Text style={styles.spcTitle}>Tetratomisil 500</Text>
                         
                            </View>
                        </View>
                       
                        <View style={{  height: '65%',padding: 6,}}>
                    
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Dosis:</Text>
                                      <Text style={{ color: '#707070',}}>Una tableta de 500mg cada 12 horas</Text>
                                  </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Inicio del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                      
                                  </View>
                                  <View style={styles.InfoText} >
                                  <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Fin del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/09/2023</Text>
                                    </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                      <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                  </View>
                       
                           
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    
                    <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                        <View style={styles.IconTextSpc}>
                            <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                            </View>
                            <View style={styles.spcTitleC}>
                                <Text style={styles.spcTitle}>Tetratomisil 500</Text>
                         
                            </View>
                        </View>
                       
                        <View style={{  height: '65%',padding: 6,}}>
                    
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Dosis:</Text>
                                      <Text style={{ color: '#707070',}}>Una tableta de 500mg cada 12 horas</Text>
                                  </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Inicio del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                      
                                  </View>
                                  <View style={styles.InfoText} >
                                  <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Fin del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/09/2023</Text>
                                    </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                      <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                  </View>
                       
                           
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    
                    <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                        <View style={styles.IconTextSpc}>
                            <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                            </View>
                            <View style={styles.spcTitleC}>
                                <Text style={styles.spcTitle}>Tetratomisil 500</Text>
                         
                            </View>
                        </View>
                       
                        <View style={{  height: '65%',padding: 6,}}>
                    
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Dosis:</Text>
                                      <Text style={{ color: '#707070',}}>Una tableta de 500mg cada 12 horas</Text>
                                  </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Inicio del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                      
                                  </View>
                                  <View style={styles.InfoText} >
                                  <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Fin del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/09/2023</Text>
                                    </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                      <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                  </View>
                       
                           
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    
                    <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                        <View style={styles.IconTextSpc}>
                            <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                            </View>
                            <View style={styles.spcTitleC}>
                                <Text style={styles.spcTitle}>Tetratomisil 500</Text>
                         
                            </View>
                        </View>
                       
                        <View style={{  height: '65%',padding: 6,}}>
                    
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Dosis:</Text>
                                      <Text style={{ color: '#707070',}}>Una tableta de 500mg cada 12 horas</Text>
                                  </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Inicio del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                      
                                  </View>
                                  <View style={styles.InfoText} >
                                  <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Fin del tratamiento:</Text>
                                      <Text style={{ color: '#707070',}}>02/09/2023</Text>
                                    </View>
                                  <View style={styles.InfoText} >
                                      <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                      <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                  </View>
                       
                           
                        </View>
                    </View>
                </View>



             

                

               
                
            </View>
            </ScrollView>

            






    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  fullScreenContainer:{
    backgroundColor: '#FFFFFF',
  },
  safeArea:{
    backgroundColor: '#e4e2ff',
  },
  chooseBanner: {
      height: 100,
      width: wp('90%'),
      alignSelf: 'center',
      backgroundColor: '#B4B4D6',
      borderRadius: 20,
      borderTopWidth: 8,
      borderTopColor: '#CDCDF3',
      alignItems: 'center',
      // justifyContent: 'center',
  },
  chooseContent: {
      width: '95%',
      height: '70%',
      flexDirection: 'row',
      paddingH: wp('10%'),
      marginTop: hp('1.5%'),
  },
  leftIconSctn: {
      width: '30%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  iconShadow:{
      width: '90%',
      height: '80%',
      backgroundColor: '#B4B4D6',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
  },
  rightTextSctn:{
      width: '70%',
      height: '100%',
      justifyContent: 'center',
  },
  titleBanner: {
      fontSize: 20,
      fontWeight: 600,
      color: '#ffffff',
      marginHorizontal: 8,
      bottom:5,
  },
  linee: {
      height: 2,
      width: 40,
      backgroundColor: '#fff',
      marginBottom: 6,
      marginLeft: 8,
  },
  cardsContainer:{
      backgroundColor: '#fff',
      width: wp('90%'),
      alignSelf: 'center',
      borderRadius: 20,
      top: -30,
      elevation: 4,
      //iOS
      shadowColor: '#707070',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      paddingVertical: 20,
  },
  card: {
      width: '95%',
      height: 170,
      alignSelf: 'center',
      borderRadius: 18,
      flexDirection: 'row',
      overflow: 'hidden',
      borderBottomColor: '#CDCDF3',
      borderBottomWidth: 5,
      borderColor: '#EBEBEB',
      borderWidth: 1,
      marginBottom: 20,
      backgroundColor:'#ffff',
  },
  IconTextSpc: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      // borderBottomColor: '#EBEBEB',
      // borderBottomWidth: 1,
  },
  spcTitleC:{
      flexDirection: 'column',
      width: '82%',
      height: '100%',
      paddingHorizontal: 6,
      justifyContent: 'center',
      
  },
  spcTitle:{
      color: '#707070',
      fontWeight: 600,
      fontSize: 16,

  },
  
  apptBtn:{
      width: '50%',
      height: 30,
      backgroundColor: '#B4B4D6',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 10,
      left:'95%',
      position: 'absolute',
      alignSelf: 'flex-end',
  },
  apptBtn1:{
      width: '50%',
      height: 30,
      backgroundColor: '#B4B4D6',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 20,
      left:'25%',
      position: 'absolute',
      alignSelf: 'flex-end',
  },
  InfoText:{
      
    
      flexDirection:'row',
      gap:5,

  },
 
});

