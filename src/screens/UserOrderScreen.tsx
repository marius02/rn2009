import { useEffect, useState } from "react";
import { OrderData, useOrder } from "../contexts/OrderContext";
import { addOrder, assignOrder, finalizeOrder, getOrders } from "../apis/Order";
import { color, t } from "react-native-tailwindcss";
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View, Modal } from "react-native";
import customColors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import GMapIcon from '../res/icons/gmap.svg'
import { useTwilio } from "../contexts/TwilioContext";


export default function UserOrderScreen({ navigation }: any) {
  const { orders, normalUsers, setOrders, getNormalUsers, setSelectedOrder } = useOrder();
  const { userData } = useAuth();
  const { getToken } = useTwilio();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getNormalUsers();
  }, [getNormalUsers])

  useEffect(() => {
    getOrders().then(res => {
      if (res.data) {
        setOrders(res.data)
      }
    })
  }, [getOrders]);

  const handleFinalize = (order: OrderData) => async () => {
    if (loading) {
      return;
    }
    setShow(false);
    setLoading(true);

    const data = await finalizeOrder(order.id!);
    if (data?.status === "success") {
      ToastAndroid.show(data.data as string, 2000);
      getOrders().then(res => {
        if (res.data) {
          setOrders(res.data)
        }
      })
    }
    setLoading(false);
  }



  const handleCall = (order: OrderData) => async () => {
    setSelectedOrder(order);
    await getToken();
    navigation.navigate("Call");
  }

  return (
    <View style={[t.hFull, t.flex, t.justifyBetween]}>
      <View style={[t.flex1, t.p3]}>
        <View style={[t.flex, t.flexRow, t.itemsCenter]}>
          <View style={[t.flex1, t.borderB, t.borderGray700]} />
          <Text style={[t.pX2]}>Toate Comenzile</Text>
          <View style={[t.flex1, t.borderB, t.borderGray700]} />
        </View>
        <SafeAreaView>
          <ScrollView>
            {orders?.map((order, index) => (
              <View key={order.id} style={[t.mT5, t.flex, t.flexRow]}>
                <View style={[t.flex]}>
                  <Text style={[t.textLg, t.textBlue500]}>Localitatea: {order.city}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>

      </View>
      <View style={[t.flex1, t.p3]}>
        <View style={[t.flex, t.flexRow, t.itemsCenter, t.pY3]}>
          <View style={[t.flex1, t.borderB, t.borderGray700]} />
          <Text style={[t.pX2]}>Comenzile care vi s-au atribuit</Text>
          <View style={[t.flex1, t.borderB, t.borderGray700]} />
        </View>
        <SafeAreaView>
          <ScrollView>
            {orders?.filter(order => order.assignedTo === userData?.username)?.map((order, index) => (
              <View style={[t.mT5, t.flex, t.flexRow]}>
                <View style={[t.flex]}>

                  <Text style={[t.textLg, t.textBlue500]}>Localitatea: {order.city}</Text>
                  <View style={[t.flex, t.flexRow, t.itemsCenter]}>
                    <Text style={[t.textBlack, t.mR1]}>Locatie: {order.location}</Text>
                    <GMapIcon width={30} height={20} />
                  </View>
                  <Text style={[t.textBlack]}>Pret: {order.price}</Text>
                </View>
                <View style={[t.flex, t.flex1, t.justifyEnd, t.itemsCenter, t.flexRow, t.pX1]}>
                  <TouchableOpacity
                    style={[t.rounded, t.w104, { backgroundColor: customColors.purple_500 }, t.p2, t.mR2]}
                    activeOpacity={.8}
                    onPress={handleFinalize(order)}
                  >
                    <Text style={[t.textWhite, t.textCenter]}>FINALIZEAZA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[t.rounded, t.w104, { backgroundColor: customColors.purple_500 }, t.p2,]}
                    activeOpacity={order.assignedTo ? 1 : .8}
                    onPress={handleCall(order)}
                  >
                    <Text style={[t.textWhite, t.textCenter]}>SUNĂ</Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))}
          </ScrollView>
        </SafeAreaView>

      </View>
    </View>
  )
}