import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
import Modal from 'react-native-modal';
import GradientButton from '../../Common/Component/GradientButton';
import {emailSignup} from '../../auth/emailAuth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Stacknavigation/Appnavigator';
import CommonInput from '../../Common/Component/commonInput';
import {ScrollView} from 'react-native-gesture-handler';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
  Asset,
} from 'react-native-image-picker';
import {signInWithPhoneNumber} from '../../auth/phone/phoneAuth';
import {fontSize, hp, wp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';
import Strings from '../../theme/String';
import SocialButton from '../../Common/Component/SocialButton';
const SignUp: React.FC = () => {
  const [loginType, setLoginType] = useState<string>('email');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<Asset | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('Enter a Phone number');
  const [isModalVisible, setModalVisible] = useState(false);
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const pickFromLibrary = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
        return;
      }
      setImage(response.assets?.[0] || null);
      toggleModal();
    });
  };
  const takePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
        return;
      }
      setImage(response.assets?.[0] || null);
      toggleModal();
    });
  };
  const [isSelected, setisSelected] = useState<number>(0);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const handlesignUp = async () => {
    try {
      const userCredential = await emailSignup(email, password);
      if (userCredential && userCredential.user) {
        Alert.alert(`wlcome ${userCredential.user.email}`);
        navigation.reset({routes: [{name: 'BottomTab'}]});
      } else {
        Alert.alert('email is invalid or already existed ');
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };
  const renderEmailForm = () => (
    <View style={styles.formContainer}>
      <CommonInput
        icon={Images.user_ic}
        value={firstname}
        onChangeText={setFirstname}
        placeholder={Strings.f_name}
        secureTextEntry={false}
      />

      <CommonInput
        icon={Images.user_ic}
        value={lastname}
        onChangeText={setLastname}
        placeholder={Strings.l_name}
        secureTextEntry={false}
      />
      <CommonInput
        icon={Images.usename_ic}
        value={username}
        onChangeText={setUsername}
        placeholder={Strings.u_name}
        secureTextEntry={false}
      />
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

      <GradientButton
        title={Strings.sign_up}
        onPress={() => {
          handlesignUp();
        }}
        buttonStyle={{marginTop: 20}}
        textStyle={{fontSize: 18}}
      />
    </View>
  );

  const renderPhoneForm = () => (
    <View style={styles.formContainer}>
      <CommonInput
        icon={Images.user_ic}
        value={firstname}
        onChangeText={setFirstname}
        placeholder={Strings.f_name}
        secureTextEntry={false}
      />
      <CommonInput
        icon={Images.user_ic}
        value={lastname}
        onChangeText={setLastname}
        placeholder={Strings.l_name}
        secureTextEntry={false}
      />
      <CommonInput
        icon={Images.usename_ic}
        value={username}
        onChangeText={setUsername}
        placeholder={Strings.u_name}
        secureTextEntry={false}
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={Images.backbutton_ic} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{Strings.Signup_title}</Text>
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
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={image == null ? Images.pfp_ic : {uri: image.uri}}
              style={image == null ? styles.pfpImage_ic : styles.pfpImage}
            />
          </TouchableOpacity>
          <Image source={Images.camera_ic} style={styles.cameraIcon2} />
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
            <SocialButton icon={Images.google_ic} onPress={() => {}} />
            <SocialButton icon={Images.facebook_ic} onPress={() => {}} />
            <SocialButton icon={Images.apple_ic} onPress={() => {}} />
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>{Strings.Signup_login} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.signUpLink}>{Strings.sign_in}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.option} onPress={takePhoto}>
            <Text style={styles.optionText}>{Strings.modal_takephoto}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={pickFromLibrary}>
            <Text style={styles.optionText}>
              {Strings.modal_choosefromlibrary}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={toggleModal}>
            <Text style={[styles.optionText, {color: Colors.red}]}>
              {Strings.cancle}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: hp(2),
  },
  backButton: {
    width: wp(10),
    height: hp(6),
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
    color: Colors.grey2,
  },

  countryCodeText: {
    flex: 1,
    fontSize: fontSize(16),
    color: Colors.grey2,
    marginLeft: wp(3),
  },
  dropdownIcon: {
    color: Colors.grey2,
  },
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
    marginBottom: hp(3.69),
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
    marginBottom: hp(5),
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.white,
    paddingBottom: hp(5),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    padding: hp(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey2,
  },
  cameraIcon2: {
    width: wp(6),
    height: hp(3),
    position: 'absolute',
    bottom: hp(0),
    right: hp(2),
    zIndex: 1,
  },
  optionText: {
    fontSize: fontSize(16),
    textAlign: 'center',
  },
  gradientButton: {marginTop: hp(2)},
  gradienttextstyle: {fontSize: fontSize(16)},
  lineargradientStyle: {
    borderRadius: 10,
    padding: hp(1.5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.white1,
    borderRadius: 100,
    height: hp(15),
    width: hp(15),
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pfpImage_ic: {
    width: hp(5),
    height: hp(5),
  },
  pfpImage: {
    height: hp(15),
    width: hp(15),
    borderRadius: 100,
  },
  dropDown: {position: 'absolute', right: 15},
});

export default SignUp;
