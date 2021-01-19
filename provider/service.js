import axios from 'axios';

export const callAPILogin = async (
	endpoint,
	body,
	method = 'GET',
	typeAuthor = 'Token'
) => {
	let apiReturn = await axios({
		url: `https://demo7080721.mockable.io/node-login`,
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
