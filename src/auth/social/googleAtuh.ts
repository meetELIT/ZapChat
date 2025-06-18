// src/services/auth.ts
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {
  FirebaseAuthTypes,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {GoogleAuthProvider} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/Stacknavigation/Appnavigator';

GoogleSignin.configure({
  webClientId:
    '586845680855-04j4k4v3e4r6ohlvn6vpqqmdenrnj5ih.apps.googleusercontent.com',
  offlineAccess: true,
});

const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
// export const signInWithGoogle =
//   async (): Promise<GoogleAuthProvider.UserCredential> => {
//     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

//     const signInResult = await GoogleSignin.signIn();

//     let idToken = (signInResult as any).idToken ?? signInResult?.data?.idToken;
//     if (!idToken) {
//       // if you are using older versions of google-signin, try old style result
//       idToken = signInResult.data?.user;
//       console.log(idToken);
//     }
//     if (!idToken) {
//       throw new Error('Google Sign-In failed: No ID token returned.');
//     }
//     const googleCredential = GoogleAuthProvider.credential(
//       signInResult.data?.idToken,
//     );

//     // Sign-in the user with the credential
//     return signInWithCredential(getAuth(), googleCredential);
//     // const googleCredential = GoogleAuthProvider.credential(idToken);

//     // const userCredential = await auth().signInWithCredential(googleCredential);
//     // return userCredential;
//     //navigation.navigate('bottomTab');
//   };

export const signInWithGoogle =
  async (): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID token returned.');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      const users = await auth().signInWithCredential(googleCredential);
      console.log('users', users);
      // Sign in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };
