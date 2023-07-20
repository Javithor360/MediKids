import React, { useMemo } from 'react'
import { StatusBar, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

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

export const ScreenTitle = ({textColor, fontSize, fontFamily, Label, IconName, marginTopAdjust, paddingH}) => {
    const {titleWrapperStyles} = useTitleHook(textColor, fontSize, fontFamily, marginTopAdjust, paddingH);

    return(
        <View style={titleWrapperStyles.container}>
            <ImageBackground style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../../assets/waves/waves_start_top.png')}></ImageBackground>
            <View style={titleWrapperStyles.titleRoundedContainer}>
                <MaterialCommunityIcons name={IconName} size={30} color="#FFFFFF" />
                <Text style={titleWrapperStyles.text}>{Label}</Text>
            </View>
        </View>
    )
}