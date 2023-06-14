import React from 'react'
import { View,Text,Image} from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const NotificationScreen = () => {
  return (
    <ScrollView style={styles.SafeAreaView}>
      
        <View style={styles.Contain} >
        <View style={styles.LineTitulo}></View> 
         
            <Text style={styles.Novedades}>Novedades</Text>
            <TouchableOpacity style={styles.DeletedAll}>
            <MaterialCommunityIcons name="notification-clear-all" size={50} color="#707070"   />
            </TouchableOpacity>
            <View style={styles.Contain2}>
            <Text style={styles.Nuevos}>Nuevos</Text>
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                    <MaterialIcons name="medical-services" size={70} color="#707070" alignSelf="center" />

                    </View>
                   <View style={styles.ContainText} >
                    <Text>7:33</Text>
                    <Text style={styles.TextDescription}>Cita con el doctor Josef Mengele en Otorrinolaringología</Text>
                    <TouchableOpacity style={styles.Deleted} >
                        <Text style={styles.TextDeleted}>Eliminar</Text>
                    </TouchableOpacity>

                    </View>


                </View>
               
                <Text style={styles.Nuevos}>Anteriores</Text>
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                    <MaterialIcons name="medical-services" size={70} color="#707070" alignSelf="center" />

                    </View>
                   <View style={styles.ContainText} >
                    <Text>7:33</Text>
                    <Text style={styles.TextDescription}>Cita con el doctor Josef Mengele en Otorrinolaringología</Text>
                    <TouchableOpacity style={styles.Deleted} >
                        <Text style={styles.TextDeleted}>Eliminar</Text>
                    </TouchableOpacity>

                    </View>


                </View>
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                    <MaterialIcons name="medical-services" size={70} color="#707070" alignSelf="center" />

                    </View>
                   <View style={styles.ContainText} >
                    <Text>7:33</Text>
                    <Text style={styles.TextDescription}>Cita con el doctor Josef Mengele en Otorrinolaringología</Text>
                    <TouchableOpacity style={styles.Deleted} >
                        <Text style={styles.TextDeleted}>Eliminar</Text>
                    </TouchableOpacity>

                    </View>


                </View>
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                    <MaterialIcons name="medical-services" size={70} color="#707070" alignSelf="center" />

                    </View>
                   <View style={styles.ContainText} >
                    <Text>7:33</Text>
                    <Text style={styles.TextDescription}>Cita con el doctor Josef Mengele en Otorrinolaringología</Text>
                    <TouchableOpacity style={styles.Deleted} >
                        <Text style={styles.TextDeleted}>Eliminar</Text>
                    </TouchableOpacity>

                    </View>


                </View>
               
             
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                    <MaterialIcons name="medical-services" size={70} color="#707070" alignSelf="center" />

                    </View>
                   <View style={styles.ContainText} >
                    <Text>7:33</Text>
                    <Text style={styles.TextDescription}>Cita con el doctor Josef Mengele en Otorrinolaringología</Text>
                    <TouchableOpacity style={styles.Deleted} >
                        <Text style={styles.TextDeleted}>Eliminar</Text>
                    </TouchableOpacity>

                    </View>


                </View>
            </View>
          
           
        </View>

   </ScrollView>
  )
}

const styles = StyleSheet.create({
    SafeAreaView:{
        backgroundColor:'white',
      flex:1,
    
    },
    Contain:{
        height:900,
        width:'100%',
        alignSelf:'center',
        backgroundColor:'white',
    },
    Novedades:{
        fontSize:25,
        bottom:'4.5%',
        alignSelf:'flex-start',
        marginLeft:'10%',
        color:'#707070',
        
    },
    LineTitulo:{
        backgroundColor:'#707070',
        height:2.5,
        width:'5%',
        alignSelf:'flex-start',
        marginTop:'20%',
        marginLeft:'4%',
        bottom:'2.7%',
     },
     Contain2:{
        backgroundColor:'white',
        height:300,
        bottom:30,
     },
     Nuevos:{
     marginBottom:13,
        marginLeft: 20,
         marginBottom: 20,
          fontSize: 29, 
        color: '#707070'
     },
     Noti:{
       backgroundColor:'#D8D7FE',
       height:'35%',
       width:'90%',
       alignSelf:'center',
       borderRadius:20,
       marginTop:'2%',
     },
     ContainImage:{
       
        height:'80%',
        width:'20%',
        top:'10%',
        left:'5%',
     },
     ContainText:{

        height:'80%',
        width:'65%',
        left:'30%',
        bottom:'70%',
     },
     TextDescription:{
        fontWeight:'bold',
     },
     Deleted:{
        backgroundColor:'white',
        alignSelf:'flex-end',
        borderRadius:20,
        width:'35%',
        height:'50%',
        bottom:'10%',
        alignItems:'center',
        justifyContent:'center',

     },
     TextDeleted:{
        alignSelf:'center',
        
     },
     DeletedAll:{
        color:'#707070',
        flexDirection:'row',
        position:'absolute',
        left:350,
        top:40,
        
        
     },
   

})