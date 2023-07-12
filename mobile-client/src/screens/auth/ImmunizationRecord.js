//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground,BackHandler, KeyboardAvoidingView,} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Checkbox from 'expo-checkbox';

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isIOS } from '../../constants';
import { CustomButton, RegisterPatientsQuery, SetLabel, ShowToast } from '../../index';
import { ScrollView } from "react-native-gesture-handler";

//>> Importing icons
import { useSelector } from "react-redux";

export const ImmunizationRecord = () => {
  const navigation = useNavigation();
  const Email = useSelector(state => state.responsible.Email);
  const route = useRoute();

  //! State for the Form.
  const [PatientId, setPatientId] = useState(undefined);
  const [isChecked, setIsChecked] = useState({
    bgc: false,
    hepatitis: false,
    pentavalente: false,
    poliomielitis: false,
    rotavirus: false,
    neumococo: false,
    dtp: false,
    polio: false,
    antitetanica: false,
    spr: false
  });

  //! States for th functioning handler.
  const [Success, setSuccess] = useState(false);

  //! States for statement
  const [isLoading, setIsLoading] = useState(false);

  //! State For disable the button
  const [DisableButton, setDisableButton] = useState(false);

  const setImmunizationRecord = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const {data} = await RegisterPatientsQuery();

      if(data.success){
        //! Show success message.
        ShowToast('my_success', 'Éxito', 'Paciente Registrado correctamente');

        //! Close loading animation
        setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
          setTimeout(() => {
            navigation.navigate('WelcomeScreen');
          }, 3000);
        }, 4000);
      }
    } catch (error) {
      //>> Close loading animation
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
      }, 2000);

      //>> Show error message.
      ShowToast('my_error', 'Error', error.response.data.message);
    }
  }

  //! Disable the send buttom
  useEffect(() => {
    if(isLoading){
      setDisableButton(true);
    } else if(Success){
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [isLoading, Success]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
    })
  }, []);

  //! check the parameters of the navigation.
  useEffect(() => {
    if (route.params != undefined) {
      const {Patient_id} = route.params;
      setPatientId(Patient_id);
      console.log(Patient_id)
    }
  }, [route]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#e4e2ff',}}
    behavior={'padding'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor:'#fff' }}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <View style={[AuthStylesGlobal.buttomCameBack]}>
            <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>Paso 3</Text>
          </View>
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')} />
            <Text style={AuthStylesRegisterU.Tex_md}>Registro de vacunación</Text>
            <View style={[AuthStylesGlobal.cont2,]} >
              <Text style={AuthStylesGlobal.TextCount}>¡Necesitamos la informacion del menor para hacer un muy buen trabajo!</Text>
            </View>

            <View style={styles.vaccinesContainer}>
              <Text style={styles.vaccinesTitle}>Seleccione las Vacunas</Text>
              <View style={styles.separatorLine}></View>
              <ScrollView>
                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.bgc ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.bgc}
                    onValueChange={() => setIsChecked({...isChecked, bgc: !isChecked.bgc})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.bgc ? "#09998c" : "#707070"}}>BGC</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.hepatitis ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.hepatitis}
                    onValueChange={() => setIsChecked({...isChecked, hepatitis: !isChecked.hepatitis})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.hepatitis ? "#09998c" : "#707070"}}>Hepatitis B</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.poliomielitis ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.poliomielitis}
                    onValueChange={() => setIsChecked({...isChecked, poliomielitis: !isChecked.poliomielitis})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.poliomielitis ? "#09998c" : "#707070"}}>Poliomielitis</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.pentavalente ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.pentavalente}
                    onValueChange={() => setIsChecked({...isChecked, pentavalente: !isChecked.pentavalente})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.pentavalente ? "#09998c" : "#707070"}}>Pentavalente</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.rotavirus ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.rotavirus} 
                    onValueChange={() => setIsChecked({...isChecked, rotavirus: !isChecked.rotavirus})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.rotavirus ? "#09998c" : "#707070"}}>Rotavirus</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.neumococo ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.neumococo} 
                    onValueChange={() => setIsChecked({...isChecked, neumococo: !isChecked.neumococo})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.neumococo ? "#09998c" : "#707070"}}>Neumococo Conjugado</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.dtp ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.dtp} 
                    onValueChange={() => setIsChecked({...isChecked, dtp: !isChecked.dtp})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.dtp ? "#09998c" : "#707070"}}>DPT</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.polio ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.polio} 
                    onValueChange={() => setIsChecked({...isChecked, polio: !isChecked.polio})}
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.polio ? "#09998c" : "#707070"}}>Polio Oral</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.antitetanica ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.antitetanica} 
                    onValueChange={() => setIsChecked({...isChecked, antitetanica: !isChecked.antitetanica})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.antitetanica ? "#09998c" : "#707070"}}>Antitetánica</Text>
                </View>

                <View style={[styles.vaccineTypeContainer, {borderColor: isChecked.spr ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.spr}
                    onValueChange={() => setIsChecked({...isChecked, spr: !isChecked.spr})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.spr ? "#09998c" : "#707070"}}>Triple viral SPR</Text>
                </View>
              </ScrollView>
              
            </View>

            <View style={AuthStylesGlobal.buttonView}>
              <CustomButton
                bgColor={'#A375FF'}
                paddingV={0}
                paddingH={0}
                marginH={0}
                marginV={isIOS ? 2 : 6}
                width={'100%'}
                height={'100%'}
                BorderRadius={10}
                fontFamily={'poppinsBold'}
                fontSize={16}
                textColor={'white'}
                Label={<SetLabel isLoading={isLoading} LabelText={'Confirmar'} Success={Success}/>}
                handlePress={() => {setImmunizationRecord()}}
                haveShadow={true}
                disable={DisableButton}
              />
            </View>
          </View>
        </View>
        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  vaccinesContainer:{
    marginTop: 4,
    height: wp('85%'),
    width: wp('85%'),
    backgroundColor: '#f3f1fe',
    borderRadius: 18,
    borderColor: '#e1defb',
    borderWidth: 1,
  },
  vaccinesTitle:{
    fontSize: 18,
    marginVertical: 14,
    alignSelf: 'center',
  },
  separatorLine:{
    height: 1,
    width: '50%',
    backgroundColor: '#000000',
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: -8,
  },
  vaccineTypeContainer:{
    width: '90%',
    height: hp('6%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    // borderColor: '#e4e3eb',
    alignSelf: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  }
})