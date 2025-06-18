import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/Stacknavigation/Appnavigator';
import {fontSize, hp, wp} from '../theme/Materic';
import {Colors} from '../theme/Colors';
import Strings from '../theme/String';

const SignIn: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'LogIn'>>();

  return (
    <View style={styles.container} accessible={true}>
      <View style={styles.imgContainer}>
        <Image source={Images.OnBoarding4} style={styles.image} />

        <Text style={styles.title}>{Strings.Onboarding4_title}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <LinearGradient
            colors={[Colors.orange, Colors.red]}
            style={styles.button}>
            <Text style={styles.nextText}>{Strings.sign_in}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <LinearGradient
            colors={[Colors.orange, Colors.red]}
            style={styles.button}>
            <Text style={styles.nextText}>{Strings.sign_up}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    width: '100%',

    borderRadius: 100,

    padding: hp(2),
    alignItems: 'center',
    margin: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  imgContainer: {
    alignItems: 'center',
  },

  image: {
    width: wp(100),
  },
  imageOnboarding4: {
    width: wp(100),
    height: hp(60),
    resizeMode: 'stretch',
  },
  buttonContainer: {
    width: wp(85),
    paddingVertical: hp(0.3),
    borderRadius: 40,

    marginTop: hp(5),
    alignSelf: 'center',
  },

  title: {
    marginTop: hp(8),
    marginVertical: wp(10),
    fontSize: hp(3),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  nextText: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default SignIn;
