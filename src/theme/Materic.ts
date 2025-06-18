import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {Platform} from 'react-native';

const fontSize = (val: number) => RFValue(val, 812);

const wp = (val: number) => widthPercentageToDP(val);
const hp = (val: number) => heightPercentageToDP(val);
const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const PlatformVersion = Platform.Version;

export {wp, hp, fontSize, isIos, isAndroid, PlatformVersion};
