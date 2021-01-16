import React, { useContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeAdmin from '../screens/HomeAdmin';
// import { AuthContext } from '../provider/AuthProvider';
const AuthContext = React.createContext();

// Main
import MainScreen from '../screens/MainScreen';
import Home from '../screens/Home';
import SecondScreen from '../screens/SecondScreen';
// Auth screens
import Login from '../screens/auth/Login';
import Login2 from '../screens/auth/Login2';
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
	///**************** */
	// const auth = useContext(AuthContext);
	// const user = auth.user;
	/***************** */
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);
	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;

			try {
				userToken = await AsyncStorage.getItem('userToken');
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		};

		bootstrapAsync();
	}, []);
	const authContext = React.useMemo(
		() => ({
			signIn: async (data) => {
				// In a production app, we need to send some data (usually username, password) to server and get a token
				// We will also need to handle errors if sign in failed
				// After getting token, we need to persist the token using `AsyncStorage`
				// In the example, we'll use a dummy token

				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
			},
			signOut: () => dispatch({ type: 'SIGN_OUT' }),
			signUp: async (data) => {
				// In a production app, we need to send user data to server and get a token
				// We will also need to handle errors if sign up failed
				// After getting token, we need to persist the token using `AsyncStorage`
				// In the example, we'll use a dummy token

				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
			},
		}),
		[]
	);

	//end text###########################################
	return (
		// <NavigationContainer>
		// 	{user == null && <Loading />}
		// 	{user == false && <Auth />}
		// 	{user == true && <MainScreen />}
		// </NavigationContainer>
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{state.userToken == null ? (
					<AuthStack.Navigator
						screenOptions={{
							headerMode: 'none',
							headerShown: false,
						}}
					>
						<AuthStack.Screen name="SignIn" component={Login2} />
					</AuthStack.Navigator>
				) : (
					<Stack.Screen name="Home" component={HomeScreen} />
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
};
