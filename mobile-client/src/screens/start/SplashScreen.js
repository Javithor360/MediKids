//>> Importing libraries
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

//>> Importing Components
import { isIOS } from "../../constants";
import { ChangeSBColor } from "../../store/slices/starterSlice";

export const SplashScreen = () => {
  const State = useSelector((state) => state.starter.State);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  //>> Navigation to the corresponding component.
  useEffect(() => {
    if (State !== null) {
      setTimeout(() => {
        if (!State) {
          navigation.navigate("WelcomeScreen");
        } else {
          navigation.navigate("SelectPatientScreen");
        }
        dispatch(ChangeSBColor("#e4e2ff"));
      }, 4000);
    }
  }, [State]);

  return (
    <View style={styles.root}>
      <Image
        source={require("../../../assets//logos/adaptive-icon.png")}
        style={styles.imageStyle}
      />
      {isIOS ? (
        <ActivityIndicator
          size="large"
          color="#A375FF"
          style={{ marginTop: 19 }}
        />
      ) : (
        <Lottie
          source={require("../../../assets/loader.json")}
          loop
          speed={0.75}
          autoPlay
          style={styles.animationStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  animationStyle: {
    marginTop: "34%",
  },
});
