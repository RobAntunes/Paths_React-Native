import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import Logo from '../../assets/images/logo-white.svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AntD from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

export const OAuthData = [
  {
    iconName: 'google',
    name: 'Google',
  },
  {
    iconName: 'apple1',
    name: 'Apple',
  },
  {
    iconName: 'facebook-square',
    name: 'Facebook',
  },
  // microsoft: {
  //     button: <AntD name="windows" size={24} color="#000" />,
  // },
  // twitter: {
  //     button: <AntD name="twitter" size={24} color="#000" />,
  // },
];

const signupSchema = Yup.object().shape({
  Email: Yup.string().email('Invalid email').required('Required'),
  Password: Yup.string().min(8, 'Too Short!').required('Required'),
});

const SignIn = ({navigation}: {navigation: any}) => {
  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo width={200} height={50} />
      </View>
      <View>
        <Formik
          onSubmit={values => {
            console.log(values);
          }}
          initialValues={{Email: '', Password: ''}}
          validationSchema={signupSchema}>
          {({handleChange, handleBlur, handleSubmit, values}) => {
            return (
              <>
                <TextInput
                  id="email"
                  keyboardType={'email-address'}
                  placeholder="Email"
                  style={[styles.input, {marginBottom: 10}]}
                  onChangeText={handleChange('Email')}
                  onBlur={handleBlur('Email')}
                />
                <View style={styles.pwGroup}>
                  <TextInput
                    id="password"
                    secureTextEntry={secure ? true : false}
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={handleChange('Password')}
                    onBlur={handleBlur('Password')}
                  />
                  <Pressable
                    onPress={() => setSecure(!secure)}
                    style={styles.secure}>
                    <Feather
                      name={secure ? 'eye' : 'eye-off'}
                      size={21}
                      color="#000"
                    />
                  </Pressable>
                  <Pressable>
                    <Text style={styles.forgotPw}>Forgot Password?</Text>
                  </Pressable>
                </View>
                <Pressable onPress={e => handleSubmit()}>
                  {({pressed}) => {
                    return (
                      <View style={pressed ? styles.pressed : styles.submit}>
                        <AntD
                          name="login"
                          size={18}
                          color="#000"
                          style={styles.actionIcon}
                        />
                        <Text style={styles.buttonText}>Sign In</Text>
                      </View>
                    );
                  }}
                </Pressable>
              </>
            );
          }}
        </Formik>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <View style={styles.divider} />
          <Text style={{color: '#fff', marginHorizontal: 5}}>OR</Text>
          <View style={styles.divider} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width - 80,
          }}>
          {OAuthData.map((el, index) => {
            return (
              <Pressable key={index}>
                {({pressed}) => {
                  return (
                    <View
                      style={
                        pressed
                          ? [styles.pressed, styles.oauthButton]
                          : [styles.submit, styles.oauthButton]
                      }>
                      <AntD name={el.iconName} size={24} color={'#000'} />
                    </View>
                  );
                }}
              </Pressable>
            );
          })}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 12,
            }}>
            Don't have an account?{' '}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",//'#DC004F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    elevation: 25,
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 5,
    width: Dimensions.get('window').width - 80,
  },
  logoWrapper: {
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPw: {
    width: Dimensions.get('window').width - 120,
    color: '#fff',
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 10,
    // fontWeight: 'bold',
  },
  pwGroup: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secure: {
    position: 'absolute',
    right: 10,
    top: 12.5,
  },
  actionIcon: {
    marginRight: 10,
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width - 80,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submit: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width - 80,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    // fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    backgroundColor: '#fff',
    height: 1,
    width: (Dimensions.get('window').width - 120) / 2,
  },
  oauthButton: {
    width: (Dimensions.get('window').width - 80) / 2,
  },
});

export default SignIn;
