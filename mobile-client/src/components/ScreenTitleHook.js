import React, { useMemo } from 'react'
import { StatusBar, StyleSheet, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const useTitleHook = (textColor, fontSize, fontFamily, marginTopAdjust, paddingH) => {
    const statusBarHeight = StatusBar.currentHeight;
    const titleWrapperStyles = useMemo(()=>{
        return StyleSheet.create({
            container: {
                width: '100%',
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: marginTopAdjust,
            },
            titleRoundedContainer:{
                flexDirection: 'row',
                backgroundColor: '#D58C8C',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: paddingH,
                height: 40,
                borderRadius: 50,
                gap: 8
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
            <View style={titleWrapperStyles.titleRoundedContainer}>
                <MaterialCommunityIcons name={IconName} size={30} color="#FFFFFF" />
                <Text style={titleWrapperStyles.text}>{Label}</Text>
            </View>
        </View>
    )
}