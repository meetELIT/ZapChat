import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  TouchableOpacity,
} from 'react-native';

import {fontSize, hp, wp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';

interface AppTextInputProps extends TextInputProps {
  icon?: any;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  toggleIcon?: {
    show: any;
    hide: any;
  };
}

const CommonInput: React.FC<AppTextInputProps> = ({
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showToggle = false,
  toggleIcon,
  ...rest
}) => {
  const [hideText, setHideText] = useState(secureTextEntry);

  useEffect(() => {
    setHideText(secureTextEntry);
  }, [secureTextEntry]);

  const handleToggle = () => {
    setHideText(!hideText);
  };

  return (
    <View style={styles.inputContainer}>
      {icon && <Image source={icon} style={styles.icon} />}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.grey}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hideText}
        {...rest}
      />
      {showToggle && toggleIcon && (
        <TouchableOpacity onPress={handleToggle}>
          <Image
            source={hideText ? toggleIcon.hide : toggleIcon.show}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white1,
    borderRadius: 12,
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
    height: hp(7),
  },
  textInput: {
    flex: 1,
    fontSize: fontSize(16),
  },
  icon: {
    marginRight: 10,
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
  },
  eyeIcon: {
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
  },
});

export default CommonInput;
