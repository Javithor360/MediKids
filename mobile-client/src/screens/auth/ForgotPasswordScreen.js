//>> Importing libraries
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground, BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons as MaterialCommIcons, MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, ForgotPassQuery, SetLabel, ShowToast } from '../../index';
import { ChangeStarterEmail } from '../../store/slices/starterSlice';

export const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const lng = useSelector(state => state.starter.Language);
    const { t } = useTranslation();
    //! States for the Form.
    const [Email, setEmail] = useState(null);

    //! States for th functioning handler.
    const [Success, setSuccess] = useState(false);

    //! States for statement
    const [isLoading, setIsLoading] = useState(false);

    //! State For disable the button
    const [DisableButton, setDisableButton] = useState(false);
    const [DisableBack, setDisableBack] = useState(false);

    //* Main Function to fortgot password screen.
    const sendForgotPassEmail = async () => {
        try {
            //! set the Loading animation
            setIsLoading(true);

            //! Server Query
            const {data} = await ForgotPassQuery(Email);

            //! Disable go back button (after query for enable the try-catch statement).
            setDisableBack(true);
            
            if(data.success){
                //! Show success message.
                ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? data.message.es : data.message.en);

                //! set the email in the storage for the usage in the Reset password screen.
                dispatch(ChangeStarterEmail(Email));

                //! Close loading animation
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setDisableBack(false);
                        navigation.navigate('ForgotPassCodeScreen');
                    }, 3000);
                }, 4000);
            }
        } catch (error) {
            //>> Close loading animation
            setTimeout(() => {
                setIsLoading(false);
                setSuccess(false);
            }, 2500);
            
            //>> Show error message
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

    //! Disable go back button.
    useEffect(() => {
        if(DisableBack){
            navigation.setOptions({
                gestureEnabled: false
            })
        }
        if (DisableBack) {
            BackHandler.addEventListener('hardwareBackPress', () => {return true})
          }
    }, [navigation, DisableBack]);

    return (
    <>
        <View style={AuthStylesGlobal.mainContainer}>
            <View style={AuthStylesGlobal.topWaveContainer}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
                <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.goBack()} disabled={DisableButton}>
                    <MaterialIcons name="arrow-back-ios" size={17} color="white" />
                    <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>{t('forgotpassword.back')}</Text>
                </TouchableOpacity>
            </View>
            <View style={AuthStylesGlobal.contentContainer} >
                <View style={AuthStylesGlobal.formContent} >
                    <Image style={AuthStylesGlobal.logoImage2} source={require('../../../assets/logos/Logotype_Colored.png')}  />
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/graphic-icons/forgot-password.png')}  />
                    <Text style={AuthStylesRegisterU.Tex_md}>{t('forgotpassword.iforgot')}</Text>
                    <View style={AuthStylesGlobal.cont2} >
                        <Text style={AuthStylesGlobal.TextCount}>{t('forgotpassword.instructions')}</Text>
                    </View>

                    <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
                        <MaterialCommIcons name='email-outline' size={24} color={'gray'} style={{marginRight: 6}} />
                        <TextInput
                            autoFocus={true}
                            style={AuthStylesGlobal.inputExtended}
                            placeholder={`${t('forgotpassword.email')}`}
                            placeholderTextColor="gray"
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={text => setEmail(text.trim())}
                            editable={!DisableButton}
                            autoCorrect={false}
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
                            Label={<SetLabel LabelText={`${t('forgotpassword.send')}`} isLoading={isLoading} Success={Success} />}
                            handlePress={() => {sendForgotPassEmail()}}
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