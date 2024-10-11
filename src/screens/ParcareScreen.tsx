import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { t } from "react-native-tailwindcss";
import customColors from "../constants/colors";
import { useState } from "react";
import { capacity } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

export type CurrentAmount = {
  VN18BSC: number,
  VN28BSC: number,
  VN38BSC: number,
  VN58BSC: number,
}
export default function ParcareScreen({ navigation }: any) {
  const [currentState, setCurrentState] = useState<CurrentAmount>({
    VN18BSC: 12000,
    VN28BSC: 5000,
    VN38BSC: 8000,
    VN58BSC: 20000,
  });
  const [selectedTank, setSelectedTank] = useState<"VN58BSC" | "VN28BSC" | "VN38BSC" | "VN18BSC">();
  const [isTransfer, setIsTransfer] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>("");

  const handleSelectTank = (tankName: "VN58BSC" | "VN28BSC" | "VN38BSC" | "VN18BSC") => {
    if (isTransfer) {
      setIsTransfer(false);
      if (selectedTank && selectedTank !== tankName) {
        if (currentState[selectedTank] - Number(amount) < 0) {
          return ToastAndroid.show("Cantitatea este peste rezervorul original", 2000)
        } else if (currentState[tankName] + Number(amount) > capacity[tankName]) {
          return ToastAndroid.show("Cantitatea depășește capacitatea rămasă a rezervorului țintă", 2000)

        }
        currentState[selectedTank!] = currentState[selectedTank] - Number(amount) || 0
        currentState[tankName] = currentState[tankName] +  Number(amount);
        setSelectedTank(undefined);
        setAmount("")
      }
    } else {
      setSelectedTank(tankName);
    }
  }

  const VandutHandler = () => {
    setIsTransfer(false)
    if (!selectedTank || !amount) {
      return ToastAndroid.show("Vă rugăm să selectați rezervorul și cantitatea introdusă pentru a scădea", 200);
    } else {
      const result = (currentState[selectedTank!] - Number(amount)) || 0;
      setSelectedTank(undefined);
      setAmount("")
      setCurrentState(_cState => ({ ..._cState, [selectedTank]: result }));
    }
  }

  const increaseHandler = () => {
    setIsTransfer(false)
    if (!selectedTank || !amount) {

      return ToastAndroid.show("Vă rugăm să selectați rezervorul și cantitatea introdusă pentru a scădea", 200);
    } else {
      const result = (currentState[selectedTank!] + Number(amount)) > capacity[selectedTank] ? capacity[selectedTank] : (currentState[selectedTank!] + Number(amount));
      setSelectedTank(undefined);
      setAmount("")
      setCurrentState(_cState => ({ ..._cState, [selectedTank]: result }));
    }
  }

  const transferHandler = () => {
    if (selectedTank && amount) {
      setIsTransfer(true);
    } else {
      return ToastAndroid.show("Vă rugăm să selectați rezervorul și cantitatea de transferat", 200);
    }
    return ToastAndroid.show("Vă rugăm să selectați un rezervor pentru a primi suma", 200);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[t.p3, t.pT6,]}>
          <View style={[t.flex, t.flexRow, t.pX10, { gap: 30, height: 200 }]}>
            <TouchableOpacity
              activeOpacity={.5}
              style={[t.overflowHidden, t.border2, t.flex1, t.h100, t.relative, t.flex, t.flexColReverse, t.roundedLg, { borderColor: (selectedTank === "VN18BSC" ? "blue" : "grey") }]}
              onPress={() => handleSelectTank("VN18BSC")}
            >
              <View style={[{ height: 200 * currentState.VN18BSC / capacity.VN18BSC }, t.bgOrange400, t.bottom0,]}>
              </View>
              <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
                <Text >VN18BSC ({currentState.VN18BSC})</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} style={[t.overflowHidden, t.border2, t.flex1, t.h100, t.relative, t.flex, t.flexColReverse, t.roundedLg, { borderColor: (selectedTank === "VN28BSC" ? "blue" : "grey") }]}
              onPress={() => handleSelectTank("VN28BSC")}>
              <View style={[{ height: 200 * currentState.VN28BSC / capacity.VN28BSC }, t.bgOrange400, t.bottom0,]}>
              </View>
              <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
                <Text >VN28BSC ({currentState.VN28BSC})</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[t.flex, t.flexRow, t.pX10, { gap: 30, height: 200, }, t.mT3]}>
            <TouchableOpacity activeOpacity={.5} style={[t.overflowHidden, t.border2, t.flex1, t.h100, t.relative, t.flex, t.flexColReverse, t.roundedLg, { borderColor: (selectedTank === "VN38BSC" ? "blue" : "grey") }]}
              onPress={() => handleSelectTank("VN38BSC")}>
              <View style={[{ height: 200 * currentState.VN38BSC / capacity.VN38BSC }, t.bgOrange400, t.bottom0,]}>
              </View>
              <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
                <Text >VN38BSC ({currentState.VN38BSC})</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} style={[t.overflowHidden, t.border2, t.flex1, t.h100, t.relative, t.flex, t.flexColReverse, t.roundedLg, { borderColor: (selectedTank === "VN58BSC" ? "blue" : "grey") }]}
              onPress={() => handleSelectTank("VN58BSC")}>


              <View style={[{ height: 200 * currentState.VN58BSC / capacity.VN58BSC }, t.bgOrange400, t.bottom0,]}>
              </View>
              <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
                <Text >VN58BSC ({currentState.VN58BSC})</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Introdu valorea"
            keyboardType={"decimal-pad"}
            value={amount}
            onChangeText={(val) => setAmount(val)}
            style={[t.borderB, t.mB1, t.p0, t.mT8]}
          />

          <TouchableOpacity
            style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
            activeOpacity={.8}
            onPress={VandutHandler}
          >
            <Text style={[t.textWhite, t.textCenter]}>VANDUT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
            activeOpacity={.8}
            onPress={transferHandler}

          >
            <Text style={[t.textWhite, t.textCenter]}>TRANSFER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
            activeOpacity={.8}
            onPress={increaseHandler}
          >
            <Text style={[t.textWhite, t.textCenter]} >INCARACA</Text>
          </TouchableOpacity>
        </View >
      </ScrollView >
    </SafeAreaView >
  )
}