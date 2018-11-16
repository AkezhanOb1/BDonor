import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Auth/LoginScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import Info from '../screens/info/Info'
import AddNewScreen from '../screens/AddNewsScreen'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    SignUp: SignUpScreen,
    Main: MainTabNavigator,
    Info: Info,
    Login: LoginScreen,
    addNews: AddNewScreen,

});
