import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { t } from "react-native-tailwindcss";
import customColors from "../constants/colors";

export default function StartScreen({ navigation }: any) {
  const { userData } = useAuth()
  const role = userData?.role;
  const contracteHandler = ()=> {

  }

  const orderButtonHandler = () => {

  }

  const parcareButtonHandler = () => {
    navigation.navigate("Parcare");

  }
  return (
    <View style={[t.flex, t.hFull, t.flexCol, t.justifyCenter, t.p5]}>
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT3]}
        activeOpacity={.8}
        onPress={contracteHandler}
      >
        <Text style={[t.textWhite, t.textCenter]}>CONTRACTE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
        activeOpacity={.8}
        onPress={orderButtonHandler}
      >
        <Text style={[t.textWhite, t.textCenter]}>COMENNZI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
        activeOpacity={.8}
        onPress={parcareButtonHandler}
      >
        <Text style={[t.textWhite, t.textCenter]}>PARCARE</Text>
      </TouchableOpacity>
    </View>
  )

} 