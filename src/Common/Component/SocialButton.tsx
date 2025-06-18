import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {wp} from '../../theme/Materic';
import {Colors} from '../../theme/Colors';

interface SocialButtonProps {
  icon: any;
  onPress: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default SocialButton;
