//>> Importing libraries
import { Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterU, SelectProfilePhoto }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, uploadPFResponsible } from '../../index';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ActivityIndicator } from 'react-native-paper';
import { changePerfilPhoto } from '../../store/slices/responsibleSlice';

export const SelectProfilePhotoScreen = () => {
    const navigation = useNavigation();
    const responsible = useSelector(state => state.responsible);
    const dispatch = useDispatch();
    
    const [ImageEl, setImageEl] = useState(null);

    //! States for th functioning handler.
    const [Success, setSuccess] = useState(false);

    //! States for statement
    const [isLoading, setIsLoading] = useState(false);

    //* Function to handle the label animation.
    const setLabel = () => {
        if(isLoading){
        //? Loading Animation
        return <ActivityIndicator color='white' />
        } else if(!isLoading && Success){ 
        //? Success Label
        return <><Entypo name="check" size={24} color="white" /><Text>Completado</Text></>
        } else if(!isLoading && !Success){
        //? Default Label
        return 'Registrarse'
        }
    }

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
    const uploadImage = async (uri) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image',{
                uri: uri,
                type: 'image/jpeg',
                name: 'image.png',
            })
            formData.append('Email', responsible.Email)
            const {data} = await uploadPFResponsible(formData);
            if(data.success){
                dispatch(changePerfilPhoto(data.url));
                Toast.show({
                    type:'my_success',
                    text1: 'Éxito',
                    text2: 'foto subida correctamente',
                    duration: 4000,
                })
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        navigation.navigate('ApplicationTab');
                    }, 5000);
                }, 4000);
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
        <View style={AuthStylesGlobal.mainContainer}>
            <View style={AuthStylesGlobal.topWaveContainer}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
                <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.navigate('WelcomeScreen')}>
                <MaterialIcons name="arrow-back-ios" size={17} color="white" />
                <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
                </TouchableOpacity>
            </View>
            <View style={AuthStylesGlobal.contentContainer} >
                <View style={AuthStylesGlobal.formContent} >
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
                    <Text style={AuthStylesRegisterU.Tex_md}>Seleccionar foto de perfil</Text>
                    <View style={AuthStylesGlobal.cont2} >
                        <Text style={AuthStylesGlobal.TextCount}>Para mayor seguridad, coloca una fotografia que pueda identificarte.</Text>
                    </View>
                    <View style={[SelectProfilePhoto.hr, SelectProfilePhoto.customMarginB_2]} />
                    <View style={SelectProfilePhoto.profilePhotoWrapper}>
                        <ImageBackground style={SelectProfilePhoto.profilePhotoImage} source={ImageEl ? {uri: ImageEl} : {uri: responsible.ProfilePhotoUrl}} />
                    </View>
                    <TouchableOpacity style={SelectProfilePhoto.uploadBtn} activeOpacity={0.5} onPress={() => pickeImage()}>
                        <MaterialIcons name="drive-folder-upload" size={24} color="#707070" />
                        <Text style={SelectProfilePhoto.uploadTxt}>Seleccionar</Text>
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
                            Label={setLabel()}
                            handlePress={() => {
                                // console.log(ImageEl);
                                if(ImageEl != null) {
                                    // navigation.navigate('ApplicationTab');
                                    uploadImage(ImageEl);
                                } else {
                                    //! ERRROR HANDLING
                                    Toast.show({
                                        type:'my_error',
                                        text1: 'Error',
                                        text2: 'No se ha seleccionado una foto',
                                        duration: 4000,
                                    })
                                }
                            }}
                            haveShadow={true}
                        /> 
                    </View>
                </View>
            </View>
            {/* <View style={AuthStylesGlobal.bottomWaveContainer}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
            </View> */}
        </View>
    </>
)}