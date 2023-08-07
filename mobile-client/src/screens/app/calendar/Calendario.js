import { StyleSheet, Text, View,Image,TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenTitle } from '../../../index';

export const Calendario = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.fullScreenContainer}>
        <ScreenTitle 
          Label={"Calendario y recordatorios"}
          IconName={"calendar-blank"}
          fontSize={20}
          textColor={'#FFFFFF'}
          paddingH={30}
        /> 
        <View View style={styles.reminderSectionContent}>
          <View style={styles.contentTitle}>
              <View style={styles.eventIconContainer}>
                <Image style={styles.eventIcon} source={require("../../../../assets/calendarIcons/event.png")}/> 
              </View>
              <View style={styles.Text1Container}>
                <Text style={styles.Text1}>Tiene 1 eventos programados para hoy</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.markButton}>
            <View style={styles.markButtonContent}>
                <Image style={styles.markIcon} source={require("../../../../assets/calendarIcons/task_comp.png")}/>
                <Text style={styles.markText}>Marcar todo como completado</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer:{
    backgroundColor: '#FFFFFF',
  },
  sectionTitleContainer: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'row',
    gap: 10,
  },
  lineBefore: {
    backgroundColor: '#707070', 
    height: 3, 
    width: 40,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#707070',
    fontWeight: 600,
  },
  reminderSectionContent:{
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: 30,
    marginBottom: 5,
    width: '90%',
    height: 'auto',
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 20,
    borderTopWidth: 8,
    borderTopColor: '#D58C8C',
    //iOS
    shadowColor: '#BBBBBB',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#52006A',
  },
  contentTitle: {
    flex: 1,
    flexDirection: 'row',
    gap: 2,
    width: '90%',
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eventIconContainer: {
    width: '10%',
  },
  eventIcon: {
    width: '100%',
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  Text1Container: {
    height: 'auto',
    width: '90%',
    justifyContent: 'center',
  },
  Text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#707070',
    textAlign: 'center',
    width: '100%',
  },
  markButton:{
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    height: 'auto',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  markButtonContent: {
    alignSelf: 'auto',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markIcon :{
    resizeMode: 'contain',
    height: '90%',
    width: '10%',
  },
  markText :{
    color: '#D48888',
    width: '90%',
    textAlign: 'center',
  }, 
  safeArea:{
    backgroundColor: '#e4e2ff',
  }
});