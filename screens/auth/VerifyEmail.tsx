import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const VerifyEmail = ({navigation, route}: {navigation: any; route: any}) => {
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
          A verification email has been sent to{" "}
          <Text style={{fontWeight: 'bold'}}>{route.params.email}.</Text>{"\n"}
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
