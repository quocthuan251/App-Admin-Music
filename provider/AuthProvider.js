import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();

const AuthProvider = (props) => {
	// user null = loading
	////#################################

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					console.log('RESTORE_TOKEN');
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					console.log('SIGN_IN');
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					AsyncStorage.removeItem('@tokenLogin');
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
				userToken = await AsyncStorage.getItem('@tokenLogin');
			} catch (e) {
				// Restoring token failed
				// console.log('log loi ở useeffect kiểm tra token AuthProvider');
			}
			// console.log('log loi ở useeffect kiểm tra token AuthProvider');
			console.log(userToken);
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
				console.log('log in authen');
				console.log(data);

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
	///###################3################
	// const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	checkLogin();
	// }, [user]);
	// function checkLogin() {
	// 	console.log(AsyncStorage.getItem('@tokenLogin'));

	// 	const checkTokenStorage = async () => {
	// 		const value = await AsyncStorage.getItem('@tokenLogin');
	// 		if (value != null) {
	// 			console.log('checklogin khac null');
	// 			setUser(true);
	// 		} else {
	// 			console.log('checklogin null');
	// 			setTimeout(() => {
	// 				setUser(false);
	// 			}, 3000);
	// 		}
	// 	};
	// 	checkTokenStorage();
	// }

	return (
		// <AuthContext.Provider
		// 	value={{
		// 		user,
		// 	}}
		// >
		// 	{props.children}
		// </AuthContext.Provider>
		<AuthContext.Provider
			value={{
				authContext,
				isLoading: state.isLoading,
				userToken: state.userToken,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
