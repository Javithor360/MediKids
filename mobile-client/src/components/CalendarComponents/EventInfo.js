
//>> IMPORT LIBRERIES
import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const EventInfo = ({EventSelected}) => {
  const navigation = useNavigation()

  const getLocaleDate = (dt) => {
    let date = new Date(dt);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${date.toLocaleDateString()} - ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  return (
    <View style={{width: '100%', height: '100%', paddingVertical: 10, paddingHorizontal: 15}}>
      <Text style={{textAlign: 'center', fontFamily: 'poppinsBold', fontSize: 24, color: '#666666'}}>Detalles del Evento</Text>
      <View style={{width: '75%', height: 2, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#666666', borderRadius: 10}}/>
      <View style={{width: '100%', marginTop: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
        <FontAwesome name="circle" size={20} color="#ff981c" />
        <Text style={{fontSize: 18, color: "#ff981c", fontWeight: "600", marginLeft: 8}}>{EventSelected.Event_Name}</Text>
      </View>
      
      <Text style={{fontWeight: "700", marginTop: 20, fontSize: 17}}>Descripción:</Text>
      <View style={{width: '100%', marginTop: 10, backgroundColor: '#eaeaea', paddingHorizontal: 12, paddingVertical: 10, height: 60, borderRadius: 5, elevation: 3, shadowColor: '#000', shadowOffset: {height: 4}, shadowOpacity: 0.1, shadowRadius: 3, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16}}>{EventSelected.Description}</Text>
      </View>

      <Text style={{fontWeight: "700", marginTop: 40, fontSize: 17}}>Fecha y Hora:</Text>
      <View style={{width: '100%', marginTop: 10, backgroundColor: '#eaeaea', paddingHorizontal: 12, paddingVertical: 10, height: 60, borderRadius: 5, elevation: 3, shadowColor: '#000', shadowOffset: {height: 4}, shadowOpacity: 0.1, shadowRadius: 3, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 19}}>{getLocaleDate(EventSelected.Starting_Event_Date)}</Text>
      </View>

        <View style={{width: '100%', height: 70, justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 35}}>
            <TouchableOpacity onPress={() => {navigation.navigate('Appointment')}} style={{ height: '75%',width: '80%',borderRadius: 15,backgroundColor: '#4c9ca5', alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10, elevation: 3, shadowColor: '#000', shadowOffset: {height: 4}, shadowOpacity: 0.1, shadowRadius: 3,}}>
                <AntDesign name="checkcircleo" size={24} color="#fff" />
                <Text style={{color: '#fff', fontSize: 16}}>Mostrar Evento</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}