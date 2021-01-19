import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, StyleSheet, Text } from 'react-native';
import { Button, InputItem, List, Toast } from '@ant-design/react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../../components/global/Layout';

export default function ({ navigation }) {
	const [listArtists, setlistArtists] = useState('');
	const [title, settitle] = useState('');
	const [path, setpath] = useState(
		'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/HEEfESjkoNlrc41qL8sM01fj3zoEJlHuGNyfjUnz.mp3'
	);
	const [image, setimage] = useState(
		'https://i.pinimg.com/564x/2d/55/9f/2d559fba99c6f5dfdb757a5143e5e0e7.jpg'
	);
	const [genre, setgenre] = useState('Nhạc trẻ');
	const createHandle = async () => {
		const body = {
			listArtists: [listArtists],

			title: title,
			path: path,
			image: image,
			genre: genre,
		};
		let token = await AsyncStorage.getItem('@tokenLogin');
		return axios({
			url: `https://mp3-music-ios.herokuapp.com/song`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'content-type': 'application/json',
				accept: 'application/json',
			},
			data: body,
		})
			.then((response) => {
				console.log('repo');
				console.log(response);

				Toast.success('Tạo bài hát thành công !!!', 1);
				navigation.navigate('SongManagement');
				// return response;
			})
			.catch((error) => {
				Toast.fail('tạo không thành công !!!');
			});
	};
	return (
		<Layout navigation={navigation} title="Tạo bài hát" withBack>
			<ScrollView
				style={{ flex: 1 }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={'Tạo bài hát mới'}>
					<InputItem
						defaultValue={title}
						clear
						placeholder="hãy nhập tên bài hát"
						autoFocus={typeof jest === 'undefined'}
						onChange={(value) => {
							settitle(value);
						}}
					>
						Tên bài hát
					</InputItem>
					<InputItem
						defaultValue={listArtists}
						clear
						placeholder="ca sĩ"
						autoFocus={typeof jest === 'undefined'}
						onChange={(value) => {
							setlistArtists(value);
						}}
					>
						Ca sĩ
					</InputItem>
					<InputItem
						defaultValue={genre}
						clear
						placeholder="thể loại"
						autoFocus={typeof jest === 'undefined'}
					>
						Thể loại
					</InputItem>
					<InputItem
						defaultValue={image}
						clear
						placeholder="link anh"
						autoFocus={typeof jest === 'undefined'}
					>
						Ảnh
					</InputItem>
					<InputItem
						defaultValue={path}
						clear
						placeholder="link nhạc"
						autoFocus={typeof jest === 'undefined'}
					>
						Link nhạc
					</InputItem>

					<List.Item style={{ marginTop: 130 }}>
						<Button
							onPress={() => {
								createHandle();
							}}
							type="primary"
						>
							tạo bài hát
						</Button>
					</List.Item>
				</List>
			</ScrollView>
		</Layout>
	);
}
