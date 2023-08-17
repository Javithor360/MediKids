import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View} from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';


export const MyVaccines = () => {
  return (
    <ScrollView style={styles.Contain}>
            <View  style={styles.LineTitulo}></View>
            <Text style={styles.Expediente}>Datos del Paciente</Text>
            <View style={styles.ContainShadow1}>
            <View style={styles.Contain1} >
            
              <Text style={styles.Apartado}>Datos personales</Text>
              <View style={styles.ContainText} >
              <Text>Nombre:</Text>
              <Text style={styles.Text1}>Daniel Ernesto Vasquez Ventura</Text>
              </View>
              <View style={styles.ContainText} >
        

              <Text>Fecha de nacimiento:</Text>
              <Text style={styles.Text1}>09/8/2015</Text>
              </View>
              <View style={styles.ContainText} >
              <Text>Edad:</Text>
              <Text style={styles.Text1}>8</Text>
              </View>
              <View style={styles.ContainText} >
              <Text>Genero:</Text>
              <Text style={styles.Text1}>M</Text>
              </View>

              

            </View>
            </View>
            <View style={styles.Vaccines}>
            <View style={styles.ContainShadow2}>
             
            <View style={styles.Contain2}>
                <Text style={styles.Apartado}>Cartilla de Vacunacion</Text>
                <View style={styles.ContainTexVaccines}>

                <View style={styles.ContainVaccines}>

                  <View style={styles.Contain3}>
                  <Text style={styles.Text2}>1.BCG</Text>
                  <AntDesign name="checksquare" size={24} color="black"    />
                  </View>
                
                  <View style={styles.Contain3}>       
                <Text style={styles.Text2}>2.Hepatitis B</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
           
                <View style={styles.Contain3}>  
                <Text style={styles.Text2}>3.Pentavalente</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                
                </View>
                
                <View style={styles.Contain3}> 
                <Text style={styles.Text2}>4.Poliomielitis</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
               
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>5.Rotavirus</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
              
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>6.Neumococo Conjugado</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
              
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>7.Triple viral tipo SPR</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
               
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>8.Neumococo Conjudado</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
          
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>9.Pentavalente</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
          
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>10.Polio Oral</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
                
          
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>11.Triple viral tipo SPR</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
               
       
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>12.DPT</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
                
          
                <View style={styles.Contain3}>
                <Text style={styles.Text2}>13.Polio Oral</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
                
            
                <View style={styles.Contain3}> 
                <Text style={styles.Text2}>14.VPH -Solo niñas-</Text>
                <AntDesign name="checksquare" size={24} color="black"    />
                </View>
               
               
             
                
                </View>
               
                

        
       
                </View>
        


            </View>
            </View>
            </View>



    </ScrollView>



  )
}
  const styles = StyleSheet.create({ 
  Contain:{
      backgroundColor:'white',

  },
  Expediente:{
      fontSize:25,
      bottom:'5.2%',
      alignSelf:'flex-start',
      marginLeft:'10%',
      color:'#707070',
      
  },
  LineTitulo:{
      backgroundColor:'#707070',
      height:2,
      width:'5.1%',
      alignSelf:'flex-start',
      marginTop:'20%',
      marginLeft:'4%',
      bottom:'3%',
  },
  Contain1:{
    backgroundColor:'white',
    height:180,
    width:380,
    alignSelf:'center',
    borderRadius:30,
    


  },
  ContainShadow1:{
    backgroundColor:'#CECEF6',
    borderRadius:20,
    width:385,
    height:190,
    alignSelf:'center',
    bottom:30,
    

  },
  ContainShadow2:{
    backgroundColor:'#CECEF6',
    borderRadius:20,
    width:385,
    height:620,
    alignSelf:'center',
    bottom:30,

  },
  Vaccines:{
    top:10,
    
  },
  ContainText:{
      flexDirection:'row',
      padding:5,
      marginLeft:10,
      top:15,
    

      
  
  
  },
  Text1:{
  marginLeft:2,
  },
  Text2:{
    marginTop:15,
    fontSize:16,

  },
  Contain2:{
      backgroundColor:'red',
      height:605,
      width:380,
      alignSelf:'center',
      
      borderRadius:30,

    },
    Contain3:{
      flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
      // backgroundColor:'red'
    },
    ContainVaccines:{
      marginLeft:15,
      marginTop:10,
      //backgroundColor:'green',
      height:'100%',
      width:'80%'
      
      
    },
    ContainTexVaccines:{
      flexDirection:'row',
    
    
    },
  Apartado:{
    color:'#707070',
    fontSize:20,
    left:20,
    top:10,
    fontWeight:'bold',
  },
  ContainCheck:{
    left:55,
    top:16,
    backgroundColor:'red',
  },
  Check:{
    marginTop:11,
  
    
  },

  })