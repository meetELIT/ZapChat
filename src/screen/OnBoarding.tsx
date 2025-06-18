import {View, Image, Text, StyleSheet, FlatList} from 'react-native';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import NextButton from '../Common/Component/NextButton';
import {fontSize, hp, wp} from '../theme/Materic';
import {Colors} from '../theme/Colors';
import Strings from '../theme/String';

interface Message {
  id: string;
  text: string;
  image: any;
  sub_title: string;
}

const messages: Message[] = [
  {
    id: '1',
    text: Strings.Onboarding1_title,
    image: Images.OnBoarding1,
    sub_title: Strings.Onboarding1_subtitle,
  },
  {
    id: '2',
    text: Strings.Onboarding2_title,
    image: Images.OnBoarding2,
    sub_title: Strings.Onboarding2_subtitle,
  },
  {
    id: '3',
    text: Strings.Onboarding3_title,
    image: Images.OnBoarding3,
    sub_title: Strings.Onboarding3_subtitle,
  },
];

const OnBoarding: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      navigation.reset({
        routes: [{name: 'SignIn'} as any],
      });
    }
  };
  return (
    <View style={styles.container} accessible={true}>
      <View style={styles.image}></View>
      <FlatList
        data={[messages[currentMessageIndex]]}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.text}</Text>
            <Text style={styles.subTitle}>{item.sub_title}</Text>
          </View>
        )}
      />
      <View style={styles.nextButton}>
        <NextButton submit={handleNext} text={Strings.next} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    resizeMode: 'stretch',
    marginTop: hp(7),
  },
  imageOnboarding4: {
    width: wp(100),
    resizeMode: 'stretch',
  },
  nextButton: {
    width: wp(85),
    borderRadius: 40,
    borderWidth: 0.5,
    backgroundColor: Colors.white,
    marginBottom: hp(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signinButton: {
    borderRadius: 40,
    borderWidth: 0.5,
    backgroundColor: Colors.white,
    marginBottom: hp(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'encode-sans-expanded',
    marginTop: hp(2),
    paddingHorizontal: wp(2),
    fontSize: fontSize(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    color: Colors.grey2,
    fontSize: fontSize(16),
    textAlign: 'center',
  },
});

export default OnBoarding;
