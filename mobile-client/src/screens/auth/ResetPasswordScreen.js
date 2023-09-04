//>> Importing libraries
import { Text, View, Image, TextInput, ImageBackground, BackHandler} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isIOS } from '../../constants';
import { CustomButton, ResetPasswordQuery, SetLabel, ShowToast } from '../../index';


export const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const lng = useSelector(state => state.starter.Language);
    const { t } = useTranslation();
    //\\ Get the email from the storage
    const Email = useSelector(state => state.starter.Email);
  
    //! States for the Form.
    const [Password, setPassword] = useState(null);
    const [ConfPass, setConfPass] = useState(null);
  
    //! States for the functioning handler.
    const [Success, setSuccess] = useState(false);
  
    //! States for statement
    const [isLoading, setIsLoading] = useState(false);
  
    //! State For disable the button
    const [DisableButton, setDisableButton] = useState(false);

    //* Main Function to register the user.
    const resetPassword = async () => {
        try {
            //! set the Loading animation
            setIsLoading(true);

            //! Server Query
            const {data} = await ResetPasswordQuery(Password, ConfPass, Email);

            if(data.success){
                //! Show success message.
                ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Contraseña restablecida correctamente.' : 'Password reset successful.');

                //! Close loading animation
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        navigation.navigate('WelcomeScreen');
                    }, 3000);
                }, 4000);
            }
        } catch (error) {
            //>> Close loading animation
            setTimeout(() => {
                setIsLoading(false);
                setSuccess(false);
            }, 3000);

            //>> Show error message.
            ShowToast('my_error', 'Error', lng ? error.response.data.message.es : error.response.data.message.en);
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
        BackHandler.addEventListener('hardwareBackPress', () => { return true })
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
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/graphic-icons/reset-password.png')}  />
                    <Text style={AuthStylesRegisterU.Tex_md}>{t('resetpassword.recoverPass')}</Text>

                    <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
                        <MaterialIcons name="lock-open" size={24} color="gray" style={{marginRight: 6}} />
                        <TextInput
                            autoFocus={true}
                            secureTextEntry={true}
                            style={AuthStylesGlobal.inputExtended}
                            placeholder="Nueva contraseña"
                            placeholderTextColor="gray"
                            onChangeText={text => setPassword(text)}
                            editable={!DisableButton}
                        />
                    </View>

                    <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
                        <MaterialIcons name="lock-outline" size={24} color="gray" style={{marginRight: 6}} />
                        <TextInput
                            secureTextEntry={true}
                            style={AuthStylesGlobal.inputExtended}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="gray"
                            onChangeText={text => setConfPass(text)}
                            editable={!DisableButton}
                        />
                    </View>
                    
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
                            Label={<SetLabel LabelText={'Cambiar'} Success={Success} isLoading={isLoading} />}
                            handlePress={() => {resetPassword()}}
                            haveShadow={true}
                            disable={DisableButton}
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