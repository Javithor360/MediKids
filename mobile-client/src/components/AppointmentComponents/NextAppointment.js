import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
//Libraries
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export const NextAppointment = ({appointmentInfo, doctor}) => {
    const { t } = useTranslation();
    const getDate = () => { return new Date(appointmentInfo.Date).toLocaleDateString() };

    return (
        <>
            <Text style={styles.requestMainTitle}>{t('next.text1')}</Text>
            <View style={styles.contentContainer}>
                <View style={styles.iconContainer}><Image style={styles.imageLolIcon} source={require('../../../assets/graphic-icons/next_appointment_2.png')}></Image></View>
                <View style={styles.separateWays}></View>
                <View style={styles.containerTextDetails}>
                    <Text style={styles.textNxt}>{t('next.text2')}:</Text>
                    <View style={styles.dateDetailsContainer}>
                        <View style={styles.dateWIcon}>
                            <MaterialCommunityIcons name="calendar-week" size={20} color="#46929B" />
                            <Text style={styles.textsemiBold}>{t('next.text3')}:</Text>
                            <Text style={{color:'#707070'}}>{ getDate() }</Text>
                        </View>
                        <View style={styles.dateWIcon}>
                            <MaterialCommunityIcons name="clock" size={20} color="#46929B" />
                            <Text style={styles.textsemiBold}>{t('next.text4')}:</Text>
                            <Text style={{color:'#707070'}}>{appointmentInfo.Hour} { }</Text>
                        </View>
                    </View>
                    <View style={styles.docInfoDetails}>
                        <MaterialCommunityIcons name="stethoscope" size={20} color="#46929B" />
                        <Text style={styles.textsemiBold}>{t('next.text5')}:</Text>
                        <Text style={{color:'#707070'}}>{doctor}</Text>
                    </View>
                </View>
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
    contentContainer: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    imageLolIcon: {
        width: wp('15%'),
        height: wp('15%')
    },
    iconContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    separateWays: {
        height: '90%',
        width: 1,
        backgroundColor: '#D6D6D6',
        alignSelf: 'center',
    },
    textNxt: {
        fontSize: 16,
        fontWeight: "700",
    },
    containerTextDetails: {
        height: '100%',
        gap: 6
    },
    dateDetailsContainer:{
        flexDirection: 'column',
        gap: 6
    },
    dateWIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    docInfoDetails:{
        flexDirection: 'row',
        gap: 4
    },
    textsemiBold: {
        fontWeight: "600",
        color: '#707070',
        fontSize: 15,
    }
})