import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import GradientButton from '../../Common/Component/GradientButton';
import CommonInput from '../../Common/Component/commonInput';
import {emailSignin} from '../../auth/emailAuth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Stacknavigation/Appnavigator';
import {signInWithPhoneNumber} from '../../auth/phone/phoneAuth';
import {signInWithGoogle} from '../../auth/social/googleAtuh';
import {fontSize, hp, wp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';
import SocialButton from '../../Common/Component/SocialButton';
import Strings from '../../theme/String';

const LogIn: React.FC = () => {
  const [loginType, setLoginType] = useState<string>('email');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('Enter a Phone number');
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState<string>('91');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const fullNumber = `+${callingCode}${phoneNumber}`;
  const sendCode = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(fullNumber);
      setConfirm(confirmation);
      navigation.navigate('OtpVerification', {confirmation});
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  const [isSelected, setisSelected] = useState<number>(0);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const handleLogin = async () => {
    try {
      const userCredential = await emailSignin(email, password);
      if (userCredential && userCredential.user) {
        Alert.alert(`wlcome ${userCredential.user.email}`);
        navigation.reset({routes: [{name: 'BottomTab'}]});
      } else {
        Alert.alert('Login returned no user.');
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const renderEmailForm = () => (
    <View style={styles.formContainer}>
      <CommonInput
        icon={Images.email_ic}
        value={email}
        onChangeText={setEmail}
        placeholder={Strings.email}
        secureTextEntry={false}
      />

      <CommonInput
        icon={Images.lock_ic}
        value={password}
        onChangeText={setPassword}
        placeholder={Strings.password}
        secureTextEntry
        showToggle
        toggleIcon={{
          show: Images.hide_ic,
          hide: Images.viewOff_ic,
        }}
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => {
          navigation.navigate('SendMail');
        }}>
        <Text style={styles.forgotPasswordText}>
          {Strings.Login_forgot_password}
        </Text>
      </TouchableOpacity>
      <GradientButton
        title={Strings.sign_in}
        onPress={handleLogin}
        buttonStyle={styles.button_Style}
        textStyle={styles.button_Text}
      />
    </View>
  );
  const renderPhoneForm = () => (
    <View style={styles.formContainer}>
      <CountryPicker
        onSelect={onSelect}
        countryCode={countryCode}
        onClose={() => setVisible(false)}
        visible={visible}
        withFlagButton={false}
      />
      <View style={styles.countrycodeContainer}>
        <CountryPicker
          onSelect={onSelect}
          countryCode={countryCode}
          onClose={() => setVisible(false)}
          visible={visible}
          withFlagButton={false}
        />
        <Image source={Images.country_ic} />
        <Text style={styles.countryCodeText}>+{callingCode}</Text>
        <TouchableOpacity
          style={styles.dropDown}
          onPress={() => setVisible(true)}>
          <Image source={Images.downArrow_ic} />
        </TouchableOpacity>
      </View>

      <CommonInput
        icon={Images.phone_ic}
        onChangeText={setPhoneNumber}
        placeholder={Strings.phone_no}
        secureTextEntry={false}
      />
      <GradientButton
        title={Strings.send_code}
        onPress={sendCode}
        buttonStyle={styles.gradientButton}
        textStyle={styles.gradienttextstyle}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignIn')}>
          <Image source={Images.backbutton_ic} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{Strings.Login_title}</Text>
        <View style={styles.authOptionContainer}>
          <TouchableOpacity
            onPress={() => {
              setisSelected(0), setLoginType('email');
            }}>
            <LinearGradient
              colors={
                isSelected === 0
                  ? [Colors.orange, Colors.red]
                  : [Colors.white1, Colors.white1]
              }
              style={styles.lineargradientStyle}>
              <Text
                style={{
                  color: isSelected === 0 ? Colors.white : Colors.black,
                  fontWeight: 'bold',
                }}>
                {Strings.email}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setisSelected(1), setLoginType('phone');
            }}>
            <LinearGradient
              colors={
                isSelected === 1
                  ? [Colors.orange, Colors.red]
                  : [Colors.white1, Colors.white1]
              }
              style={styles.lineargradientStyle}>
              <Text
                style={{
                  color: isSelected === 1 ? Colors.white : Colors.black,
                  fontWeight: 'bold',
                }}>
                {Strings.phone}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {loginType === 'email' ? renderEmailForm() : renderPhoneForm()}
        <View style={styles.socialContainer}>
          <View style={styles.textlineContainer}>
            <View style={styles.orTextline} />
            <View>
              <Text style={styles.orText}> {Strings.Login_continueWith} </Text>
            </View>
            <View style={styles.orTextline} />
          </View>
          <View style={styles.socialButtons}>
            <SocialButton icon={Images.google_ic} onPress={signInWithGoogle} />
            <SocialButton icon={Images.facebook_ic} onPress={() => {}} />
            <SocialButton icon={Images.apple_ic} onPress={() => {}} />
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>{Strings.Login_signup} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>{Strings.sign_up}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: hp(2),
    paddingTop: hp(2.5),
  },
  backButton: {
    width: wp(10),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
  },

  content: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  orText: {
    color: Colors.black,
    marginVertical: hp(1),
    fontSize: fontSize(16),
  },
  title: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp(5),
  },

  formContainer: {
    marginBottom: hp(3),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white1,
    borderRadius: 12,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginBottom: hp(4),
  },

  textInput: {
    flex: 1,
    fontSize: fontSize(16),
    color: Colors.black,
  },
  countryCodeText: {
    marginLeft: wp(3),
    fontSize: fontSize(16),
    color: Colors.grey,
  },
  dropdownIcon: {
    color: Colors.black,
  },
  button_Text: {fontSize: fontSize(16)},

  countrycodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white1,
    borderRadius: 12,
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
    height: hp(7),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: Colors.black,
    fontSize: fontSize(16),
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: hp(2),
  },

  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',

    paddingRight: wp(2),
    paddingLeft: wp(2),
  },
  button_Style: {marginTop: hp(2)},
  socialButton: {
    height: wp(5),
    borderRadius: 40,
    padding: wp(10),
    borderWidth: 0.5,
    borderColor: Colors.grey2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2.5),
  },
  signUpText: {
    color: Colors.grey,
    fontSize: fontSize(16),
  },
  signUpLink: {
    color: Colors.orange,
    fontSize: fontSize(16),
    fontWeight: 'bold',
  },
  authOptionContainer: {
    alignSelf: 'center',

    marginBottom: hp(4),
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: Colors.white1,
    alignItems: 'center',
  },
  textlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  orTextline: {
    flex: 1,
    height: hp(0.1),
    backgroundColor: Colors.grey2,
  },
  dropDown: {position: 'absolute', right: 15},
  gradientButton: {marginTop: hp(2)},
  gradienttextstyle: {fontSize: fontSize(16)},
  lineargradientStyle: {
    borderRadius: 10,
    padding: hp(1.5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default LogIn;
