import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddressScreen from '../screens/AddressScreen';
import DonationScreen from '../screens/DonationScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EachHistoryScreen from '../screens/EachHistoryScreen';


/*---------------------------------------Home Screen-----------------------------------------------------------------*/

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Feed',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-megaphone${focused ? '' : '-outline'}` : 'md-megaphone'}
        />
    ),
};

/*---------------------------------------Home Screen END--------------------------------------------------------------*/


/*---------------------------------------Address Screen---------------------------------------------------------------*/

const AddressStack = createStackNavigator({
    Links: AddressScreen,
});



AddressStack.navigationOptions = {
    tabBarLabel: 'Address',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
        />
    ),
};

/*---------------------------------------Address Screen END-----------------------------------------------------------*/


/*---------------------------------------Donation Screen--------------------------------------------------------------*/

const DonationStack = createStackNavigator({
    Settings: DonationScreen,
});



DonationStack.navigationOptions = {
    tabBarLabel: 'Personal Training',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-heart${focused ? '' : '-outline'}` : 'md-heart'}
        />
    ),
};

/*---------------------------------------Donation Screen END----------------------------------------------------------*/


/*---------------------------------------History Screen--------------------------------------------------------------*/

const HistoryStack = createStackNavigator({
    Settings: HistoryScreen,
    EachHistory: EachHistoryScreen,
});

HistoryStack.navigationOptions = {
    tabBarLabel: 'Diary',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-book${focused ? '' : '-outline'}` : 'md-book'}
        />
    ),
};

/*---------------------------------------History Screen END----------------------------------------------------------*/


/*---------------------------------------Profile Screen--------------------------------------------------------------*/

const ProfileStack = createStackNavigator({
    Settings: ProfileScreen,
});



ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-man${focused ? '' : '-outline'}` : 'md-man'} // soon i will add gender icon if user is a woon icoon will be ios-woman and md-woman
        />
    ),
};

/*---------------------------------------Profile Screen END----------------------------------------------------------*/


/*---------------------------------------Add News Screen--------------------------------------------------------------*/


/*--------------------------------------Add News Screen End----------------------------------------------------------*/

export default createBottomTabNavigator({
    HomeStack,
    AddressStack,
    HistoryStack,
    DonationStack,
    ProfileStack,
});
