import React, { useMemo } from 'react'
import {TouchableOpacity, StyleSheet, Text, Platform} from 'react-native';

const useButtonHook = (bgColor, paddingV, paddingH, marginH, marginV, width, height, BorderRadius, textColor, fontSize, fontFamily, haveShadow) => {
  const buttonStyles = useMemo(() => {
    return StyleSheet.create({
      button: {
        backgroundColor: bgColor,
        paddingVertical: paddingV,
        paddingHorizontal: paddingH,
        marginHorizontal: marginH,
        marginVertical: marginV,
        width: width,
        height: height,
        borderRadius: BorderRadius,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
          ios: haveShadow && {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.20,
            shadowRadius: 4
          },
          android: haveShadow &&{
            elevation: 2,
          }
        })
      },
      text: {
        color: textColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
        textAlign: 'center',

      },
    })
  }, [bgColor, paddingV, paddingH, marginH, marginV, width, height, BorderRadius, textColor, fontSize, fontFamily]);
  
  return {buttonStyles};
};

export const CustomButton = ({bgColor, paddingV, paddingH, marginH, marginV, width, height, BorderRadius, textColor, fontSize, fontFamily, haveShadow, Label, handlePress, disable }) => {
  const {buttonStyles} = useButtonHook(bgColor, paddingV, paddingH, marginH, marginV, width, height, BorderRadius, textColor, fontSize, fontFamily, haveShadow);
  return (
    <TouchableOpacity activeOpacity={0.8} style={buttonStyles.button} onPress={handlePress} disabled={disable} >
      <Text style={buttonStyles.text}>{Label}</Text>
    </TouchableOpacity>
  )
};
