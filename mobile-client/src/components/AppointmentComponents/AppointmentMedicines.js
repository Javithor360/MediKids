
//>> IMPORT LIBRARIES
import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Octicons, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

//>> IMPORT COMPONENTS
import { getMedicinesAppmtResult } from '../../index'

export const AppointmentMedicines = ({RecordCode}) => {
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const { t } = useTranslation();
    //! Medicines asigned state
    const [Medicines, setMedicines] = useState(null);

    //! Function to get the Medicines.
    const getMedicinesResult = async () => {
        try {
            const {data} = await getMedicinesAppmtResult(jwtToken, RecordCode)
            setMedicines(data.Medicines);
        } catch (error) {
            console.log(error)
        }
    }

    //! Get the Date to String.
    const getLocaleDateString = (Fechant) => {
        return new Date(Fechant).toLocaleDateString();
    }

    //! Get Medicine Card.
    const GetMedicineCard = ({Medicine}) => {
        return (
            <View style={styles.individualMedicineCard}>
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginTop: 5,}}>
                    <Octicons name="dot-fill" size={20} color="#F8991E" /> 
                    <Text style={styles.medicineTitle}>{Medicine.Medicine_Name}</Text>
                </View>

                <View style={{width: '90%', alignSelf: 'center', gap: 10, paddingVertical: 16}}>
                    <Text style={{color: '#707070'}}><Text style={{fontWeight: "600" , color: '#F8991E',}}>{t('appointmentMedicines.text1')}: </Text>{Medicine.Description}</Text>

                    <Text style={{color: '#707070'}}><Text style={{fontWeight: "600" , color: '#F8991E',}}>{t('appointmentMedicines.text2')}: </Text>{Medicine.Dose}, {Medicine.Time_Dose} {t('appointmentMedicines.text5')}</Text>

                    <Text style={{color: '#707070'}}><Text style={{fontWeight: "600" , color: '#F8991E',}}>{t('appointmentMedicines.text3')}: </Text>{Medicine.Instructions}</Text>

                    <Text style={{color: '#707070'}}><Text style={{fontWeight: "600" , color: '#F8991E'}}>{t('appointmentMedicines.text4')}: </Text>{getLocaleDateString(Medicine.Starting_Dose_Date)} - {getLocaleDateString(Medicine.Finishing_Dose_Date)}</Text>
                </View>
            </View>
        );
    }

    useEffect(() => {
        getMedicinesResult();
    }, []);

  return (
    <>
        <Text style={[styles.requestMainTitle, styles.colorYellow]}>{t('appointmentMedicines.text6')}</Text>
        {
            (Medicines != null && Medicines.length != 0) ?
                Medicines.map((medicine, i) => {
                    return <GetMedicineCard key={i} Medicine={medicine}/>
                })
                :
                <View style={{width: '100%', paddingHorizontal: 20, marginBottom:20, alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', marginBottom: 6, fontFamily: 'poppinsRegular', fontSize: 16}}>{t('appointmentMedicines.text7')}</Text>
                    <Entypo name="notifications-off" size={60} color="#f99b21" />
                </View>
        }
        <View style={{marginTop: 10, width: "100%"}}></View>
    </>
  )
}

const styles = StyleSheet.create({
    requestAppointmentContainer:{
        // height: 800,
        width: wp('80%'),
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 30,
        borderTopWidth: 9,
        overflow: 'hidden',
    },
    btcYellow:{
        borderTopColor: '#FCC277',
    },
    shadowC:{
        //iOS
        shadowColor: '#707070',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#707070',
    },
    requestMainTitle:{
        fontSize: 20,
        fontWeight: "700",
        alignSelf: 'center',
        marginVertical: 16,
    },
    colorGreen: {
        color: '#46929B',
    },
    colorYellow:{
        color: '#F8991E',
    },
    singleItemC2: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    diagnosDescC: {
        width: '95%',
        alignSelf: 'center',
    },
    individualMedicineCard: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        paddingRight: 16,
        marginBottom: 35,
        //iOS
        shadowColor: '#707070',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#707070',
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },
    medicineTitle: {
       fontSize: 16, 
        color: '#F8991E',
    }
})