import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Button, ScrollView,Image,View,TextInput,TouchableOpacity} from 'react-native';

const Home = () => {
  return (

    <ScrollView  contentContainerStyle={{ height:1499 }} 
    style={{ height: 100, }}  >
    <View  style={styles.container} >
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
      <View      style={styles.contKid}   >
      <Image
          style={styles.kid} 
          source={require("../assets/kid.png")}
          
          
        /> 
      </View>
          <View style={styles.TextCard}>
    <Text style={styles.TextP1} >Nombre del paciente:</Text>
    <Text style={styles.TextN} >Walter Hartwell White Jr</Text>

    <Text style={styles.TextP2} >Edad:</Text>
    <Text style={styles.TextE} >9 Años</Text>
    <Text style={styles.TextP3} >Género:</Text>
    <Text style={styles.TextG} >Masculino</Text>
    </View>
    <Image
          style={styles.medicalnote} 
          source={require("../assets/medical-note.png")}
          
          
        /> 
        <View  style={styles.contbuttonEx}>
        <Text style={styles.ViewExpediente} >Ver Expediente clínico</Text>
        </View>
         
     </View>

     <Text    style={styles.recordatorio}  >Recordatorios</Text>
     <View style={styles.contRe}  >
      <View style={styles.contshadow}>
          <View style={styles.contrecordatorio}>
          <Text style={styles.citas} >Citas Pendientes</Text>
          <Image
          style={styles.notetime} 
          source={require("../assets/note-time.png")}
          
          
        /> 
      
        <Text   style={styles.numberCitas}>2</Text>
        <View style={styles.contextRe}>

    
        <Text>Citas más próximas</Text>
        <Text>Fecha:</Text>   
        <Text>20/03/2023</Text>
        <Text>Hora:</Text>
        <Text>2:00 PM</Text>
        <View  style={styles.ButtonCitas}>
        <Text style={styles.ViewCitas} >Más detalles</Text>
        </View>
        </View>
          </View>
         
        </View>
  
        <View style={styles.contshadow}>
          <View style={styles.contrecordatorio}>
          <Text style={styles.recetas}>Recetas Pendientes</Text>
          <Image
          style={styles.recipe} 
          source={require("../assets/recipe.png")}
          
          
        /> 
      
        <Text   style={styles.numberRecetas}>1</Text>
        <View style={styles.contextRe} >
        <Text>Medicamentos disponibles:</Text>
        <Text>3/5</Text>
        <Text>Precio total estimado:</Text>
        <Text>$40.99</Text>
        </View>
        <View  style={styles.ButtonFarm}>
        <Text style={styles.ViewRecetas} >Ir a la farmacia</Text>
        </View>
          </View>

        </View>
     </View>
 
 <Text    style={styles.categorias}  >Categorias</Text>
 <View style={styles.Contcate} >
 <View style={styles.Contcategorias}  >
 <Image
          style={styles.neumologia} 
          source={require("../assets/neumologia.png")}
          
          
        /> 
        <Text style={styles.neumologiaText}  >Neumologia</Text>
        <Text style={styles.neumologiaText1}>Nos enfocamos en el diagnóstico y tratamiento de enfermedades que afectan el sistema respiratorio, incluyendo los pulmones, la tráquea, los bronquios y la pleura. </Text>
        <View  style={styles.ButtonNeumologia}>
        <Text style={styles.ViewNeumologia} >Más Información</Text>
        </View>
 </View>
 <View style={styles.Contcategorias1}  >
 <Image
          style={styles.otorrino} 
          source={require("../assets/otorrino-icon-2.png")}
          
          
        /> 
 <Text style={styles.neumologiaText}  >Otorrinolaringologia</Text>
        <Text style={styles.neumologiaText1}>Nos enfocamos en el diagnóstico y tratamiento de trastornos relacionados con la cabeza y el cuello, incluyendo los oídos, la nariz, la garganta y las estructuras relacionadas.</Text>
        <View  style={styles.ButtonOtorrino}/> 
        <Text style={styles.ViewOtorrino} >Más Información</Text>
      
</View>

<View style={styles.Contcategorias2}  >
 <Image
          style={styles.gastro} 
          source={require("../assets/gastro-icon-2.png")}
          
          
        /> 
        <Text style={styles.neumologiaText}  >Gastroenterología</Text>
        <Text style={styles.neumologiaText1}>Nos enfocamos en el diagnóstico y tratamiento de enfermedades que afectan el sistema digestivo.</Text>
        <View  style={styles.ButtonGastro}>
        <Text style={styles.ViewGastro} >Más Información</Text>
        </View>
 </View>
</View>
    </View>
    </ScrollView>
 
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',
    height:1000,
    

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
 
  contWave:{
    position:'absolute',
    marginTop:'0%',
    marginBottom:'0%',
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
    backgroundColor : '#CDCDF3',
    width:'45%',
    height:'85%',
    borderRadius:20,
    marginBottom:'5%',
    borderColor:'#CDCDF3',
    borderWidth:1,
  },
  contrecordatorio:{
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundColor:'white',
    borderColor:'white',
    borderWidth:0.5,
    borderRadius:20,
    borderStyle: 'solid',
    top: 10,
    
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
    fontSize:15,
  },

  recetas:{
    color:'gray',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:15,

  },
  recipe:{
    width:'29%',
    height:'25%',
    marginLeft:'15%',
    marginTop:'5%',

  },
  notetime:{
    width:'29%',
    height:'25%',
    marginLeft:'15%',
    marginTop:'5%',
   
  },
  numberCitas:{
color:'#A375FF',
fontWeight:'bold',
fontSize:25,
marginLeft:'50%',
marginTop:'-25%',
  },
  numberRecetas:{
    color:'#A375FF',
    fontWeight:'bold',
    fontSize:25,
  marginLeft:'50%',
   marginTop:'-25%',
  },
  contextRe:{
    marginTop:'10%',
    marginLeft:'10%',
  },
  ButtonFarm:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'70%',
    height:'15%',
    padding:'5%',
    marginLeft:'15%',
    top:15,
    
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
 
    
  },
  ViewCitas:{
    color:'white',
    fontSize:13,
    fontWeight:'bold',
    textAlign:'center',
  },
  categorias:{

   marginBottom:'-60%',
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
    top:-600,
  },
  Contcategorias1:{
    backgroundColor:'#FED5A0',
    height:'19%',
    width:'80%',
    left:45,
 
    borderRadius:20,
    top:-580,
  },
  Contcategorias2:{
    backgroundColor:'#FED5A0',
    height:'19%',
    width:'80%',
    left:45,

    borderRadius:20,
    top:-560,
  },
  neumologia:{
    left:4,
    top:10,
    height:'53%',
    width:'25%',
  },
  otorrino:{
    left:15,
    top:10,
    height:'50%',
    width:'21.10%',
  },
  gastro:{
    left:5,
    top:10,
    height:'47%',
    width:'25%',
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
    bottom:2,
    textAlign:'center',
   

  },
  ViewOtorrino:{
    color:'#FED5A0',
    bottom:20,
    textAlign:'center',
   left:85,

  },
  bell1:{
    height:30,
    width:23,
    left:5,
  },
  ViewGastro:{
    color:'#FED5A0',
    bottom:2,
    textAlign:'center',
   

  },
  ButtonNeumologia:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'40%',
    height:'34%',
    padding:'5%',
    marginLeft:'55%',
    top:15,
  },
  ButtonOtorrino:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'40%',
    height:'34%',
    padding:'5%',
    marginLeft:'55%',
    top:20,
  },
  ButtonGastro:{
    backgroundColor: '#D48888',
    borderStyle: 'solid',
    borderRadius:20,
    width:'40%',
    height:'34%',
    padding:'5%',
    marginLeft:'55%',
    top:24,
  },
     waves:{
      width: '100%',
     height:'16%',
    

     },

});