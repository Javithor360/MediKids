import { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../localization/i18n'; // Ruta correcta a tu archivo i18n.js
import { ChangeLanguages } from '../store/slices/starterSlice';
import { useDispatch } from 'react-redux';

function LanguageSelector({closeModal}) {
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    if (lng == 'es') { dispatch(ChangeLanguages(true)) }
    else { dispatch(ChangeLanguages(false)) }
    
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  const handleModalShow = () => {
    setLngModal(false);
  };

  return (
    <View style={styles.container}>
        <View style={styles.modalContentContainer}>
            <View style={styles.titleC}>
                <Text style={styles.LngTitleCont}>{t('selectLng.title')}</Text>
            </View>
            
            <TouchableOpacity onPress={() => changeLanguage('en')} style={[
                    styles.languageButton,
                    activeLanguage === 'en' && styles.activeButton,
                ]}>
                <Text style={{fontWeight: "600", fontSize: 16, }}>{t('selectLng.lng_name_en')}</Text>
                <Text style={{fontSize: 12, color: '#707070',}}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('es')} style={[
                    styles.languageButton,
                    activeLanguage === 'es' && styles.activeButton,
                ]}>
                <Text style={{fontWeight: "600", fontSize: 16, }}>{t('selectLng.lng_name_es')}</Text>
                <Text style={{fontSize: 12, color: '#707070',}}>Español</Text>
            </TouchableOpacity>
            <View style={styles.titleC2}>
                <TouchableOpacity style={styles.doneBtn} onPress={closeModal}><Text style={{marginTop: 16, fontWeight: "600", fontSize: 16, color: '#A375FF', paddingHorizontal: 20,}}>{t('selectLng.btn')}</Text></TouchableOpacity>
            </View>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(1,1,1, 0.5)',
    },
    modalContentContainer:{
        width: '60%',
        // height: '40%',
        backgroundColor: 'white',
        elevation: 4,
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    },
    LngTitleCont:{
        marginVertical: 16,
        marginLeft: 10,
        fontSize: 18,
        color: '#000000',
        fontWeight: "600",
    },
    titleC: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#c6c6c6',
        marginBottom: 20,
    },
    titleC2: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#c6c6c6',
        marginBottom: 20,
    },
    languageButton: {
        width: '80%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginBottom: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#c6c6c6',
        borderWidth: 1,
        paddingLeft: 10,
    },
    activeButton: {
        borderColor: '#A375FF',
        borderWidth: 1.5,
    },
    doneBtn: {
        alignSelf: 'center',
    }
})

export default LanguageSelector;