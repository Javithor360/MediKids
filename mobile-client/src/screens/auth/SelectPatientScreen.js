//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground,BackHandler, KeyboardAvoidingView, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//>> Importing components
import { AuthStylesGlobal } from '../../../assets/AuthStyles';

const accountData = [
  { id: '1', name: 'Daniel Vásquez', image: 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216' },
  { id: '2', name: 'Javier Mejía', image: 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216' },
  { id: '3', name: 'Alvin Melendez', image: 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216' },
  //addButton (keep the order)
  { id: 'addPatient', name: 'Añadir Paciente' },
];

export const SelectPatientScreen = () => {

  const renderItem = ({ item }) => {
    if (item.id === 'addPatient') {
      return (
        <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
          <View style={styles.itemContainer}>
            <Image source={require('../../../assets/icons/add_icon.png')} style={styles.image} />
          </View>
          <Text style={styles.name2}>{item.name}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
          <View style={styles.itemContainer}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      );
    }
  };

  return (
      <View style={{ flex: 1, backgroundColor:'#fff' }}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
        </View>
        <View style={styles.mainContainer}>
            <View style={styles.topIconContainer}>
              <Image style={{width: 70, height: 70, resizeMode: 'contain',}} source={require('../../../assets/graphic-icons/patients_icon.png')}></Image>
            </View>
            <Text style={AuthStylesGlobal.title_Text2}>Seleccione un paciente</Text>
            <View style={{width: '90%', alignItems: 'center', justifyContent: 'center',}}>
              <FlatList
                data={accountData}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', marginTop: 20,}}>
              <TouchableOpacity style={styles.logoutBtn}>
                <Text style={{color: '#FFFFFF'}}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
      flex: 1,
      width:'100%',
      // backgroundColor: 'green',
      alignItems: 'center',

    },
    topIconContainer:{
      width: '100%',
      height: 70,
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {
      marginHorizontal: 25,
      marginVertical: 16,
      alignItems: 'center',
      // backgroundColor: 'red',
      height: 100,
      width: 100,
      borderRadius: 10,
      overflow: 'hidden',
    },
    shadow:{
      elevation: 4,
      //IOS
      shadowColor: '#707070',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      resizeMode: 'contain',
    },
    addIcon:{
      width: '80%',
      height: '80%',
      borderRadius: 10,
      resizeMode: 'contain',
    },
    name: {
      color: '#707070',
      fontWeight: 'bold',
      fontSize: 16,
    },
    name2: {
      color: '#A1A1A1',
      fontWeight: 'bold',
      fontSize: 14,
    },
    logoutBtn:{
      width: 150,
      height: '60%',
      backgroundColor: '#A375FF',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})