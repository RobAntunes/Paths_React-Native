import React, {useEffect, useState} from 'react';

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import VerifyEmail from './screens/auth/VerifyEmail';
import Toast from 'react-native-toast-message';
import {SUPABASE_KEY} from '@env';
import ConfirmVerification from './screens/auth/ConfirmVerification';

const SUPABASE_URL = 'https://gdjsqntjaifjorvducor.supabase.co';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
})
const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  const [signedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (user) {
        setIsSignedIn(true);
      }
    })();
  }, []);

  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator>
          {signedIn ? (
            <RootStack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <RootStack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="ConfirmVerification"
                component={ConfirmVerification}
                options={{headerShown: false}}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
