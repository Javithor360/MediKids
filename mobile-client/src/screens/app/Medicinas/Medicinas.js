
//>> IMPORT LIBRERIES
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

//>> IMPORT COMPONENTS
import { ScreenTitle } from '../../../index';
import { isIOS } from '../../../constants';
import { getMedicalPrescriptions } from '../../../index'


export const Medicinas = () => {
    const { t } = useTranslation();
    const isFocused = useIsFocused()
    const [isMainScreen, setIsMainScreen] = useState(true);
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const Patient_id = useSelector(state => state.patient.id);

    //! State for the medical prescriptions
    const [Prescriptions, setPrescriptions] = useState(null);

    const getMPfunct = async () => {
        try {
            const {data} = await getMedicalPrescriptions(jwtToken, Patient_id);

            setPrescriptions(data.Prescriptions);
        } catch (error) {
            console.log(error);
        }
    }

    const getLocaleDateString = (Fechant) => {
        return new Date(Fechant).toLocaleDateString();
    }

    const getDoctor = (Key) => {
        switch (Key) {
            case 1:
                return 'Dr. Esteban Gúzman';
            case 2:
                return 'Dr. Adrian Flores';
            case 3:
                return 'Dra. Fatima Garza';
        }
    }

    const CardComponent = ({Prescription}) => {
        return (
            <View style={styles.card}>
                <View style={{width: '100%', height: '100%', borderBottomColor: '#D6D6D6', paddingHorizontal: 20}}>
                    <View style={styles.IconTextSpc}>
                        <View style={{width: '18%', height: '100%', paddingTop: 8, paddingBottom: 4}}>
                            <Image source={require('../../../../assets/graphic-icons/medication.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                        </View>
                        <View style={styles.spcTitleC}>
                            <Text style={styles.spcTitle}>{Prescription.Medicine_Name}</Text>
                            <Text style={{fontSize: 12, color: '#000' }}>#{Prescription.Medical_Prescription_Code}</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}><View style={styles.line2} /></View>
                    <View>
                        <View style={styles.InfoText} >
                            <Text>
                                <Text style={{ color: '#A375FF', fontWeight: "700", }}>{t('medic.ins')}:</Text>
                                <Text style={{ color: '#707070'}}> {Prescription.Instructions} </Text>
                            </Text>
                            
                        </View>
                        <View style={[styles.InfoText, {flexDirection: 'column', gap: 0}]} >
                            <Text style={{ color: '#A375FF', fontWeight: "700", }} >{t('medic.period')}:</Text>
                            <Text style={{ color: '#707070',}}>{getLocaleDateString(Prescription.Starting_Dose_Date)} - {getLocaleDateString(Prescription.Finishing_Dose_Date)}</Text>
                        </View>
                        <View style={styles.InfoText} >
                            <Text style={{ color: '#A375FF', fontWeight: "700"}}>Dosis:</Text>
                            <Text style={{ color: '#707070',}}>{Prescription.Dose}, {Prescription.Time_Dose}{t('medic.text1')}</Text>
                        </View>
                        <View style={styles.InfoText} >
                            <Text style={{ color: '#A375FF', fontWeight: "700"}}>{t('medic.assigned')}:</Text>
                            <Text style={{ color: '#707070',}}>{getDoctor(Prescription.Doctor_id)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getMPfunct();
    }, [isFocused]);

    return (
        <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}}>
            <ScrollView style={styles.fullScreenContainer}>
                <View style={{backgroundColor:'#fff'}}>
                    <ScreenTitle
                        Label={`${t('medic.title')}`}
                        IconName={"clipboard-text-multiple"}
                        fontSize={20}
                        textColor={'#FFFFFF'}
                        paddingH={30}
                        isMainScreen={isMainScreen}
                    /> 
                    <View style={styles.chooseBanner}>
                        <View style={styles.chooseContent}>
                        
                            <View style={styles.rightTextSctn}>
                                <View style={styles.linee} />
                                <Text style={styles.titleBanner}>{t('medic.medicAct')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardsContainer}>
                        {
                            Prescriptions != null && Prescriptions.length != 0 ?
                                Prescriptions.map((Prescription, i) => {
                                    return (
                                        <CardComponent Prescription={Prescription} key={i}/>
                                    )
                                })
                                :
                                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: hp('15%')}}>
                                        <Image source={require('../../../../assets/icons/not-recipe-2.png')} style={{height: hp('15%'), width: wp('40%'), resizeMode: 'contain', marginLeft: -15}}></Image>
                                        <Text style={{fontSize: 22, color: '#707070', textAlign: 'center', marginTop: 20,}}>{t('medic.medicinant')}</Text>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
  fullScreenContainer:{
    height: '100%',
    marginTop: Constants.statusBarHeight
  },
  safeArea:{
    backgroundColor: '#e4e2ff',
  },
  chooseBanner: {
    height: 100,
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: '#B4B4D6',
    borderRadius: 20,
    borderTopWidth: 8,
    borderTopColor: '#CDCDF3',
    alignItems: 'center',
  },
  chooseContent: {
    width: '95%',
    height: '70%',
    flexDirection: 'row',
    paddingH: wp('10%'),
    marginTop: '2%',
  },
  leftIconSctn: {
      width: '30%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  iconShadow:{
      width: '90%',
      height: '80%',
      backgroundColor: '#B4B4D6',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
  },
  rightTextSctn:{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
  },
  titleBanner: {
      fontSize: 20,
      fontWeight: "600",
      color: '#ffffff',
      marginHorizontal: 8,
      bottom:5,
      width: '100%'
  },
  linee: {
      height: 2,
      width: 60,
      backgroundColor: '#fff',
      marginBottom: 10,
      marginLeft: 8,
  },
  line2:{
    height: 1.5,
    width: '95%',
    backgroundColor: '#707070',
    marginBottom: 10,
    marginTop: -6,
    borderRadius: 10,
  },
  cardsContainer:{
    backgroundColor: '#f8f8f8',
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: 20,
    top: -30,
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    height: 260,
    alignSelf: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    borderBottomColor: '#CDCDF3',
    borderBottomWidth: 5,
    borderColor: '#EBEBEB',
    borderWidth: 1,
    backgroundColor:'#ffff',
    marginBottom: 20,
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 20,
  },
  IconTextSpc: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
  },
  spcTitleC:{
    flexDirection: 'column',
    width: '82%',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: 4
  },
  spcTitle:{
    color: '#707070',
    fontWeight: "600",
    fontSize: 16,
  },
  apptBtn:{
    width: '50%',
    height: 30,
    backgroundColor: '#B4B4D6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    left:'95%',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  apptBtn1:{
    width: '50%',
    height: 30,
    backgroundColor: '#B4B4D6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    left:'25%',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  InfoText:{
    flexDirection:'row',
    textAlign: 'justify',
    gap:5,
    width: '102%',
    marginBottom: isIOS ? 10 : 8
  },
 
});

