import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {fontSize, hp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';

type GradientButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <LinearGradient
        colors={[Colors.orange, Colors.red]}
        style={[styles.button, buttonStyle, disabled && {opacity: 0.6}]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: fontSize(2),
    fontWeight: 'bold',
  },
});

export default GradientButton;
