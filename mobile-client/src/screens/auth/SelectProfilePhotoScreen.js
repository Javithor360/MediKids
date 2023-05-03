//>> Importing libraries
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterP, AuthStylesRegisterU, SelectProfilePhoto }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';

const { height } = Dimensions.get('window');

export const SelectProfilePhotoScreen = () => {
const navigation = useNavigation();
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
                    <ImageBackground style={SelectProfilePhoto.profilePhotoImage} source={require('../../../assets/default-pics/default-profile-pic.png')}>
                    </ImageBackground>
                </View>
                <TouchableOpacity style={SelectProfilePhoto.uploadBtn}>
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
                        Label={"Siguiente"}
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