import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ServerURL } from "../constants";
import { useAuth } from "./AuthContext";
import { Call, Voice } from "@twilio/voice-react-native-sdk";

export type TwilioContextType = {
  token?: string;
  voice: Voice,
  number?: string;
  setNumber:  React.Dispatch<React.SetStateAction<string | undefined>>,
  getToken:  () => Promise<void>

}
const TwilioContext = createContext<TwilioContextType | undefined>(undefined);

export function useTwilio() {
  const context = useContext(TwilioContext);
  if (!context) {
    throw new Error(
      'useTwilioContext must be used within an TwilioContextProvider'
    );
  }
  return context;
};

export function TwilioContextProvider({ children }: { children: ReactNode }) {
  const { userData } = useAuth()
  const [token, setToken] = useState<string>();
  const [number, setNumber] = useState<string>();

  const voice = useMemo(() => {
    return new Voice();
  }, []);

  const getToken = useCallback(async () => {
    if (userData?.role && userData.username) {
      const response = await axios.post(`${ServerURL}/token`, {
        identity: userData.username
      });
      if (response.data) {
        setToken(response.data);
        // console.log(response.data, 'token initiated')
        // const outgoingCall = await voice.connect(response.data, {
        //   params: {
        //     To: '18086338946',
        //     recipientType: "18086338946"
        //   },

        //   contactHandle: "18086338946"
        // });
        // outgoingCall.on(Call.Event.ConnectFailure, (error) =>
        //   console.error('ConnectFailure:', error),
        // );
        // outgoingCall.on(Call.Event.Reconnecting, (error) =>
        //   console.error('Reconnecting:', error),
        // );
        // outgoingCall.on(Call.Event.Disconnected, (error) => {
        //   // The type of error here is "TwilioError | undefined".
        //   if (error) {
        //     console.error('Disconnected:', error);
        //   }

        //   const callSid = outgoingCall.getSid();
        //   if (typeof callSid !== 'string') {
        //     return;
        //   }

        //   // await voice.register(response.data)
        // });
      }
    }
  }, [userData]);

  // useEffect(() => {
  //   const _voice = new Voice()
  // }, [token])

  useEffect(() => {
    getToken();
  }, [getToken])

  return (
    <TwilioContext.Provider
      value={{
        token,
        voice,
        number,
        setNumber,
        getToken
      }
      }>
      {children}
    </TwilioContext.Provider>
  )
}
