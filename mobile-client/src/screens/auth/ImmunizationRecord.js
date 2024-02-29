//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground,BackHandler, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Checkbox from 'expo-checkbox';
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isIOS } from '../../constants';
import { CustomButton, SetLabel, ShowToast, createImmunizationRecord, getPatient } from '../../index';

export const ImmunizationRecord = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused()
  const lng = useSelector(state => state.starter.Language);
  const { t } = useTranslation();
  //! State for the Form.
  const [PatientId, setPatientId] = useState(null);
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

  //! State for the name of the patient.
  const [PatientName, setPatientName] = useState(null);

  const setImmunizationRecord = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const { data } = await createImmunizationRecord(PatientId, isChecked);

      if(data.success){
        //! Show success message.
        ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Registro de vacunación Actualizado.' : 'Immunization Record Updated.' );

        //! Close loading animation
        setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
          setTimeout(() => {
            navigation.navigate('SelectPatientDashboard', {ReloadSelect: true});
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
      ShowToast('my_error', 'Error', lng ? error.response.data.message.es : error.response.data.message.en);
    }
  }

  //\\ Function to get the name of the patient whose are registering.
  const getPatientFunct = async (id) => {
    try {
      const {data} = await getPatient(id);
      setPatientName(`${data.patient[0].First_Names} ${data.patient[0].Last_Names}`);
    } catch (error) {
      console.log(error)
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
    }
  }, [route]);

  useEffect(() => {
    if (PatientId != null){
      getPatientFunct(PatientId);
    }
  }, [PatientId]);

  useEffect(() => {
    setSuccess(false);
    setIsChecked({
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
    })
  }, [isFocused]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#e4e2ff',}}
    behavior={'padding'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor:'#fff' }}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <View style={[AuthStylesGlobal.buttomCameBack]}>
            <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>{t('immunization.step3')}</Text>
          </View>
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')} />
            <Text style={[AuthStylesRegisterU.Tex_md, {fontSize: isIOS ? 28 : 30}]}>{t('immunization.Vaccination')}</Text>
            <View style={[AuthStylesGlobal.cont2,]} >
              <Text style={AuthStylesGlobal.TextCount}>{t('immunization.needchildInfo')}</Text>
            </View>
            <Text style={{fontSize: 16 , fontFamily: 'poppinsRegular'}}> {t('immunization.patient')}: <Text style={{fontWeight: "700"}}>{PatientName}</Text></Text>

            <View style={styles.vaccinesContainer}>
              <Text style={styles.vaccinesTitle}>{t('immunization.select')}</Text>
              <View style={styles.separatorLine}></View>
              <ScrollView>
                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, bgc: !isChecked.bgc })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.bgc ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.bgc}
                    onValueChange={() => setIsChecked({...isChecked, bgc: !isChecked.bgc})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.bgc ? "#09998c" : "#707070"}}>BGC</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, hepatitis: !isChecked.hepatitis })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.hepatitis ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.hepatitis}
                    onValueChange={() => setIsChecked({...isChecked, hepatitis: !isChecked.hepatitis})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.hepatitis ? "#09998c" : "#707070"}}>Hepatitis B</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, poliomielitis: !isChecked.poliomielitis })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.poliomielitis ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.poliomielitis}
                    onValueChange={() => setIsChecked({...isChecked, poliomielitis: !isChecked.poliomielitis})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.poliomielitis ? "#09998c" : "#707070"}}>{t('immunization.polio')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, pentavalente: !isChecked.pentavalente })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.pentavalente ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.pentavalente}
                    onValueChange={() => setIsChecked({...isChecked, pentavalente: !isChecked.pentavalente})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.pentavalente ? "#09998c" : "#707070"}}>{t('immunization.penta')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, rotavirus: !isChecked.rotavirus })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.rotavirus ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.rotavirus} 
                    onValueChange={() => setIsChecked({...isChecked, rotavirus: !isChecked.rotavirus})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.rotavirus ? "#09998c" : "#707070"}}>Rotavirus</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, neumococo: !isChecked.neumococo })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.neumococo ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.neumococo} 
                    onValueChange={() => setIsChecked({...isChecked, neumococo: !isChecked.neumococo})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.neumococo ? "#09998c" : "#707070"}}>{t('immunization.neumococo')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, dtp: !isChecked.dtp })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.dtp ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.dtp} 
                    onValueChange={() => setIsChecked({...isChecked, dtp: !isChecked.dtp})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.dtp ? "#09998c" : "#707070"}}>DPT</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, polio: !isChecked.polio })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.polio ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.polio} 
                    onValueChange={() => setIsChecked({...isChecked, polio: !isChecked.polio})}
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.polio ? "#09998c" : "#707070"}}>{t('immunization.oralPolio')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, antitetanica: !isChecked.antitetanica })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.antitetanica ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.antitetanica} 
                    onValueChange={() => setIsChecked({...isChecked, antitetanica: !isChecked.antitetanica})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.antitetanica ? "#09998c" : "#707070"}}>{t('immunization.anti')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => setIsChecked({ ...isChecked, spr: !isChecked.spr })} style={[styles.vaccineTypeContainer, {borderColor: isChecked.spr ? '#09998c': '#e4e3eb'}]}>
                  <Checkbox
                    value={isChecked.spr}
                    onValueChange={() => setIsChecked({...isChecked, spr: !isChecked.spr})} 
                    style={{marginHorizontal: 16,}}
                  />
                  <Text style={{color: isChecked.spr ? "#09998c" : "#707070"}}>Triple viral SPR</Text>
                </TouchableOpacity>
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