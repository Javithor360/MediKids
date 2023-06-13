//>> Importing libraries
import { Text, View, Image, TextInput, ImageBackground} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isIOS } from '../../constants';
import { CustomButton, ResetPasswordQuery } from '../../index';
import { useSelector } from 'react-redux';


export const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const listenerRef = useRef();

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

    //! State for Disable the navigation listener
    const [DisableNavListener, setDisableNavListener] = useState(true);

    //! Show the Emergent Message (toast).
    const showToast = (type, text1, text2) => {
      Toast.show({
        type:type,
        text1:text1,
        text2:text2,
        duration: 4000
      })
    }

    const ExecuteDisablenav = () => {
        navigation.addListener('beforeRemove', (e) => {
            if(DisableNavListener){
                e.preventDefault();
            }
            
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
            return 'Registrarse'
        }
    }

    //* Main Function to register the user.
    const resetPassword = async () => {
        try {
            //! set the Loading animation
            setIsLoading(true);

            //! Server Query
            const {data} = await ResetPasswordQuery(Password, ConfPass, Email);

            if(data.success){

                //! Show success message.
                showToast('my_success', 'Éxito', 'Cambio de contraseña completado');

                //! Close loading animation
                setTimeout(() => {
                setIsLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    setDisableNavListener(false);
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
            showToast('my_error', 'Error', error.response.data.message);
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
        ExecuteDisablenav();
    }, [navigation]);


    return (
    <>
        <View style={AuthStylesGlobal.mainContainer}>
            <View style={AuthStylesGlobal.topWaveContainer}>
                <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
                {/* <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={17} color="white" />
                    <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
                </TouchableOpacity> */}
            </View>
            <View style={AuthStylesGlobal.contentContainer} >
                <View style={AuthStylesGlobal.formContent} >
                    <Image style={AuthStylesGlobal.logoImage2} source={require('../../../assets/logos/Logotype_Colored.png')}  />
                    <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/graphic-icons/reset-password.png')}  />
                    <Text style={AuthStylesRegisterU.Tex_md}>Recuperar contraseña</Text>

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
                            Label={setLabel()}
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