//>> Importing libraries
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {manipulateAsync} from 'expo-image-manipulator'
import { useTranslation } from 'react-i18next';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU, SelectProfilePhoto } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, SetLabel, ShowToast, uploadPFPatient } from '../../index';
import { changePFPatient } from '../../store/slices/patientSlice';
import { uploadFile } from '../../../firebaseConfig';

//! CREATE SHIMMER
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const SelectPatientPPScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const Patient = useSelector(state => state.patient);
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const dispatch = useDispatch();
    const lng = useSelector(state => state.starter.Language);
    
    const [ImageEl, setImageEl] = useState(null);

    //! States for th functioning handler.
    const [Success, setSuccess] = useState(false);

    //! States for statement
    const [isLoading, setIsLoading] = useState(false);

    //! State For disable the button
    const [DisableButton, setDisableButton] = useState(false);

    //! Shimmer State
    const [ShimmerTime, setShimmerTime] = useState(false);

    //! Function to select the profile photo from the galery of the user.
    const pickeImage = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5
            })

            if(!result.canceled){
                setImageEl(result.uri);
            }
        } else {
            //! HOW TO DO THE ERROR HANDLING?
        }
    }

    //! Function to upload the profile photo to the backend.
    const uploadImage = async (ImgUri) => {
        try {
            setIsLoading(true);

            //>> Compact te image
            const manipImage = await manipulateAsync(
                ImgUri,
                [],
                {compress: 0.9}
            )

            const FileName = await uploadFile(manipImage.uri, 'patient_pf');
            const {data} = await uploadPFPatient(jwtToken, Patient.id, FileName);
            if(data.success){
                dispatch(changePFPatient({
                    Profile_Photo_Url: data.url,
                    Profile_Photo_Name: data.name,
                }));
                ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Foto subida correctamente.' : 'Photo uploaded successfully.');
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        navigation.goBack();
                    }, 5000);
                }, 4000);
                
            }
        } catch (error) {
            console.log(error);
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
        setTimeout(() => { setShimmerTime(true) }, 1000);
      }, []);

    return (
    <>
        <ScrollView style={[AuthStylesGlobal.mainContainer, {backgroundColor: '#e4e2ff'}]}>
            <View style={[AuthStylesGlobal.topWaveContainer, {backgroundColor: '#fff'}]}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
                <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={17} color="white" />
                    <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>{t('selectPhotoPatient.back')}</Text>
                </TouchableOpacity>
            </View>
            <View style={[AuthStylesGlobal.contentContainer, {backgroundColor: '#fff'}]} >
                <View style={AuthStylesGlobal.formContent} >
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')} />
                    <Text style={AuthStylesRegisterU.Tex_md}>{t('selectPhotoPatient.title')}</Text>
                    <View style={AuthStylesGlobal.cont2} >
                        <Text style={AuthStylesGlobal.TextCount}>{t('selectPhotoPatient.text2')}</Text>
                    </View>
                    <View style={[SelectProfilePhoto.hr, SelectProfilePhoto.customMarginB_2]} />
                    <View style={SelectProfilePhoto.profilePhotoWrapper}>
                        <ShimmerPlaceHolder visible={ShimmerTime} style={{width: '100%', height: '100%'}}>
                            {
                                ImageEl ?
                                    <ImageBackground style={SelectProfilePhoto.profilePhotoImage} source={{uri: ImageEl}} />
                                    :
                                    <Image source={{uri: Patient.Profile_Photo_Url}} style={{width:'100%', height:'100%'}}/>

                            }
                        </ShimmerPlaceHolder>
                    </View>
                    <TouchableOpacity disabled={DisableButton} style={SelectProfilePhoto.uploadBtn} activeOpacity={0.5} onPress={() => pickeImage()}>
                        <MaterialIcons name="drive-folder-upload" size={24} color="#707070" />
                        <Text style={SelectProfilePhoto.uploadTxt}>{t('selectPhotoPatient.selectBtn')}</Text>
                    </TouchableOpacity>
                    <View style={[SelectProfilePhoto.hr, SelectProfilePhoto.customMarginB_1]} />
                    <View style={AuthStylesGlobal.buttonView}>
                        <CustomButton 
                            bgColor={'#A375FF'}
                            paddingV={0}
                            paddingH={0}
                            marginH={0}
                            marginV={isIOS ? 2 : 6}
                            width={'100%'}
                            height={30}
                            BorderRadius={10}
                            fontFamily={'poppinsBold'}
                            fontSize={16}
                            textColor={'white'}
                            Label={<SetLabel LabelText={t('selectPhotoPatient.changeBtn')} Success={Success} isLoading={isLoading} />}
                            disable={DisableButton}
                            handlePress={() => {
                                if(ImageEl != null) {
                                    uploadImage(ImageEl);
                                } else {
                                    //! ERRROR HANDLING
                                    ShowToast('my_error', 'Error', lng ? 'No se ha seleccionado una foto.' : 'No photo has been selected.');
                                }
                            }}
                            haveShadow={true}
                        /> 
                    </View>
                </View>
            </View>
            <View style={[AuthStylesGlobal.bottomWaveContainer, {backgroundColor: '#fff'}]}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
            </View>
        </ScrollView>
    </>
)}