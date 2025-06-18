import auth from '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthResult {
  user: FirebaseAuthTypes.User | null;
  error: string | null;
}

export const emailSignup = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return {user: userCredential.user, error: null};
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return {user: null, error: 'That email address is already in use!'};
    }

    if (error.code === 'auth/invalid-email') {
      return {user: null, error: 'That email address is invalid!'};
    }
    return {user: null, error: error.message};
  }
};

export const emailSignin = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return {user: userCredential.user, error: null};
  } catch (error: any) {
    return {user: null, error: error.message};
  }
};

export const emaiLogout = async (): Promise<{error: string | null}> => {
  try {
    await auth().signOut();
    return {error: null};
  } catch (error: any) {
    return {error: error.message};
  }
};

export const ResetEmail = async (email: string): Promise<AuthResult> => {
  try {
    await auth().sendPasswordResetEmail(email);
    console.log('Link sent successfully');
    return {user: null, error: null};
  } catch (error: any) {
    let errorMessage: string;

    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'This user does not exist.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/missing-email':
        errorMessage = 'Please enter an email address.';
        break;
      default:
        errorMessage = 'An unknown error occurred. Please try again.';
    }

    return {user: null, error: errorMessage};
  }
};
