import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { t } from "react-native-tailwindcss";
import customColors from "../constants/colors";

export default function ParcareScreen({ navigation }: any) {
  return (
    <View style={[t.p3, t.pT6,]}>
      <View style={[t.flex, t.flexRow, { gap: 10, height: 200 }]}>
        <View style={[t.border, t.h100, t.relative, t.flex, t.flexColReverse, t.rounded, t.flex1]} >
          <View style={[{ height: '80%' }, t.bgOrange400, t.bottom0,]}>
          </View>
          <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
            <Text >VN18BSC</Text>
          </View>
        </View>
        <View style={[t.border, t.h100, t.relative, t.flex, t.flexColReverse, t.rounded, t.flex1]} >
          <View style={[{ height: '50%' }, t.bgOrange400, t.bottom0,]}>
          </View>
          <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
            <Text >VN28BSC</Text>
          </View>
        </View>
      </View>
      <View style={[t.flex, t.flexRow, { gap: 10, height: 200, }, t.mT3]}>
        <View style={[t.border, t.h100, t.relative, t.flex, t.flexColReverse, t.rounded, t.flex1]} >
          <View style={[{ height: '60%' }, t.bgOrange400, t.bottom0,]}>
          </View>
          <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
            <Text >VN38BSC</Text>
          </View>
        </View>
        <View style={[t.border, t.h100, t.relative, t.flex, t.flexColReverse, t.rounded, t.flex1]} >
          <View style={[{ height: '80%' }, t.bgOrange400, t.bottom0,]}>
          </View>
          <View style={[t.absolute, t.bottom0, t.textCenter, t.wFull, t.hFull, t.itemsCenter, t.flex, t.justifyCenter]}>
            <Text >VN48BSC</Text>
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Introdu valorea"
        style={[t.borderB, t.mB1, t.p0, t.mT3]}
      />
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
        activeOpacity={.8}
      // onPress={parcareButtonHandler}
      >
        <Text style={[t.textWhite, t.textCenter]}>VANDUT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
        activeOpacity={.8}
      // onPress={parcareButtonHandler}
      >
        <Text style={[t.textWhite, t.textCenter]}>TRANSFER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[t.rounded, { backgroundColor: customColors.purple_500 }, t.p3, t.mT5]}
        activeOpacity={.8}
      // onPress={parcareButtonHandler}
      >
        <Text style={[t.textWhite, t.textCenter]}>INCARACA</Text>
      </TouchableOpacity>
    </View>
  )
}