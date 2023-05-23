//>> Importing libraries
import { Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterU }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';

const { height } = Dimensions.get('window');

export const ResetPasswordScreen = () => {
const navigation = useNavigation();
return (
<>
    <View style={AuthStylesGlobal.mainContainer}>
        <View style={AuthStylesGlobal.topWaveContainer}>
            <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
            <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={17} color="white" />
            <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
            </TouchableOpacity>
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
                        style={AuthStylesGlobal.input}
                        placeholder="Nueva contraseña"
                        placeholderTextColor="gray"
                    />
                </View>

                <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
                    <MaterialIcons name="lock-outline" size={24} color="gray" style={{marginRight: 6}} />
                    <TextInput
                    secureTextEntry={true}
                    style={AuthStylesGlobal.input}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor="gray"
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
                        Label={"Cambiar"}
                        handlePress={() => {navigation.navigate('ApplicationTab');}}
                        haveShadow={true}
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