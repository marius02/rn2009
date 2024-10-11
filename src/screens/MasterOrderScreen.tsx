import { useEffect, useState } from "react";
import { OrderData, useOrder } from "../contexts/OrderContext";
import { addOrder, assignOrder, finalizeOrder, getOrders } from "../apis/Order";
import { color, t } from "react-native-tailwindcss";
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View, Modal } from "react-native";
import customColors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";



export default function MasterOrderScreen({ navigation }: any) {
  const { orders, normalUsers, setOrders, getNormalUsers } = useOrder();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData>()
  const [formData, setFormData] = useState<OrderData>({
    location: "",
    phone: "",
    city: "",
    price: "",
  });

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

  useEffect(() => {
    if (!formData.id && orders && orders?.length > 0) {
      setFormData(orders[orders.length - 1])
    }
  }, [orders, formData])

  const handleChange = (field: string) => (value: string) => {
    setFormData(_formData => ({ ...formData, [field]: value }));
  }

  const handleAdd = async () => {
    if (loading) {
      return;
    }
    if (!formData.city || !formData.location || !formData.phone || !formData.price) {
      return ToastAndroid.show("Ar trebui să introduceți toate casetele de text", 2000)
    }

    setLoading(true);
    const data = await addOrder(formData);
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

  const handleAssign = (order: OrderData) => () => {
    if (loading) return;
    if (!order.assignedTo) {
      setSelectedOrder(order);
      setShow(true);
    }
  }

  const handleSelectUser = (username: string) => async () => {
    if (loading) {
      return;
    }
    setShow(false);
    setLoading(true);

    const data = await assignOrder(username, selectedOrder?.id!);
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

  return (
    <View style={[t.hFull, t.flex, t.justifyBetween]}>
      <View style={[t.flex1, t.p3]}>
        <SafeAreaView>
          <ScrollView>
            {orders?.map((order, index) => (
              <View key={order.id} style={[t.mT5, t.flex, t.flexRow]}>
                <View style={[t.flex]}>

                  <Text style={[t.textLg, t.textBlue500]}>Localitatea: {order.city}</Text>
                  {order.assignedTo && <Text style={[t.textBlack]}>Atribuită lui: {order.assignedTo}</Text>}
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
                    style={[t.rounded, t.w104, { backgroundColor: order.assignedTo ? customColors.inActive_color : customColors.purple_500 }, t.p2,]}
                    activeOpacity={order.assignedTo ? 1 : .8}
                    onPress={handleAssign(order)}
                  >
                    <Text style={[t.textWhite, t.textCenter]}>ATRIBUIE</Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={[t.p5, t.borderT, t.pT0,]}>
        <View style={[t.flex, t.flexRow, t.mT2]}>
          <TouchableOpacity
            style={[t.rounded, t.flex1, { backgroundColor: customColors.purple_500 }, t.p2, t.mR2]}
            activeOpacity={.8}
            onPress={handleAdd}
          >
            <Text style={[t.textWhite, t.textCenter]}>ADAUGA</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[t.rounded, t.flex1, { backgroundColor: customColors.purple_500 }, t.p2,]}
            activeOpacity={.8}
          >
            <Text style={[t.textWhite, t.textCenter]}>ATRIBUIE</Text>
          </TouchableOpacity> */}
        </View>
        <TextInput
          placeholder="Localitatea"
          style={[t.borderB, t.mB1, t.p0, t.mT2]}
          value={formData.city}
          onChangeText={handleChange("city")}
        />
        <TextInput
          placeholder="Telefon"
          keyboardType={"decimal-pad"}
          value={formData.phone}
          style={[t.borderB, t.mB1, t.p0, t.mT2]}
          onChangeText={handleChange("phone")}
        />
        <TextInput
          placeholder="Pret"
          keyboardType={"decimal-pad"}
          style={[t.borderB, t.mB1, t.p0, t.mT2]}
          value={formData.price.toString()}
          onChangeText={handleChange("price")}
        />
        <TextInput
          placeholder="Locatie"
          value={formData.location}
          style={[t.borderB, t.mB1, t.p0, t.mT2]}
          onChangeText={handleChange("location")}
        />
      </View>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false)
        }}
      >
        <View style={[, t.relative, t.hFull, t.flex, t.justifyCenter, t.itemsCenter]}>
          <View style={[t.bgWhite, t.shadow, t.p2, t.z10, t.roundedLg, { width: '80%', maxHeight: 400 }]}>
            <View style={[t.flex, t.flexRow, t.justifyEnd]}>
              <TouchableOpacity style={[t.flex, t.border, t.pX1, t.roundedFull]} onPress={() => setShow(false)}><Text>X</Text></TouchableOpacity>
            </View>
            <View>
              {normalUsers.map(normalUser => (
                <View key={normalUser.id} style={[t.pX10, t.pY1,]}>
                  <TouchableOpacity onPress={handleSelectUser(normalUser.username)}>
                    <Text style={[t.textBlack, t.textCenter]}>{normalUser.username}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={[t.absolute, t.top0, t.wFull, t.hFull, { backgroundColor: color.black, opacity: .3 }]}></View>
        </View>

      </Modal>
    </View>
  )
}