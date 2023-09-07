//>> Importing libraries
import { Text, View, Image, ImageBackground, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//>> Importing components
import {
  AuthStylesGlobal,
  AuthStylesRegisterU,
} from "../../../assets/AuthStyles";
import { isIOS } from "../../constants";
import {
  CustomButton,
  SetLabel,
  ShowToast,
  verifyCodeResponsible,
} from "../../index";
import InputCodeField from "../../components/InputCodeField";

export const VerifyCodeScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const lng = useSelector((state) => state.starter.Language);

  //! Get the Email from the global State
  const Email = useSelector((state) => state.starter.Email);

  //! Verify Code State
  const [verifyCode, setVerifyCode] = useState(null);

  //! States for th functioning handler.
  const [Success, setSuccess] = useState(false);

  //! States for statement
  const [isLoading, setIsLoading] = useState(false);

  //! State For disable the button
  const [DisableBtn, setDisableBtn] = useState(false);

  //\\ Main Function to verify the Code.
  const verifyUserCode = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const { data } = await verifyCodeResponsible(verifyCode, Email);

      if (data.success) {
        //! Show success message.
        ShowToast(
          "my_success",
          lng ? "Éxito" : "Success",
          lng
            ? "Email Verificado correctamente."
            : "Email successfully verified."
        );

        //! Close loading animation
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => {
            navigation.navigate("LoginScreen", { swipeBack: false });
          }, 3000);
        }, 4000);
      }
    } catch (error) {
      //>> Close loading animation
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
      }, 2000);

      //>> Show error message.
      console.log(error);
      ShowToast(
        "my_error",
        "Error",
        lng ? error.response.data.message.es : error.response.data.message.en
      );
    }
  };

  //! Disable the send buttom
  useEffect(() => {
    if (isLoading) {
      setDisableBtn(true);
    } else if (Success) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [isLoading, Success]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <>
      <View style={AuthStylesGlobal.mainContainer}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground
            resizeMode="cover"
            style={AuthStylesGlobal.waveImg}
            source={require("../../../assets/waves/waves_start_top.png")}
          />
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent}>
            <Image
              style={AuthStylesGlobal.logoImage2}
              source={require("../../../assets/logos/Logotype_Colored.png")}
            />
            <Image
              style={AuthStylesGlobal.logoImage}
              source={require("../../../assets/graphic-icons/verify-code.png")}
            />
            <Text style={AuthStylesRegisterU.Tex_md}>
              {t("verifyCode.title")}
            </Text>
            <Text>
              {t("verifyCode.text2")}
              <Text
                style={{
                  color: "#A375FF",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: 15,
                }}
              >
                {Email}
              </Text>
            </Text>

            <InputCodeField value={verifyCode} setValue={setVerifyCode} />

            <View style={AuthStylesGlobal.buttonView}>
              <CustomButton
                bgColor={"#A375FF"}
                paddingV={0}
                paddingH={0}
                marginH={0}
                marginV={isIOS ? 2 : 6}
                width={"100%"}
                height={"100%"}
                BorderRadius={10}
                fontFamily={"poppinsBold"}
                fontSize={16}
                textColor={"white"}
                Label={
                  <SetLabel
                    LabelText={t("verifyCode.verifyBtn")}
                    Success={Success}
                    isLoading={isLoading}
                  />
                }
                handlePress={() => {
                  verifyUserCode();
                }}
                haveShadow={true}
                disable={DisableBtn}
              />
            </View>
          </View>
        </View>
        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground
            resizeMode="cover"
            style={AuthStylesGlobal.waveImg}
            source={require("../../../assets/waves/waves_start_buttom.png")}
          />
        </View>
      </View>
    </>
  );
};
