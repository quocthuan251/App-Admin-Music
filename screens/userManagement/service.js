import axios from 'axios';

export const callAPI = async (
	endpoint,
	body,
	method = 'GET',
	typeAuthor = 'Token'
) => {
	let apiReturn = await axios({
		url: `https://demo7080721.mockable.io/node-list-artist`,
		method: method,
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
		},
		data: body,
	})
		.then((response) => {
			return response;
		})
		.catch((error) => ({ error }));
	return apiReturn;
};
export const callAPIUserInfo = async (
	endpoint,
	body,
	method = 'GET',
	typeAuthor = 'Token'
) => {
	let apiReturn = await axios({
		url: `https://demo7080721.mockable.io/get-user-info/1111`,
		method: method,
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
		},
		data: body,
	})
		.then((response) => {
			return response;
		})
		.catch((error) => ({ error }));
	return apiReturn;
};
