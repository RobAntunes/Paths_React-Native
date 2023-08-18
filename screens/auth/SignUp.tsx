import React, {FormEvent, useEffect, useId, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import Logo from '../../assets/images/logo-white.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik, FormikHelpers} from 'formik';
import AntD from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import {supabase} from '../../App';

import {OAuthData} from './SignIn';

const schema = Yup.object().shape({
  'First Name': Yup.string()
    .matches(/[a-zA-Z0_.'-]+/gi, 'Invalid first name')
    .required('Invalid first name'),
  'Last Name': Yup.string()
    .matches(/[a-zA-Z0.'-]+/gi, 'Invalid last name')
    .required('Invalid last name'),
  Email: Yup.string().email('Invalid email').required('Invalid email'),
  Password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must be less than 24 characters')
    .required('Password is required'),
  'Confirm Password': Yup.string()
    .is([Yup.ref('Password'), null], 'Passwords must match')
    .required('This field is required'),
  Username: Yup.string()
    .min(3, "Username can't be less than 3 characters")
    .required('Username is required')
    .matches(/[a-zA-Z0-9_.'-]+/gi, 'Invalid username'),
});

const SignUp = ({navigation}: {navigation: any}) => {
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <View>
          <View style={styles.logoWrapper}>
            <Logo width={200} height={50} />
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Create an account.</Text>
          </View>
        </View>
        <Formik
          validateOnBlur
          validate={values => {
            (async () => {
              try {
                await schema.validate(values, {abortEarly: false});
              } catch (e) {
                console.log(e);
              }
            })();
          }}
          validationSchema={schema}
          initialValues={{
            'First Name': '',
            'Last Name': '',
            Email: '',
            Password: '',
            'Confirm Password': '',
            Username: '',
          }}
          onSubmit={(values: any, {setSubmitting}: FormikHelpers<any>) => {
            (async () => {
              try {
                const {
                  data: {user},
                } = await supabase.auth.signUp({
                  email: values.Email,
                  password: values.Password,
                  options: {
                    data: {
                      first_name:
                        values['First Name'][0].toUpperCase +
                        values['First Name'].slice(1),
                      last_name:
                        values['Last Name'][0].toUpperCase +
                        values['Last Name'].slice(1),
                      username: values.Username,
                      created_at: new Date(),
                      updated_at: new Date(),
                    },
                  },
                });
                console.log(user);
                if (user) {
                  navigation.navigate('VerifyEmail', {
                    email: values.Email,
                  });
                }
              } catch (error) {
                console.log(error);
              }
            })();
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View
              style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    autoComplete="off"
                    autoCorrect={false}
                    style={[styles.input, styles.row]}
                    onChangeText={handleChange('First Name')}
                    onBlur={handleBlur('First Name')}
                    value={values['First Name']}
                  />
                  {/* {errors['First Name'] ? (
                    <Text style={{color: 'red'}}>{errors['First Name']}</Text>
                  ) : null} */}
                </View>
                <View>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    autoComplete="off"
                    autoCorrect={false}
                    style={[styles.input, styles.row]}
                    onChangeText={handleChange('Last Name')}
                    onBlur={handleBlur('Last Name')}
                    value={values['Last Name']}
                  />
                </View>
              </View>
              <View>
                <View style={{marginVertical: 10}}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    autoComplete="off"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={handleChange('Email')}
                    onBlur={handleBlur('Email')}
                    value={values.Email}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <Pressable
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 37.5,
                        zIndex: 1,
                      }}
                      onPress={() => setSecure(prev => !prev)}>
                      {({pressed}) => (
                        <Feather
                          name={secure === true ? 'eye' : 'eye-off'}
                          size={18}
                          color="#000"
                        />
                      )}
                    </Pressable>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      importantForAutofill="no"
                      autoFocus={false}
                      autoComplete="off"
                      autoCorrect={false}
                      secureTextEntry={secure === true ? true : false}
                      style={[styles.input, styles.row, {paddingRight: 40}]}
                      onChangeText={handleChange('Password')}
                      onBlur={handleBlur('Password')}
                      value={values.Password}
                      textContentType="oneTimeCode"
                      keyboardType="default"
                      blurOnSubmit={false}
                    />
                  </View>
                  <View>
                    <Pressable
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 37.5,
                        zIndex: 1,
                      }}
                      onPress={() => setSecureConfirm(prev => !prev)}>
                      {({pressed}) => (
                        <Feather
                          name={secureConfirm === true ? 'eye' : 'eye-off'}
                          size={18}
                          color="#000"
                        />
                      )}
                    </Pressable>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <TextInput
                      importantForAutofill="no"
                      autoComplete="off"
                      autoCorrect={false}
                      secureTextEntry={secureConfirm === true ? true : false}
                      style={[styles.input, styles.row, {paddingRight: 40}]}
                      onChangeText={handleChange('Confirm Password')}
                      onBlur={handleBlur('Confirm Password')}
                      value={values['Confirm Password']}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginVertical: 10, position: 'relative'}}>
                <View
                  style={{
                    display: 'flex',
                    backgroundColor: '#E5E5E5',
                    height: 47,
                    width: 50,
                    position: 'absolute',
                    bottom: 0,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                  }}>
                  <Text style={{color: '#000'}}>@</Text>
                </View>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  keyboardType="default"
                  style={[styles.input, {paddingRight: 40, paddingLeft: 65}]}
                  onChangeText={handleChange('Username')}
                  onBlur={handleBlur('Username')}
                  value={values.Username}
                />
              </View>
              <Pressable
                style={{marginVertical: 10}}
                onPress={e =>
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
                }>
                {({pressed}) => (
                  <View style={pressed ? styles.pressed : styles.submit}>
                    <Ionicons name="create-outline" size={24} color="#000" />
                    <Text style={{color: '#000'}}> Sign Up</Text>
                  </View>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.divider} />
          <Text style={{color: '#fff', marginHorizontal: 5}}>OR</Text>
          <View style={styles.divider} />
        </View>
        <View style={[{marginVertical: 10}, styles.oauthWrapper]}>
          {OAuthData.map((item, i) => {
            return (
              <Pressable
                key={item.name}
                style={[{marginTop: 10}, styles.oauthButton]}>
                {({pressed}) => (
                  <View
                    style={[
                      pressed ? styles.pressed : styles.submit,
                      {width: '100%'},
                    ]}>
                    <AntD name={item.iconName} size={24} color={'#000'} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
        <View style={{marginBottom: 10}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: '#FFF'}}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              {({pressed}) => (
                <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                  {' '}
                  Sign In
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#000', //#DC004F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    elevation: 25,
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 5,
    width: Dimensions.get('window').width - 80,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2 - 42.5,
    marginHorizontal: 2.5,
  },
  logoWrapper: {
    marginTop: 30,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleContainer: {
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: Dimensions.get('window').width - 80,
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
  oauthWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  oauthButton: {
    width: '30%',
  },
  divider: {
    backgroundColor: '#fff',
    height: 1,
    width: (Dimensions.get('window').width - 120) / 2,
  },
});

export default SignUp;
