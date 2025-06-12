import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
//import CommonButton from '../components/CommonButton';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Responsive from '../Common/Dimension/Responsive';
import NextButton from '../Common/Component/NextButton';

interface Message {
  id: string;
  text: string;
  image: any;
  sub_title: string;
}

const messages: Message[] = [
  {
    id: '1',
    text: 'Connect people around \n the world',
    image: Images.OnBoarding1,
    sub_title: 'Never miss those precious moments.',
  },
  {
    id: '2',
    text: 'Don’t miss out on what your friends are up to',
    image: Images.OnBoarding2,
    sub_title: 'Never miss those precious moments.',
  },
  {
    id: '3',
    text: 'Chatting, Made Simple.',
    image: Images.OnBoarding3,
    sub_title: 'Communicate with family and friends quickly \nand easily.',
  },
];

const OnBoarding: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const navigation = useNavigation();
  console.log(currentMessageIndex);

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
        <NextButton submit={handleNext} text="Next" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // imgContainer: {
  //   //alignItems: 'center',
  // },

  image: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(7),
  },
  imageOnboarding4: {
    width: responsiveWidth(100),
    height: responsiveHeight(60),
    resizeMode: 'stretch',
  },
  nextButton: {
    width: responsiveWidth(85),
    //height: responsiveHeight(6),
    borderRadius: 40,
    borderWidth: 0.5,
    backgroundColor: '#ffffff',
    marginBottom: responsiveHeight(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signinButton: {
    // width: responsiveWidth(85),
    // height: responsiveHeight(6),
    borderRadius: 40,
    borderWidth: 0.5,
    backgroundColor: '#ffffff',
    marginBottom: responsiveHeight(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'encode-sans-expanded',
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
    //fontFamily: 'EncodeSansExpanded',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#ccc',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  nextText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

export default OnBoarding;
