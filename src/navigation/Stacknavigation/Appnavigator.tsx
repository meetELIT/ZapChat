import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OnBoarding from '../../screen/OnBoarding';
import SignIn from '../../screen/SignIn';
import OtpVerification from '../../screen/verification/OtpVerification';
import homeScreen from '../../screen/HomeScreen';
import BottomTab from '../Bottomtab/BottomTab';
import SendMail from '../../screen/email_reset/SendMail';
import SignUp from '../../screen/SignUp/SignUp';
import LogIn from '../../screen/SignIn/LogIn';

export type RootStackParamList = {
  OnBoarding: undefined;
  SignIn: undefined;
  LogIn: undefined;
  Auth: undefined;
  phoneAuth: undefined;
  SignUp: undefined;
  OtpVerification: {confirmation: any};
  homeScreen: undefined;
  dummyScreen: {title: string};
  BottomTab: undefined;
  Demo: undefined;
  SendMail: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Appnavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="homeScreen" component={homeScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="SendMail" component={SendMail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Appnavigator;
