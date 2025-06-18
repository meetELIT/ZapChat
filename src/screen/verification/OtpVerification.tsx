import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

import {Images} from '../../../assets';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Stacknavigation/Appnavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {fontSize, hp, wp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';
import Strings from '../../theme/String';

type OTPVerificationRouteProp = RouteProp<
  RootStackParamList,
  'OtpVerification'
>;
type OTPVerificationNavProp = StackNavigationProp<
  RootStackParamList,
  'OtpVerification'
>;
const otpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  useEffect(() => {
    const code = otp.join('');
    if (code.length === 6) {
      verifyCode(code);
    }
  }, [otp]);
  const route = useRoute<OTPVerificationRouteProp>();
  const navigation = useNavigation<OTPVerificationNavProp>();
  const {confirmation} = route.params as {confirmation: any};
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      return;
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.Key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  const verifyCode = async (code: string) => {
    try {
      await confirmation.confirm(code);
      console.log('otp varify sucessfully');
      navigation.reset({routes: [{name: 'BottomTab'}]});
    } catch (e) {
      Alert.alert('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={Images.backbutton_ic} />
      </TouchableOpacity>

      <Text style={styles.title}>{Strings.verificatrion}</Text>

      <KeyboardAvoidingView style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            ref={ref => {
              inputs.current[index] = ref;
            }}
            autoFocus={index === 0}
          />
        ))}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default otpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: hp(3),
    paddingHorizontal: wp(5),
  },
  backButton: {
    marginTop: hp(2),
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: hp(5),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  input: {
    width: wp(12),
    height: hp(7),
    borderRadius: 10,
    backgroundColor: Colors.white1,
    textAlign: 'center',
    fontSize: fontSize(16),
    fontWeight: '600',
    color: Colors.black,
  },
});
