//>> Importing libraries
import { Text, View, Image, ImageBackground, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isIOS } from '../../constants';
import { CheckresetPassCode, CustomButton, SetLabel, ShowToast } from '../../index';
import InputCodeField from '../../components/InputCodeField';


export const ForgotPassCodeScreen = () => {
    const navigation = useNavigation();
    const lng = useSelector(state => state.starter.Language);
    const { t } = useTranslation();
    //! Verify Code State
    const [verifyCode, setVerifyCode] = useState(null);

    //! States for th functioning handler.
    const [Success, setSuccess] = useState(false);
    
    //! States for statement
    const [isLoading, setIsLoading] = useState(false);

    //! State For disable the button
    const [DisableBtn, setDisableBtn] = useState(false);

    //* Main Function to verify the Code.
    const verifyUserCode = async () => {
    try {
        //! set the Loading animation
        setIsLoading(true);
    
        //! Server Query
        const {data} = await CheckresetPassCode(verifyCode);
    
        if(data.success){
            //! Show success message.
            ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Código Verificado correctamente' : 'Code Verified Successfully');
    
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
        ShowToast('my_error', 'Error', lng ? error.response.data.message.es : error.response.data.message.en);
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
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    }, []);

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
                    <Text style={AuthStylesRegisterU.Tex_md}>{t('forgotpasswordCod.passwordcode')}</Text>
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
                            Label={<SetLabel LabelText={'Verificar'} Success={Success} isLoading={isLoading} />}
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