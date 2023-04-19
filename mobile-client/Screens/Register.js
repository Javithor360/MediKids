import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity} from 'react-native';

export default function Register({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar  style="auto" />
      <Image
            style={styles.waves}
          source={require("../assets/Wave-Top-Login_Mobile.png")}
        /> 
   <Image
          style={styles.Image}
          source={require("../assets/LogoMK.png")}
        /> 
       
          <Text style={styles.Text}>¡Registro!</Text>
          <Text style={styles.Text}>Datos del encargado</Text>
<View style={styles.cont3}>
<TextInput
        style={styles.input1}
      
        placeholder="Nombre"
        placeholderTextColor="gray"
      />

         <TextInput
        style={styles.input2}
      
        placeholder="Apellidos"
        placeholderTextColor="gray"
      />
      
</View>
<View style={styles.cont3}>  
        <TextInput
        style={styles.input3}
        keyboardType="numeric"
        placeholder="DUI"
        placeholderTextColor="gray"
      />
        <TextInput
        style={styles.input4}
        keyboardType="numeric"
        placeholder="Telefono"
        placeholderTextColor="gray"
      />
      </View>
      <View style={styles.cont3}>  
        <TextInput
        style={styles.input5}
      keyboardType='email-address'
        placeholder="Correo electronico"
        placeholderTextColor="gray"
      />
        <TextInput
        style={styles.input6}
        secureTextEntry={true}
        placeholder="Contraseña"
        placeholderTextColor="gray"
        
      
      />
      
</View>



<TouchableOpacity
        
        style={styles.roundButton1}>
        <Text style={styles.TextButton} onPress={()=>navigation.navigate('RegisterP')} >Siguiente</Text>
      </TouchableOpacity>

      <View style={styles.cont2} >
        <Text style={styles.TextCount}>Ya tengo una cuenta</Text>
        <TouchableOpacity>
        <Text style={styles.TextReg} onPress={()=>navigation.navigate('Login')}>Iniciar sesión</Text>
          </TouchableOpacity>
      </View>
      <Image
           style={styles.waves}
          source={require("../assets/Wave-Bottom-Login_Mobile.png")}
        /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999FFF',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  Image: {
    width: '51%',
  height:'27%',
  marginLeft:5,
     alignItems:'center',
     justifyContent: 'center',
  },
  Text:{
    color: 'white',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'5%',
   
    fontSize:30,
  },
  //Inputs
  cont3:{
 
      flexDirection:'row',
      gap:5,
       },
  input1:{
    
    width:'40%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },
  input2:{
   
    
    width:'40%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },
  input3:{
    
    width:'40%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },
  input4:{
    
    width:'40%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },
  input5:{
    
    width:'40%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },
  input6:{
    
    width:'40%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },
//finInputs
  TextP:{
    textDecorationLine:'underline',
    color: 'white',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'2%',
   
    marginRight:'55%',
    fontSize:15,
  },
  roundButton1:{
    backgroundColor: '#765FF2',
    textAlign:'center',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    
    width:'50%',
   margin:'5%',
    
  },
  TextButton:{
    color: 'white',
    textAlign:'center',
 
    justifyContent: 'center',
   margin:'5%',
    fontSize:20,
  },
TextCount:{
color:'white',
fontSize:20,
},
TextReg:{
  color:'white',
  fontSize:20,
  fontWeight:'bold',
  
  },
cont2:{

    flexDirection:'row',
    gap:5,
     },
   waves:{
      width: '100%',
     height:'20%',
      alignItems:'center',
     },

});