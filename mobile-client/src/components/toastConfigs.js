import { StyleSheet, Text, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';

export const toastConfig = {
  my_success: ({ text1, text2 }) => {
    let bigContainer;
    if(text2.includes('\n')) bigContainer = true;

    return (
      <View style={[styles.ContainerToast, {height: bigContainer ? 85 : 60 }]}>
        <View style={[styles.LeftBar, {backgroundColor: '#5AB1BB'}]}/>
        <View style={styles.Icon}>
          <AntDesign name="checkcircleo" color={'#5AB1BB'} size={30}/>
        </View>
        <View style={styles.TextContainer}>
          <Text style={[styles.Text1,{color: '#5AB1BB'}]}>{text1}</Text>
          <Text style={styles.Text2}>{text2}</Text>
        </View>
      </View>
    )
  },
  my_error: ({ text1, text2 }) => {
    let bigContainer;
    if(text2.includes('\n')) bigContainer = true;

    return (
      <View style={[styles.ContainerToast, {height: bigContainer ? 85 : 60 }]}>
        <View style={[styles.LeftBar, {backgroundColor: '#FF5252'}]}/>
        <View style={styles.Icon}>
          <AntDesign name="closecircleo" color={'#FF5252'} size={30}/>
        </View>
        <View style={styles.TextContainer}>
          <Text style={[styles.Text1,{color: '#FF5252'}]}>{text1}</Text>
          <Text style={styles.Text2}>{text2}</Text>
        </View>
      </View>
    )
  },
  my_warning: ({text1, text2}) => {
    let bigContainer;
    if(text2.includes('\n')) bigContainer = true;

    return (
      <View style={[styles.ContainerToast, {height: bigContainer ? 85 : 60 }]}>
        <View style={[styles.LeftBar, {backgroundColor: '#FFA542'}]}/>
        <View style={styles.Icon}>
          <AntDesign name="warning" color={'#FFA542'} size={30}/>
        </View>
        <View style={styles.TextContainer}>
          <Text style={[styles.Text1,{color: '#FFA542'}]}>{text1}</Text>
          <Text style={styles.Text2}>{text2}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ContainerToast:{
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
    flexDirection: 'row',
  },
  LeftBar: {
    height: '100%',
    width: '2%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  TextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  Text1:{
    fontSize: 17,
    fontWeight: '600',
  },
  Text2:{
      fontSize: 15,
    },
  Icon:{
    paddingHorizontal: '4%',
    flexDirection: 'column',
    justifyContent: 'center',
  }
})