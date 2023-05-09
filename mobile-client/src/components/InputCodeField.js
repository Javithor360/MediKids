import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const InputCodeField = ({value, setValue}) => {
    
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
            <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
            </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: 10,
        marginBottom: 20,
        width: 340,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#707070',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#A375FF',
        borderBottomWidth: 2,
    },
});

export default InputCodeField;
