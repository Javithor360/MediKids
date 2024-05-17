import { useEffect } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native'
import { useTranslation } from 'react-i18next';
//Libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const PendingAppointment = ({appointmentInfo}) => {
    const { t } = useTranslation();
    const getWeek = () => {
        let objWeek = JSON.parse(appointmentInfo.Week);
        return `${objWeek.startDay} - ${objWeek.finalDay}`
    }
    return (
        <>
            <Text style={styles.requestMainTitle}>{t('pending.text1')}</Text>
            <Image source={require('../../../assets/graphic-icons/review.png')} style={styles.imageIconLol}/>
            <Text style={styles.description}>{t('pending.text2')}.</Text>
            <View style={{width: '80%', backgroundColor: '#d8d8d8', height: 2, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, borderRadius: 10}}/>
            <View style={{marginBottom: 20, width: '85%', marginLeft: 'auto', marginRight:'auto'}}>
                <Text style={{textAlign: 'center', fontFamily: 'poppinsBold', fontSize: 15, color:'#46929B', marginBottom: 6}}>{t('pending.text3')}:</Text>
                <Text style={{textAlign: 'center', color: '#707070',marginBottom:15}}>{getWeek()}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    requestMainTitle:{
        fontSize: 20,
        fontWeight: "700",
        color: '#46929B',
        alignSelf: 'center',
        marginVertical: 16,
    },
    imageIconLol: {
        width: wp('15%'),
        height: wp('15%'),
        alignSelf: 'center',
    },
    description:{
        width: '80%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 13,
        color: '#707070',
        marginBottom: 20,
    }
})