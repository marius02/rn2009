/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/contexts/AuthContext';
import StartScreen from './src/screens/StartScreen';
import ParcareScreen from './src/screens/ParcareScreen';
import customColors from './src/constants/colors';
import { t } from 'react-native-tailwindcss';
import { OrderContextProvider } from './src/contexts/OrderContext';
import MasterOrderScreen from './src/screens/MasterOrderScreen';
import UserOrderScreen from './src/screens/UserOrderScreen';
import { TwilioContextProvider } from './src/contexts/TwilioContext';
import CallScreen from './src/screens/CallScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    <AuthContextProvider>
      <OrderContextProvider>
        <TwilioContextProvider>

          <View style={[{ backgroundColor: customColors.purple_500 }]}>

            <Text style={[t.textWhite, t.p3]}>2009</Text>
          </View>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Login", headerShown: false }}
              />
              <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{ title: "Start", headerShown: false }}
              />
              <Stack.Screen
                name="Parcare"
                component={ParcareScreen}
                options={{ title: "Start Order", headerShown: false }}
              />
              <Stack.Screen
                name="MasterOrder"
                component={MasterOrderScreen}
                options={{ title: "Orders", headerShown: false }}
              />
              <Stack.Screen
                name="UserOrder"
                component={UserOrderScreen}
                options={{ title: "Orders", headerShown: false }}
              />
              <Stack.Screen
                name="Call"
                component={CallScreen}
                options={{ title: "Call", headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TwilioContextProvider>
      </OrderContextProvider>
    </AuthContextProvider>
    // </SafeAreaView>
  );
}

export default App;
