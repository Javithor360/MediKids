
//>> IMPORT LIBRERIES
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons, AntDesign, Feather, FontAwesome5, Octicons } from '@expo/vector-icons'; 
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder'

//>> IMPORT COMPONENTS
import { ScreenTitle } from '../../../components/ScreenTitleHook';
import { getImmunizationRecord } from '../../../index'
import { differenceInDays, differenceInMonths } from 'date-fns';

//>> Constants
const { height } = Dimensions.get('window');

//! CREATE SHIMMER
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const PatientPerfilScreen = () => {
    const { t } = useTranslation();
    const lng = useSelector(state => state.starter.Language);
    const navigation = useNavigation();
    const PatientData = useSelector(state => state.patient);
    //! State tp Vaccines Array.
    const [ShowVaccines, setShowVaccines] = useState(null);

    //! Function to get the birth date of the patient.
    const getBirthDate = () => new Date(PatientData.Birth_Date).toLocaleDateString();

      //! Shimmer State
  const [ShimmerTime, setShimmerTime] = useState(false);

    //! Get Patient Age
    const getPatientAge = (ag, bd) => {
        if (ag <= 0) {
            let date = new Date(bd);
            const Months = differenceInMonths(new Date(), date);
            const Days = differenceInDays(new Date(), date);
            if (Days > 31) {
              return `${Months} ${Months > 1 ? `${lng ? 'Meses' : 'Months'}` : `${lng ? 'Mes' : 'Month'}`}`
            } else {
              return `${Days} ${Days > 1 ? `${lng ? 'Días' : 'Days'}` : `${lng ? 'Dia' : 'Day'}`}`
            }
        } else {
            return`${ag} ${ag > 1 ? `${lng ? 'Años' : 'Years'}` : `${lng ? 'Año' : 'Year'}`}`
        }
    }

    //! function to get the Immunization Record.
    const getVaccinesRecord = async () => {
        try {
            const {data} = await getImmunizationRecord(PatientData.id);
            setShowVaccines([
                {Name: 'Hepatitis A', State: data.immunization_record[0].Vaccine_Hepatitis_A},
                {Name: `${lng ? 'Vacuna BCG' : 'BCG Vaccine'}`, State: data.immunization_record[0].Vaccine_BGC},
                {Name: 'Poliomielitis', State: data.immunization_record[0].Vaccine_Poliomielitis},
                {Name: 'Pentavalente', State: data.immunization_record[0].Vaccine_Pentavalente},
                {Name: 'Rotavirus', State: data.immunization_record[0].Vaccine_Rotavirus},
                {Name: 'Neumococo', State: data.immunization_record[0].Vaccine_Neumococo},
                {Name: `${lng ? 'Vacuna DPT' : 'DPT Vaccine'}`, State: data.immunization_record[0].Vaccine_DPT},
                {Name: `${lng ? 'Vacuna Polio Oral' : 'Polio Oral Vaccine'}`, State: data.immunization_record[0].Vaccine_Polio_Oral},
                {Name: 'Antitetanica', State: data.immunization_record[0].Vaccine_Antitetanica},
                {Name: 'Triple Viral SPR', State: data.immunization_record[0].Vaccine_Triple_Viral_SPR},
            ])
        } catch (error) {
            console.log(error);
        }
    }
    
    //! Get the Vaccines Component
    const GetVaccinesCompt = ({VaccineName, VaccineState, i}) => {
        return (
            <>
                <View style={[styles.vaccineCard, {borderColor: VaccineState ? '#09998c' : '#FF5252', marginBottom: i == 9 ? 45 : 10}]} key={i}>
                    <Text style={styles.vacTitle}>{VaccineName}</Text>
                    {
                        VaccineState ?
                            <MaterialIcons name="check-circle-outline" size={24} color="#09998c" style={{alignSelf: 'center',}}/>
                            :
                            <Feather name="x-circle" size={24} color="#FF5252" style={{alignSelf: 'center'}}/>
                    }
                </View>
            </>
        )
    }

    useEffect(() => {
        getVaccinesRecord();
        setTimeout(() => { setShimmerTime(true) }, 1000);
    }, []);
    
    return (
        <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{}}>
            <ScrollView style={styles.MainContainer}>
                <View style={{backgroundColor:'#fff'}}>
                    <ScreenTitle
                        Label={`${t('patientperfil.title')}`}
                        IconName={"account-child"}
                        fontSize={20}
                        textColor={'#FFFFFF'}
                        paddingH={40}
                    />
                    <View style={styles.containPhoto}>
                        <View style={styles.profilePhotoWrapper}>
                            <ShimmerPlaceHolder visible={ShimmerTime} style={{width: '100%', height: '100%'}}>
                                <Image source={{uri: PatientData.Profile_Photo_Url}} style={{width:'100%', height:'100%'}}/>
                            </ShimmerPlaceHolder>
                        </View>
                    </View>
                    <View style={styles.ContainerView}>
                        <Text style={styles.DatosText}>{t('patientperfil.patientData')}</Text>
                        <View style={styles.InfoContainer}>
                            <View style={styles.ContainCardText}>
                                <View style={{flexDirection: 'row'}}>
                                    <AntDesign name="profile" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                    <Text style={styles.TextForImput}>{t('patientperfil.givenNames')}:</Text>
                                </View>
                                <Text style={styles.TextWritted}>{PatientData.FirstNames} {PatientData.LastNames}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View style={styles.ContainCardText}>
                                <View style={{flexDirection: 'row',}}>
                                    <Octicons name="id-badge" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                    <Text style={styles.TextForImput}>{t('patientperfil.cod')}:</Text>
                                </View>
                                <Text style={styles.TextWritted}>{PatientData.Patient_Code}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View style={styles.ContainCardText}>
                                <View style={{flexDirection: 'row',}}>
                                    <MaterialCommunityIcons name="calendar-outline" size={24} color="#7225f9" marginLeft='5%' marginTop='1%'/>
                                    <Text style={styles.TextForImput}>{t('patientperfil.birthdate')}:</Text>
                                </View>
                                <Text style={styles.TextWritted}>{getBirthDate()}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View style={styles.ContainCardText}>
                                <View style={{flexDirection: 'row',}}>
                                    <MaterialIcons name="person-outline" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                    <Text style={styles.TextForImput}>{t('patientperfil.gen')}:</Text>
                                </View>
                                <Text style={styles.TextWritted}>{PatientData.Gender}</Text>
                            </View>
                            <View style={styles.line}></View>

                            <View style={styles.ContainCardText}>
                                <View style={{flexDirection: 'row',}}>
                                    <MaterialCommunityIcons name="timeline-plus-outline" size={24} color="#7225f9" marginLeft='5%' marginTop='1%'/>
                                    <Text style={styles.TextForImput}>{t('patientperfil.age')}:</Text>
                                </View>
                                <Text style={styles.TextWritted}>{getPatientAge(PatientData.Age, PatientData.Birth_Date)}</Text>
                            </View>
                        </View>
                        <View style={styles.lineBig}></View>

                        <Text style={[styles.DatosText, {marginTop: '7%'}]}>{t('patientperfil.VaccinesRecord')}</Text>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.InfoContainer, {backgroundColor: '#CECEF6', maxHeight: 550, height: 600 }]}>
                            {
                                ShowVaccines != null &&
                                    ShowVaccines.map((Vaccine, i) => {
                                        return <GetVaccinesCompt VaccineName={Vaccine.Name} VaccineState={Vaccine.State} i={i} key={i}/>
                                    })
                            }
                        </ScrollView>

                        <View style={styles.lineBig}></View>
                        <Text style={[styles.DatosText, {marginTop: '7%'}]}>{t('patientperfil.Act')}</Text>
                        <View style={{width: '100%', height: 70, marginTop: '2%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => {navigation.navigate('SelectPatientPPScreen')}} style={[{ height: '75%',width: '90%',borderRadius: 15,backgroundColor: '#FFDEB4',alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10}, styles.ButtomShadow]}>
                                <FontAwesome5 name="user-circle" size={24} color="#434343" />
                                <Text style={{color: '#434343', fontSize: 16}}>{t('patientperfil.changepic')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
vaccineCard: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 50,
    marginTop: 10,
    backgroundColor: '#fafafa',
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
scrollStyles: {
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
vacTitle: {
    fontSize: 16,
    paddingVertical:9,
    alignSelf: 'center',
},
ContainerView: {
    backgroundColor:'#FFFFFF',
    marginTop:-70,
    paddingTop: '20%',
    //iOS
    shadowColor: '#BBBBBB',
    shadowOpacity: 0.115,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowOffset: { width: 0, height: -6 },
    shadowColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    height: height + 700,
},
InfoContainer: {
    backgroundColor: '#F4F4F4',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
DatosText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#000',
    textAlign: 'center',
    fontStyle:'italic',
},
MainContainer:{
    height:'100%',
    marginTop: Constants.statusBarHeight
},
line:{
    backgroundColor:'#fff',
    height: 2,
    width:'90%',
    alignSelf:'center',
    marginVertical: 15
},
lineBig:{
    backgroundColor:'#707070',
    height: 3,
    width:'80%',
    alignSelf:'center',
    marginTop: '10%',
    borderRadius: 10
},
TextForImput:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#7225f9',
},
TextWritted:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
},
ButtomShadow:{
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
containPhoto:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-5%',
    zIndex: 1000
},
profilePhotoWrapper:{
    height: 130,
    width: 130,
    marginVertical: '2%',
    borderRadius: 100,
    overflow: 'hidden',
 },
 profilePhotoImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
 },
})