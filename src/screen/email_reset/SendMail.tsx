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
import {Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../Common/Component/GradientButton';
import CommonInput from '../../Common/Component/commonInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Stacknavigation/Appnavigator';
import {ResetEmail} from '../../auth/emailAuth';
import {Colors} from '../../theme/Colors';
import {fontSize, hp, wp} from '../../theme/Materic';
import Strings from '../../theme/String';

const SendMail: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const resetEmail = async () => {
    const result = await ResetEmail(email);
    if (result.error) {
      Alert.alert('Error', result.error);
    } else {
      Alert.alert('Success', 'Email sent successfully');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={Images.backbutton_ic} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{Strings.email_reset}</Text>
        <CommonInput
          icon={Images.email_ic}
          value={email}
          onChangeText={setEmail}
          placeholder={Strings.email}
          secureTextEntry={false}
        />
      </View>
      <View style={styles.gradient_container}>
        <GradientButton
          title={Strings.send_code}
          onPress={resetEmail}
          buttonStyle={styles.button_Style}
          textStyle={styles.button_Text}
        />
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
    paddingTop: hp(2.5),
  },
  backButton: {
    width: hp(10),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  button_Style: {
    width: wp(85),
    marginBottom: hp(10),
    alignSelf: 'center',
  },
  title: {
    fontSize: fontSize(26),
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp(5),
  },
  button_Text: {fontSize: 18},
  gradient_container: {
    paddingHorizontal: hp(20),
  },
});

export default SendMail;
