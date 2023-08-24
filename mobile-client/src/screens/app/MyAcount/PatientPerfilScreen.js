
//>> IMPORT LIBRERIES
import { ScrollView, StyleSheet, Text, View,TouchableOpacity, ImageBackground, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons'; 
import Constants from 'expo-constants';
import { ScreenTitle } from '../../../components/ScreenTitleHook';
//>> Constants
const { height } = Dimensions.get('window');

export const PatientPerfilScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]}>
        <ScrollView style={styles.MainContainer}>
            <View style={{backgroundColor:'#fff'}}>
                <ScreenTitle
                    Label={"Datos del paciente"}
                    IconName={"account-child"}
                    fontSize={20}
                    textColor={'#FFFFFF'}
                    paddingH={40}
                />
                <View style={styles.containPhoto}>
                    <View style={styles.profilePhotoWrapper}>
                        <ImageBackground style={styles.profilePhotoImage} source={require('../../../../assets/default-pics/default-profile-pic.png')}>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.ContainerView}>
                    <Text style={styles.DatosText}>Datos del Paciente</Text>
                    <View style={styles.InfoContainer}>
                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row'}}>
                                <AntDesign name="profile" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                <Text style={styles.TextForImput}>Nombre:</Text>
                            </View>
                            <Text style={styles.TextWritted}>Daniel Ernesto Vásquez Ventura</Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row',}}>
                                <MaterialCommunityIcons name="calendar-outline" size={24} color="#7225f9" marginLeft='5%' marginTop='1%'/>
                                <Text style={styles.TextForImput}>Fecha de nacimiento:</Text>
                            </View>
                            <Text style={styles.TextWritted}>28/07/2005</Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row',}}>
                                <MaterialIcons name="person-outline" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                <Text style={styles.TextForImput}>Género:</Text>
                            </View>
                            <Text style={styles.TextWritted}>Masculino</Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row',}}>
                                <MaterialCommunityIcons name="timeline-plus-outline" size={24} color="#7225f9" marginLeft='5%' marginTop='1%'/>
                                <Text style={styles.TextForImput}>Edad:</Text>
                            </View>
                            <Text style={styles.TextWritted}>8 años</Text>
                        </View>
                    </View>
                    <View style={styles.lineBig}></View>

                    <Text style={[styles.DatosText, {marginTop: '7%'}]}>Cartilla de vacunación</Text>
                    <View style={[styles.InfoContainer, {backgroundColor: '#f3f3f3',}]}>
                      <View style={styles.vaccineCard}>
                          <Text style={styles.vacTitle}>1. Poliomielitis</Text>
                          <MaterialIcons name="check-circle-outline" size={24} color="#09998c" style={{alignSelf: 'center',}}/>
                      </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
vaccineCard: {
  width: '90%',
  borderWidth: 1,
  borderColor:'#09998c',
  borderRadius: 10,
  alignSelf: 'center',
  flexDirection: 'row',
  paddingHorizontal: 30,
  justifyContent: 'space-between',
  marginBottom: 20,
  height: 50,
  marginTop: 10,
},
vacTitle: {
  fontSize: 16,
  paddingVertical:9,
  alignSelf: 'center',
},
ContainerView: {
    backgroundColor:'#FFFFFF',
    marginTop:-70,
    paddingTop: '20%',
    //iOS
    shadowColor: '#BBBBBB',
    shadowOpacity: 0.115,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowOffset: { width: 0, height: -6 },
    shadowColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    height: height + 150,
},
InfoContainer: {
    backgroundColor: '#CECEF6',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
DatosText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#000',
    textAlign: 'center',
    fontStyle:'italic',
},
MainContainer:{
    height:'100%',
    marginTop: Constants.statusBarHeight
},
line:{
    backgroundColor:'#fff',
    height: 2,
    width:'90%',
    alignSelf:'center',
    marginVertical: 15
},
lineBig:{
    backgroundColor:'#707070',
    height: 3,
    width:'80%',
    alignSelf:'center',
    marginTop: '10%',
    borderRadius: 10
},
TextForImput:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#7225f9',
},
TextWritted:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
},
ButtomShadow:{
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    //Android
    elevation: 5,
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
 profilePhotoImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
 },
})