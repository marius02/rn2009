import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { color, colors, t } from "react-native-tailwindcss";
import { Colors } from "react-native/Libraries/NewAppScreen";
import customColors from "../constants/colors";
import { authenticateUser, LoginFormData } from "../apis/Auth";
import { useAuth } from "../contexts/AuthContext";
import { useTwilio } from "../contexts/TwilioContext";
import { useOrder } from "../contexts/OrderContext";
import { Call } from "@twilio/voice-react-native-sdk";
const UserImage = require('../assets/images/user.png');
const endCallIcon = require("../assets/images/end-call.png");
const speakerImage = require('../assets/images/speaker-active.png');
const muteImage = require('../assets/images/mute.png');
export default function CallScreen({ navigation }: any) {
  const { setUserData } = useAuth();
  const { number, voice, token, } = useTwilio();
  const { selectedOrder, setSelectedOrder, } = useOrder();
  const [isMute, setIsMute] = useState(false);
  const [status, setStatus] = useState("");
  const [call, setCall] = useState<Call>();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  let interval: any;


  const isCallActive = useMemo(() => {
    if (status === "Connected") {
      clearInterval(interval);
      return true;
    }
  }, [status]);

  const initialCall = useCallback(async () => {
    if (voice && token && selectedOrder?.phone) {
      const outgoingCall = await voice.connect(token, {
        params: {
          To: selectedOrder.phone,

        }
      });
      setCall(outgoingCall);
      outgoingCall.on(Call.Event.ConnectFailure, (error) => {
        console.log('ConnectFailure:', error);
        setStatus("Failed");
        ToastAndroid.show("Apelul dvs. este refuzat", 2000)
        closeCall();
        setSelectedOrder(undefined)
      }
      );
      outgoingCall.on(Call.Event.Ringing, () => {
        setStatus("Sună...") //Ringing
      }
      );
      outgoingCall.on(Call.Event.Reconnecting, (error) => {
        console.log("Reconnecting, ", error);
        setStatus("Reconectare...")
      }
      );
      outgoingCall.on(Call.Event.Connected, () => {
        console.log("Connected");
        startTimer();
        setStatus("Connected");
      }
      );
      outgoingCall.on(Call.Event.Disconnected, (error) => {
        // The type of error here is "TwilioError | undefined".
        console.log('connect closed')
        if (error) {
          console.log('Disconnected:', error);
          setStatus("Deconectat...");
          ToastAndroid.show("Deconectat...", 2000)
          setSelectedOrder(undefined)
          closeCall();
        } else {
          ToastAndroid.show("Deconectat...", 2000)
          closeCall();
        }

        const callSid = outgoingCall.getSid();
        if (typeof callSid !== 'string') {
          return;
        }
      });
    }
  }, [selectedOrder, token]);

  // Start the timer
  const startTimer = () => {

    interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (interval)
      clearInterval(interval);
  };
  useEffect(() => {
    if (token && selectedOrder?.phone && voice) {
      initialCall()
    }
    return () => {
      setSelectedOrder(undefined);
      clearInterval(interval)
      if (call) {
        call.disconnect();
        stopTimer()
      }
    }
  }, []);

  const handleMute = () => {
    setIsMute(!isMute);
    if (!isMute && call) {
      call.mute(true);
    } else if (isMute && call) {
      call.mute(false)
    }
  }

  const handleClose = () => {
    if (call) {
      call.disconnect();
    }
    stopTimer()
    // navigation.goBack();
    setSelectedOrder(undefined)
  }

  const closeCall = () => {
    return setTimeout(() => {
      setSelectedOrder(undefined)
      navigation.goBack();
    }, 1000)
  }
  return (
    <View style={[t.flex, t.justifyBetween, t.hFull, t.mB10, , t.pB10, t.mT5, t.pT5, t.itemsCenter]}>
      <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT5, t.pT10]}>
        <Image source={UserImage} resizeMode={"contain"} style={[{ maxWidth: '50%', maxHeight: '50%' }]} />
        <Text>{selectedOrder?.city}</Text>
        <Text>{status == "Connected" ? `Durata apelului: ${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds}` : status}</Text>
      </View>
      <View style={[t.flex, t.flexRow, t.itemsCenter, t.justifyAround, t.wFull, t.pX10, t.pB10]}>
        <TouchableOpacity style={[t.w20, t.h20]} onPress={handleClose}>
          <Image source={endCallIcon} resizeMode="contain" style={{ maxHeight: "100%", maxWidth: "100%" }} />
        </TouchableOpacity>
        <TouchableOpacity style={[t.w20, t.h20]} onPress={handleMute} >
          <Image source={isMute ? muteImage : speakerImage} style={{ maxHeight: "100%", maxWidth: "100%" }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}