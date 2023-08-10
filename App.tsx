import 'react-native-url-polyfill/auto';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createClient} from '@supabase/supabase-js';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import VerifyEmail from './screens/auth/VerifyEmail';

const supabaseUrl = 'https://gdjsqntjaifjorvducor.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey as string, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  const [signedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      console.log(await supabase.auth.getUser());
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (user) {
        setIsSignedIn(true);
      }
    })();
  }, []);

  return (
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
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
