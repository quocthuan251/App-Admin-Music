import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const callAPI = async (
	endpoint,
	body,
	method = 'GET',
	typeAuthor = 'Token'
) => {
	let token = await AsyncStorage.getItem('@tokenLogin');
	let apiReturn = await axios({
		url: `https://mp3-music-ios.herokuapp.com/album`,
		method: method,
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
			accept: 'application/json',
		},
		data: body,
	})
		.then((response) => {
			// console.log(response);
			return response;
		})
		.catch((error) => ({ error }));
	return apiReturn;
};
