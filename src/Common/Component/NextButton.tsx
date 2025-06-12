import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';

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
    backgroundColor: '#ffffff',
    padding: responsiveHeight(2),
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
