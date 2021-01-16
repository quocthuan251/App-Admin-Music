import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();

const AuthProvider = (props) => {
	// user null = loading
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkLogin();
	}, [user]);

	// const getUser = async () => {
	// 	try {
	// 		const jsonValue = await AsyncStorage.getItem('`@tokenLogin`');
	// 		return jsonValue != null ? JSON.parse(jsonValue) : null;
	// 	} catch (e) {
	// 		// read error
	// 	}

	// 	console.log('Done.');
	// };
	function checkLogin() {
		console.log(AsyncStorage.getItem('@tokenLogin'));

		const checkTokenStorage = async () => {
			const value = await AsyncStorage.getItem('@tokenLogin');
			if (value != null) {
				console.log('checklogin khac null');
				setUser(true);
			} else {
				console.log('checklogin null');
				setTimeout(() => {
					setUser(false);
				}, 3000);
			}
			// setUser(false);
		};
		checkTokenStorage();
		// const tokenUser = getUser();
		// // console.log('login autho');
		// console.log(tokenUser);
		// if (tokenUser !== null) {
		// 	console.log('checklogin khac null');
		// 	setUser(true);
		// } else {
		// 	console.log('checklogin null');
		// 	setUser(false);
		// }

		// try {
		// 	const value = await AsyncStorage.getItem('@tokenLogin');
		// 	if (value != null) {
		// 		console.log('checklogin khac null');
		// 		setUser(true);
		// 	} else {
		// 		console.log('checklogin null');
		// 		setUser(false);
		// 	}
		// 	setUser(false);
		// } catch (error) {
		// 	console.log('loi khi check login');
		// }

		// firebase.auth().onAuthStateChanged(function (u) {
		// 	if (u) {
		// 		setUser(true);
		// 	} else {
		// 		setUser(false);
		// 	}
		// });
		// setUser(true);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
