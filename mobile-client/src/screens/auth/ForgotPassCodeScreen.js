//>> Importing libraries
import { Text, View, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isIOS } from '../../constants';
import { CheckresetPassCode, CustomButton } from '../../index';
import InputCodeField from '../../components/InputCodeField';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


export const ForgotPassCodeScreen = () => {
    const navigation = useNavigation();

    //! Verify Code State
    const [verifyCode, setVerifyCode] = useState(null);

    //! States for th functioning handler.
    const [Success, setSuccess] = useState(false);
    
    //! States for statement
    const [isLoading, setIsLoading] = useState(false);

    //! State For disable the button
    const [DisableBtn, setDisableBtn] = useState(false);

    //! Show the Emergent Message (toast).
    const showToast = (type, text1, text2) => {
        Toast.show({
        type:type,
        text1:text1,
        text2:text2,
        duration: 4000
        })
    }

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
        return <Text>Verificar</Text>
        }
    }

    //! Main Function to verify the Code.
    const verifyUserCode = async () => {
    try {
        //! set the Loading animation
        setIsLoading(true);
    
        //! Server Query
        const {data} = await CheckresetPassCode(verifyCode);
    
        if(data.success){
            //! Show success message.
            showToast('my_success', 'Éxito', 'Código Verificado correctamente');
    
            //! Close loading animation
            setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
                setTimeout(() => {
                    navigation.navigate('ResetPasswordScreen');
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
        console.log(error);
        showToast('my_error', 'Error', error.response.data.message);
        }
    }
    
    //! Disable the send buttom
    useEffect(() => {
        if(isLoading){
        setDisableBtn(true);
        } else if(Success){
        setDisableBtn(true);
        } else {
        setDisableBtn(false);
        }
    }, [isLoading, Success]);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        })
    }, [navigation]);

    return (
    <>
        <View style={AuthStylesGlobal.mainContainer}>
            <View style={AuthStylesGlobal.topWaveContainer}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/>
            </View>
            <View style={AuthStylesGlobal.contentContainer} >
                <View style={AuthStylesGlobal.formContent} >
                    <Image style={AuthStylesGlobal.logoImage2} source={require('../../../assets/logos/Logotype_Colored.png')}  />
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/graphic-icons/reset-pass.png')}  />
                    <Text style={AuthStylesRegisterU.Tex_md}>Código de cambio de contraseña</Text>
                    <Text>Ingrese el codigo enviado a su Email.</Text>

                    <InputCodeField value={verifyCode} setValue={setVerifyCode} />
                    
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
                            Label={setLabel()}
                            handlePress={() => {verifyUserCode()}}
                            haveShadow={true}
                            disable={DisableBtn}
                        /> 
                    </View>
                </View>
            </View>
            <View style={AuthStylesGlobal.bottomWaveContainer}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
            </View>
        </View>
    </>
)}