import { StyleSheet, Dimensions } from 'react-native';
import { isAN, isIOS } from '../src/constants';
const { height } = Dimensions.get('window');

const AuthStylesGlobal = StyleSheet.create({
   mainContainer: {
      backgroundColor: '#fff', 
      flex: 3, 
      position:'relative' 
   },
   topWaveContainer: {
      flexDirection: 'column', 
      position: 'relative'
   },
   // bottomWaveContainer: {
   //    position: 'absolute', 
   //    bottom: 0, 
   //    left: 0, 
   //    right: 0
   // },
   contentContainer: {
      flex: 2, 
      flexDirection: 'column',
      paddingHorizontal:'3%',
      paddingVertical:'3%'
   },
   formContent: {
      // height: height,
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
      gap: 8,
   },
   buttonView: {
      paddingHorizontal: 0,
      height: isIOS ? 45 : 55,
      width: '90%',
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems: 'center',
   },
   waveImg:{
      height: 100,
      position: 'relative',
   },
   logoImage: {
      resizeMode: 'contain',
      height: isIOS ? height / 15.5 : height / 12.5 ,
   },
   logoImage2: {
      resizeMode: 'contain',
      height: isIOS ? height / 30.5 : height / 25.5 ,
      marginBottom: '6%',
   },
   title_Text:{
      color: '#A375FF',
      textAlign:'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 35,
      fontFamily: 'poppinsBold',
   },
   title_Text2: {
      color: '#A375FF',
      textAlign:'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontFamily: 'poppinsBold',
   },
   customW90: {
      width:'90%',
   },
   inputBox:{
      borderWidth: 1,
      padding: 10,
      backgroundColor:'#F4F1FF',
      borderColor: '#D8D7FE',
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius:20,
      fontSize: 16,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: 'poppinsRegular',
      flexDirection: 'row', 
      alignItems:"center",
      height: 55,
   },
   input:{
      fontSize: 16, 
      fontFamily: 'poppinsRegular', 
      width: '75%',
      textAlignVertical: 'top',
   },
   inputExtended:{
      fontSize: 16, 
      fontFamily: 'poppinsRegular', 
      width: '90%',
   },
   TextP:{
      textDecorationLine:'underline',
      color: '#707070',
      alignSelf: 'flex-start',
      marginLeft:'6%',
      fontSize:15,
      fontWeight:'bold',
      fontFamily: 'poppinsRegular',
   },
   TextCount:{
      textAlign:'center',
      color:'#707070',
      fontSize: 16,
      fontFamily: 'poppinsRegular',
   },
   TextReg:{
      color:'#A375FF',
      fontSize:16,
      fontFamily: 'poppinsBold',
   },
   cont2:{
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection:'row',
      gap: 5,
   },
   buttomCameBack: {
      top: '50%',
      left: 15,
      backgroundColor: '#A375FF',
      position: 'absolute',
      borderRadius: 6,
      flexDirection: 'row',
      paddingHorizontal: 14,
      alignItems: 'center',
      paddingVertical: isIOS ? 8 : 0,
      elevation: 10
   },
   customW50: {
      width: '50%',
   },
   customW91: {
      width: '91%',
   }
});

const AuthStylesRegisterU = StyleSheet.create({
   Tex_md:{
      color: '#A375FF',
      textAlign:'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontFamily: 'poppinsBold',
   },
});

const AuthStylesRegisterP = StyleSheet.create({
   inputBtn:{
      paddingHorizontal: '3%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   inputBtnText: {
      fontSize: 16,
      color: '#707070',
      fontFamily: 'poppinsRegular',
   },
   centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   modalView: {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 25,
      borderRadius: 20,
      width: "90%",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
})

const SelectProfilePhoto = StyleSheet.create({
   profilePhotoWrapper:{
      height: 230,
      width: 230,
      marginVertical: '2%',
      borderRadius: 125,
      overflow: 'hidden',
   },
   profilePhotoImage:{
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
   },  
   hr: {
      width: '90%',
      height: '.5%',
      backgroundColor: '#D8D7FE',
      marginTop: 12,
      borderRadius: 3,
      marginHorizontal: '10%',
   },
   customMarginB_1: {
      marginBottom: 10,
   },
   customMarginB_2: {
      marginBottom: 3,
   },
   uploadBtn: {
      paddingHorizontal: '12%',
      flexDirection: 'row',
      height: 45,
      backgroundColor: '#D8D7FE',
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      gap: 6
   },
   uploadTxt:{
      fontSize: 18,
      color: '#707070',
      fontFamily: 'poppinsRegular',
      marginTop: 5,
      paddingVertical: 0
   }
})

export { AuthStylesGlobal, AuthStylesRegisterU, AuthStylesRegisterP, SelectProfilePhoto }