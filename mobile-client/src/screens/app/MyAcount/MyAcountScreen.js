import { StyleSheet, Text, View,TouchableOpacity,MaterialIconsDimensions,  ImageBackground, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {CustomButton} from '../../../index'
import { useNavigation } from '@react-navigation/native'
//Import Icons
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


export const MyAcountScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.SafeAreaView}>

        <View style={styles.Contain1}>
         <View style={styles.LineTitulo}></View>      
        <Text style={styles.Titulo}>Mi cuenta</Text>
        <Text style={styles.Datos}>Datos del Encargado</Text>
        <View style={styles.containPhoto}>
            <View style={styles.profilePhotoWrapper}>
                <ImageBackground style={styles.profilePhotoImage} source={require('../../../../assets/default-pics/default-profile-pic.png')}>
                </ImageBackground>
            </View>
        </View>  
        

        </View>

        <View style={styles.Contain2}>
            <View style={styles.ContainDatos}>
            <View style={styles.ContainCardShadow} >
          <View style={styles.Card}>
            <View style={styles.ContainCard}>
                <View style={styles.ContainCardText}>
                <AntDesign name="profile" size={24} color="#A375FF" marginLeft='5%' marginTop='1%' />
                <Text style={styles.Nombre}>Nombres:</Text>
              <Text style={styles.NombreT}>Skyler Ernesto</Text>
                </View>


                    <View style={styles.line}></View>

                <View style={styles.ContainCardText}>
                 <Text style={styles.Apellido}>Apellidos:</Text>
             <Text style={styles.ApellidoT}>White Serrano</Text>
                </View>

                    <View style={styles.line}></View>

                    <View style={styles.ContainCardText}>
                    <MaterialIcons name="alternate-email" size={24} color="#A375FF" marginLeft='5%' marginTop='1%' />
                 <Text style={styles.Email}>Email:</Text>
                <Text style={styles.EmailT}>skylerWT1968@gmail.com</Text>
                </View>
                    <View style={styles.line}></View>
                    <View style={styles.ContainCardText}>
                    <AntDesign name="idcard" size={24} color="#A375FF" marginLeft='5%' marginTop='1%' />
                 <Text style={styles.DUI}>DUI:</Text>
                <Text style={styles.DUIT}>87277865-9</Text>
                    </View>

                     <View style={styles.line}></View>
                     <View style={styles.ContainCardText}>

                     <AntDesign name="phone" size={24} color="#A375FF"  marginLeft='5%' />

                <Text style={styles.NumTele}>Número de teléfono:</Text>
                <Text style={styles.NumTeleT}>7123-9870</Text>
                         </View>
                </View>
                </View>

             </View>
             </View>
        </View>
     

   
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
Titulo:{
    fontSize:25,
    bottom:'10%',
    alignSelf:'flex-start',
    marginLeft:'10%',
    color:'#707070',

  
},
LineTitulo:{
   backgroundColor:'#707070',
   height:'1%',
   width:'5%',
   alignSelf:'flex-start',
   marginTop:'10%',
   marginLeft:'4%',
   bottom:'6%',
},
Datos:{
    fontSize:30,
    fontWeight:'bold',
    color:'#A375FF',
  
},
SafeAreaView:{
    backgroundColor:'white',
    height:'100%',

},
Contain1:{
    height:'50%',
    backgroundColor:'white',
    alignItems:'center',
},
Contain2:{
    height:'50%',
    backgroundColor:'white',
},
ContainDatos:{
    width:'100%',
    height:'90%',
    marginTop:'10%',
    
},
Card:{
    backgroundColor:'white',
    width:'100%',
    height:'95%',
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
    height:'85%',
    alignSelf:'center',
    borderRadius:20,
    position:'absolute',

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
    marginLeft:'5%',
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
    marginLeft:'6%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
DUI:{
    fontSize:20,
    marginLeft:'7%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#A375FF',
},
NumTele:{
    fontSize:20,
    marginLeft:'7%',
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
    marginLeft:'5%',
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
    marginTop:'10%',
},
profilePhotoWrapper:{
    height: 250,
    width: 250,
    marginVertical: '2%',
    borderRadius: 125,
    overflow: 'hidden',
 },
 profilePhotoImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
 },  
 hr: {
    width: '90%',
    height: '.5%',
    backgroundColor: '#D8D7FE',
    marginTop: 12,
    borderRadius: 3,
    marginHorizontal: '10%',
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