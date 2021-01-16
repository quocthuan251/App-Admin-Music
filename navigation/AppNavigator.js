import React, { useContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeAdmin from '../screens/HomeAdmin';
import { AuthContext } from '../provider/AuthProvider';

// Main
import MainScreen from '../screens/MainScreen';
import Home from '../screens/Home';
import SecondScreen from '../screens/SecondScreen';
// Auth screens
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgetPassword from '../screens/auth/ForgetPassword';

import Loading from '../screens/utils/Loading';

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};
if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();

const Auth = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerMode: 'none',
				headerShown: false,
			}}
		>
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="Register" component={Register} />
			<AuthStack.Screen
				name="ForgetPassword"
				component={ForgetPassword}
			/>
		</AuthStack.Navigator>
	);
};

// const MainStack = createStackNavigator();
// const Main = () => {
// 	return (
// 		<MainStack.Navigator
// 			screenOptions={{
// 				headerMode: 'none',
// 				headerShown: false,
// 			}}
// 		>
// 			<MainStack.Screen name="Home" component={Home} />
// 			<MainStack.Screen name="SecondScreen" component={SecondScreen} />
// 		</MainStack.Navigator>
// 	);
// };

export default () => {
	// const ref = React.useRef(null);
	const auth = useContext(AuthContext);
	const user = auth.user;
	// const user = false;
	return (
		<NavigationContainer>
			{user == null && <Loading />}
			{user == false && <Auth />}
			{user == true && <MainScreen />}
		</NavigationContainer>
	);
};
