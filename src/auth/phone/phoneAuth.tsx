import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

export const signInWithPhoneNumber = async (
  phoneNumber: string,
): Promise<FirebaseAuthTypes.ConfirmationResult> => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(confirmation, 'otp has been sent');
    return confirmation;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
