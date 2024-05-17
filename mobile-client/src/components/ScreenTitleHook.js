import React, { useMemo } from 'react'
import { StatusBar, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { isAN, isIOS } from '../constants';

const useTitleHook = (textColor, fontSize, fontFamily, marginTopAdjust, paddingH) => {
    const statusBarHeight = StatusBar.currentHeight;
    const titleWrapperStyles = useMemo(()=>{
        return StyleSheet.create({
            container: {
                width: '100%',
                height: 95,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: marginTopAdjust,
                marginBottom: 20,
                // top: -10
            },
            titleRoundedContainer:{
                flexDirection: 'row',
                backgroundColor: '#D58C8C',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: paddingH,
                height: 40,
                borderRadius: 50,
                gap: 8,
                position: 'absolute',
            },
            text: {
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: textColor,
            },
        })
    },[textColor, fontSize, fontFamily, marginTopAdjust, paddingH])

    return {titleWrapperStyles};
};

export const ScreenTitle = ({textColor, fontSize, fontFamily, Label, IconName, marginTopAdjust, paddingH, isMainScreen}) => {
    const navigation = useNavigation();
    const {titleWrapperStyles} = useTitleHook(textColor, fontSize, fontFamily, marginTopAdjust, paddingH);

    return(
        <View style={titleWrapperStyles.container}>
            <ImageBackground style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../../assets/waves/waves_start_top.png')}></ImageBackground>
            <View style={titleWrapperStyles.titleRoundedContainer}>
                <MaterialCommunityIcons name={IconName} size={30} color="#FFFFFF" />
                <Text style={titleWrapperStyles.text}>{Label}</Text>
            </View>
            {
                isMainScreen ? 
                null
                :
                <TouchableOpacity activeOpacity={0.5} style={{position: 'absolute', left: 15, borderRadius: 6, flexDirection: 'row', alignItems: 'center', paddingVertical: isIOS ? 8 : 0,}} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={35} color="#D58C8C" />
                </TouchableOpacity>                     
            }
        </View>
    )
}