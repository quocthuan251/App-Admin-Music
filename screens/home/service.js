import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const token = AsyncStorage.getItem('@tokenLogin');
// const getTokenStorage = async () => {
// 	const value = await AsyncStorage.getItem('@tokenLogin');
// 	return value;
// };
export const callAPIHome = async (
	endpoint,
	body,
	method = 'GET',
	typeAuthor = 'Token'
) => {
	let token = await AsyncStorage.getItem('@tokenLogin');
	let apiReturn = await axios({
		url: `https://mp3-music-ios.herokuapp.com/view`,
		method: method,
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
			accept: 'application/json',
		},
		data: body,
	})
		.then((response) => {
			//  console.log(response);
			return response;
		})
		.catch((error) => ({ error }));
	return apiReturn;
};
// export const callAPIDelete = async (
// 	endpoint
// 	// body,
// 	// method = 'GET',
// 	// typeAuthor = 'Token'
// ) => {
// 	let token = await AsyncStorage.getItem('@tokenLogin');
// 	let apiReturn = await axios({
// 		url: `https://mp3-music-ios.herokuapp.com/user/${endpoint}`,
// 		method: 'DELETE',
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 			'content-type': 'application/json',
// 			accept: 'application/json',
// 		},
// 		data: body,
// 	})
// 		.then((response) => {
// 			// console.log(response);
// 			return response;
// 		})
// 		.catch((error) => ({ error }));
// 	return apiReturn;
// };

// export const callAPIUserInfo = async (
// 	endpoint
// 	// body,
// 	// method = 'GET',
// 	// typeAuthor = 'Token'
// ) => {
// 	let token = await AsyncStorage.getItem('@tokenLogin');

// 	let apiReturn = await axios({
// 		url: `https://mp3-music-ios.herokuapp.com/user/profile?userID=${endpoint}`,
// 		method: 'GET',
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 			'content-type': 'application/json',
// 			accept: 'application/json',
// 		},
// 	})
// 		.then((response) => {
// 			return response;
// 		})
// 		.catch((error) => ({ error }));
// 	return apiReturn;
// };
