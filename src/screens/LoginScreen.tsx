import { useState } from "react";
import { Alert, Button, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { color, colors, t } from "react-native-tailwindcss";
import { Colors } from "react-native/Libraries/NewAppScreen";
import customColors from "../constants/colors";
import { authenticateUser, LoginFormData } from "../apis/Auth";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const {setUserData} = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({});

  const handleChange = (field: string, value: string) => {
    setFormData(_formData => ({ ..._formData, [field]: value }))
  };

  const handleSubmit = () => {
    // Alert.alert("Eroare:", " răspunsul de la server este gol!", [], {cancelable: true} );
    if (!formData.username || !formData.password ) {
      return ToastAndroid.show("Introduceti utilizatorul și parola!", 2000);
    } else {
      authenticateUser(formData).then(res => {
        console.log(res, 'res');
        setUserData(res);
        navigation.navigate("Start")
      }).catch(e => {
        console.log("Error in login:" + e);
        return ToastAndroid.show("Autentificare eșuată! Eroare la conectarea cu serverul.", 3000)
      })
    }
  }

  return (
    <View style={[t.flex, t.hFull, t.flexCol, t.justifyCenter, t.p5]}>
      <TextInput
        placeholder="Nume"
        style={[t.borderB, t.mB1, t.p0, t.pX1, t.mT1]}
        value={formData.username}
        onChangeText={val => handleChange('username', val)} />
      <TextInput
        placeholder="Parola"
        style={[t.borderB, t.mB1, t.p0, t.mT3]}
        value={formData.password}
        onChangeText={val => handleChange('password', val)}
      />
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT3]}
        activeOpacity={.8}
        onPress={handleSubmit}
      >
        <Text style={[t.textWhite, t.textCenter]}>START</Text>
      </TouchableOpacity>
    </View>
  )
}