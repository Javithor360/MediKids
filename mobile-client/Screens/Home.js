import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Button, ScrollView,Image,View,TextInput,TouchableOpacity} from 'react-native';

const Home = () => {
  return (
    <View  style={styles.container}>
      <StatusBar  style="auto" />
 
      <Image
            style={styles.waves}
          source={require("../assets/wave-top-home-page.png")}
          
        /> 
       
      
      
      <View style={styles.contLogo} >
 <Image
          style={styles.Image}
          source={require("../assets/Logotype_Colored.png")}
        /> 
 </View>
 <View style= {styles.bell}  >
        <Image
 
      source={require("../assets/bell.png")}
      />
        </View>
    
       
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
  bell:{
    flexDirection:'row',
    
  },
  
  contLogo:{
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  cont2:{
    flexDirection:'row',
    
  },
//Paciente
 card:{
  width:'80%',
  backgroundColor:'#A375FF',

   
      borderRadius:20,
      borderStyle: 'solid',
      padding:'4%',
  margin:'-15%',
marginLeft:'10%',
   
 },
  TextCard:{
    flexDirection:'row',
    gap:1,
    margin:'10%',

  },
  TextP1:{
margin:'10%',
  },
  TextP2:{
    margin:'10%',
  },
  TextP3:{
    margin:'10%',
  },
 //Fin Paciente 
  Image: {
    width: '54.8%',
  height:'41.4%',
marginTop:'-65%',

  },
  


     waves:{
      width: '100%',
     height:'20%',

     
     },

});