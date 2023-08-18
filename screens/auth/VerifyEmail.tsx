import {Link} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

const VerifyEmail = ({navigation, route}: {navigation: any; route: any}) => {
  useEffect(() => {
    // Handle deep link when the app is opened via a deep link
    const handleDeepLink = (event: {url: any}) => {
      let {url} = event;
      // Process the URL
      console.log(url);
      console.log('app is running in the background');
    };

    // Add event listener
    const ES = Linking.addEventListener('url', handleDeepLink);

    // Handle the case where the app is not running in the background
    Linking.getInitialURL().then(url => {
      if (url) {
        // Process the URL
        console.log(url);
        console.log('app is not running in the background');
      }
    });

    // Cleanup
    return () => {
      Linking.removeSubscription(ES);
    };
  }, []);

  
  const handleURL = (url: string) => {
    const path = url.replace(/.*?:\/\//g, ''); // Remove the scheme
    if (path === 'reset-password') {
      // Navigate to the reset password screen
    }
    // Handle other paths or query parameters as needed
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lotties/verify_email.json')}
        style={{width: 300, height: 300}}
        autoPlay
        loop
      />
      <View style={styles.textWrapper}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
          }}>
          A verification email has been sent to{' '}
          <Text style={{fontWeight: 'bold'}}>{route.params.email}.</Text>
          {'\n'}
          Please verify your email to continue.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: 300,
    marginTop: 20,
  },
});

export default VerifyEmail;
