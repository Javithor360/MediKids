import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

const TimerComponent = () => {
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    // const [time, setTime] = useState(new Date());
    // useEffect(()=>{
    //     setInterval(()=>setTime(new Date()), 1000)
    // },[time, setTime]);

    // () => {
    //     if (new Date().toLocaleTimeString() >= "22:01:00") {
    //         setIsStopwatchStart(true);
    //     } else {
    //         setIsStopwatchStart(false);
    //     }
    // }

    const options = {
        container: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 5,
            borderRadius: 5,
            paddingHorizontal: 20,
            elevation: 4,
        },
        text: {
            fontSize: 30,
            color: '#666666',
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.sectionStyle}>
                    <Stopwatch
                        start={isStopwatchStart}
                        options={options}
                    />
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setIsStopwatchStart(false);
                            }}
                            style={{ backgroundColor: '#393939', width: 120, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop:14,}}
                        >
                            <Text style={styles.buttonText}>
                                Actualizar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default TimerComponent;
