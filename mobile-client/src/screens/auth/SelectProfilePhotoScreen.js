//>> Importing libraries
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, BackHandler} from 'react-native';
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
import  { AuthStylesGlobal, AuthStylesRegisterU, SelectProfilePhoto }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, SetLabel, ShowToast, uploadPFResponsible } from '../../index';
import { changePerfilPhoto } from '../../store/slices/responsibleSlice';
import { uploadFile } from '../../../firebaseConfig';

//! CREATE SHIMMER
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const SelectProfilePhotoScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const responsible = useSelector(state => state.responsible);
    const dispatch = useDispatch();
    const route = useRoute();
    const lng = useSelector(state => state.starter.Language);
    
    const [ImageEl, setImageEl] = useState(null);

    //! States for th functioning handler.
    const [Success, setSuccess] = useState(false);

    //! States for statement
    const [isLoading, setIsLoading] = useState(false);

    //! States for set if we have the button
    const [HaveBtn, setHaveBtn] = useState(true);

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
            
            const FileName = await uploadFile(manipImage.uri, 'perfil_photos');
            const {data} = await uploadPFResponsible(FileName, responsible.Email);
            
            if(data.success){
                dispatch(changePerfilPhoto({
                    ProfilePhotoUrl: data.url,
                    Profile_Photo_Name: FileName,
                }));
                ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Foto subida correctamente' : 'Photo uploaded Correctly.');
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        if(HaveBtn){
                            navigation.goBack();
                        } else {
                            navigation.navigate('RegisterPatientScreen');
                        }
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

    //! check the parameters of the navigation.
    useEffect(() => {
        if (route.params != undefined) {
            setHaveBtn(route.params.haveButton);
            if(HaveBtn != undefined){
                BackHandler.addEventListener('hardwareBackPress', () => {
                    return true;
                })
            }
            
        } 
    }, [route]);

    useEffect(() => {
        if(HaveBtn != undefined){
            navigation.setOptions({
              gestureEnabled: false
            })
        }
    }, [navigation]);

    useEffect(() => {
        setTimeout(() => { setShimmerTime(true) }, 1000);
    }, []);

    return (
    <>
        <ScrollView style={[AuthStylesGlobal.mainContainer, {backgroundColor: '#e4e2ff'}]}>
            <View style={[AuthStylesGlobal.topWaveContainer, {backgroundColor: '#fff'}]}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
                {
                    HaveBtn ?
                    <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={17} color="white" />
                        <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>{t('selectPhoto.back')}</Text>
                    </TouchableOpacity>
                    :
                    <View style={AuthStylesGlobal.buttomCameBack}>
                        <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>{t('selectPhoto.step1')}</Text>
                    </View>
                }
            </View>
            <View style={[AuthStylesGlobal.contentContainer, {backgroundColor: '#fff'}]} >
                <View style={AuthStylesGlobal.formContent} >
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')} />
                    <Text style={AuthStylesRegisterU.Tex_md}>{t('selectPhoto.title')}</Text>
                    <View style={AuthStylesGlobal.cont2} >
                        <Text style={AuthStylesGlobal.TextCount}>{t('selectPhoto.text2')}</Text>
                    </View>
                    <View style={[SelectProfilePhoto.hr, SelectProfilePhoto.customMarginB_2]} />
                    <View style={SelectProfilePhoto.profilePhotoWrapper}>
                        <ShimmerPlaceHolder visible={ShimmerTime} style={{width: '100%', height: '100%'}}>
                            {
                                ImageEl ?
                                    <ImageBackground style={SelectProfilePhoto.profilePhotoImage} source={{uri: ImageEl}} />
                                    :
                                    <Image source={{uri: responsible.ProfilePhotoUrl}} style={{width:'100%', height:'100%'}}/>

                            }
                        </ShimmerPlaceHolder>
                    </View>
                    <TouchableOpacity disabled={DisableButton} style={SelectProfilePhoto.uploadBtn} activeOpacity={0.5} onPress={() => pickeImage()}>
                        <MaterialIcons name="drive-folder-upload" size={24} color="#707070" />
                        <Text style={SelectProfilePhoto.uploadTxt}>{t('selectPhoto.selectBtn')}</Text>
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
                            Label={<SetLabel LabelText={t('selectPhoto.changeBtn')} Success={Success} isLoading={isLoading} />}
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