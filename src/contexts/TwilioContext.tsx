import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ServerURL } from "../constants";
import { useAuth } from "./AuthContext";
import { Voice } from "@twilio/voice-react-native-sdk";

export type TwilioContextType = {
  token?: string;
  // voice?: Voice;

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
  
  const voice = useMemo(() => {
    return new Voice();
  }, []);

  const initiateToken = useCallback(async () => {
    if (userData?.role && userData.username) {
      const response = await axios.post(`${ServerURL}/token`, {
        identify: userData.username
      });

      if (response.data) {
        setToken(response.data);
        // await voice.register(response.data)
      }
    }
  }, [userData]);

  // useEffect(() => {
  //   const _voice = new Voice()
  // }, [token])

  useEffect(() => {
    initiateToken();
  }, [initiateToken])

  return (
    <TwilioContext.Provider
      value={{
        token,
        // voice,
      }
      }>
      {children}
    </TwilioContext.Provider>
  )
}
