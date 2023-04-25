import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Button, ScrollView,Image,View,TextInput,TouchableOpacity} from 'react-native';

const Home = () => {
  return (
    <View  style={styles.container}>
      <StatusBar  style="auto" />
 <View style={styles.contWave} >
      <Image
            style={styles.waves}
          source={require("../assets/wave-top-home-page.png")}
          
          
        /> 
        
       </View>
      
      
      <View style={styles.contLogo} >
 <Image
          style={styles.Image}
          source={require("../assets/Logotype_Colored.png")}
        /> 
      
 </View>

 <View style= {styles.bell}  >
  <TouchableOpacity>
        <Image
   style= {styles.bell1}
      source={require("../assets/bell.png")}
      />
      </TouchableOpacity>
      <TouchableOpacity style={styles.points}>
    <Text  style={styles.pointsT}   >...</Text> 
    </TouchableOpacity>
        </View>
    
       <Text style={styles.saludo}>Hola</Text>
       <Text style={styles.User}>Skyler white</Text>
       <Text style={styles.Rol}>Encargado</Text>
     <View style={styles.card}  >
      <View style={styles.TextCard}>
    <Text style={styles.TextP1} >Nombre del paciente:</Text>
    

    <Text style={styles.TextP2} >Edad:</Text>
    <Text style={styles.TextP3} >Género:</Text>
    </View>
     </View>
     

    </View>
     
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
 User:{
  fontSize:20,
marginTop:'-50%',
marginBottom:'15%',
marginLeft:'5%',
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

  bell:{
    flexDirection:'row',
   marginTop:'-107%',
   marginLeft:'6%',

  },
  
  contLogo:{
    width: '66%',
    height:'10%',

    marginTop:'100%',
 
  },
  cont2:{
    flexDirection:'row',
    
  },
  contWave:{
    position:'absolute',
    marginTop:'0%',
    marginBottom:'0%',
    width: '100%',
     height:'90%',
  },
  saludo:{
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
 card:{
  width:'80%',
  backgroundColor:'#A375FF',

   marginTop:'-40%',
      borderRadius:20,
      borderStyle: 'solid',
      padding:'10%',
  margin:'-15%',
marginLeft:'10%',
   
 },
  TextCard:{
    flexDirection:'row',
    gap:1,
    margin:'10%',
    marginTop:'-10%',

  },
  TextP1:{
margin:'10%',
marginLeft:'-20%',
color:'white',
fontWeight:'bold',
  },
  TextN:{
    color:'white',
  },
  TextP2:{
    margin:'10%',
    color:'white',
    fontWeight:'bold',
  },
  TextP3:{
    margin:'10%',
    color:'white',
    fontWeight:'bold',
  },
 //Fin Paciente 
  Image: {
    width: '75%',
  height:'44%',
marginTop:'-130%',
marginLeft:'40%',

  },
  


     waves:{
      width: '100%',
     height:'20%',
    

     },

});