import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar  style="auto" />
      <Image
            style={styles.waves}
          source={require("./assets/Wave-Top-Login_Mobile.png")}
        /> 
   <Image
          style={styles.Image}
          source={require("./assets/LogoMK.png")}
        /> 
       
          <Text style={styles.Text}>¡Bienvenido!</Text>
          <TextInput
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

<Text style={styles.TextP}>Olvidé mi contraseña</Text>

<TouchableOpacity
        
        style={styles.roundButton1}>
        <Text style={styles.TextButton} >Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={styles.cont2} >
        <Text style={styles.TextCount}>¿No tienes una cuenta?</Text>
        <Text style={styles.TextReg}>Regístrate</Text>
      </View>
      <Image
           style={styles.waves}
          source={require("./assets/Wave-Bottom-Login_Mobile.png")}
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
  input:{
    
    width:'90%',
    marginTop:'5%',
  
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius:20,
    fontSize:20,
   
  },

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
  marginTop:10,
    flexDirection:'row',
    gap:5,
     },
     waves:{
      width: '100%',
     height:'20%',
      alignItems:'center',
     },

});