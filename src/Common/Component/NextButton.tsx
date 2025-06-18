import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';

import {hp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';

interface CommonButtonProps {
  submit: (event: GestureResponderEvent) => void;
  text: string;
  customebuttonstyle?: object;
}

const NextButton: React.FC<CommonButtonProps> = ({
  submit,
  text,
  customebuttonstyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.nextButton, customebuttonstyle]}
      onPress={submit}>
      <Text style={[styles.nextText]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  nextButton: {
    width: '85%',
    borderRadius: 100,
    backgroundColor: Colors.white,
    padding: hp(2),
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
