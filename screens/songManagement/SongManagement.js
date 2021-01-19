// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, RefreshControl } from 'react-native';
import axios from 'axios';
import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
	Toast,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPI } from './service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation }) {
	const [isHungry, setIsHungry] = useState(true);
	const [dataSong, setDataSong] = useState([]);
	const [dataSong2, setDataSong2] = useState([]);
	const [inputSearch, setinputSearch] = useState('');

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		if (refresh()) {
			setRefreshing(false);
		}
		// refresh().then(() => ;
	}, []);
	const refresh = () => {
		// const { isRefe } = route.params;
		const callData = async () => {
			let res = await callAPI();
			setDataSong(res.data.data);
			setDataSong2(res.data.data);
			console.log('danh sách user ở useEffect user home');
			// console.log(res.data.data);
		};
		callData();
		return true;
	};
	const clickSearch = (value) => {
		setinputSearch(value);
		const newDataSearchSong = dataSong2.filter((item, index) => {
			return item.title.includes(value);
		});
		setDataSong(newDataSearchSong);
	};
	const clickClear = () => {
		clickSearch('');
	};
	const test = () => {
		console.log(dataSong[1]);
	};
	const createSong = () => {
		navigation.navigate('SongCreate');
	};
	useEffect(() => {
		Toast.loading('Loading...', 2, () => {});
		const callData = async () => {
			let res = await callAPI();
			setDataSong(res.data.data);
			setDataSong2(res.data.data);
			console.log(res.data.data);
		};
		callData();
	}, []);
	const deleteItemSong = async (id) => {
		// const newDataSong = dataSong.filter((item, index) => {
		// 	return index !== id;
		// });
		// setDataSong(newDataSong);
		// // console.log(id);
		// console.log('hello');
		// // console.log(item);
		console.log(id);
		let token = await AsyncStorage.getItem('@tokenLogin');
		return axios({
			url: `https://mp3-music-ios.herokuapp.com/song/${id}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'content-type': 'application/json',
				accept: 'application/json',
			},
			// data: body,
		})
			.then((response) => {
				console.log('repo');
				console.log(response);
				const newDataListUser = dataSong.filter((item, index) => {
					return item._id !== id;
				});
				setDataSong(newDataListUser);
				Toast.success('xóa thành công !!!', 1);
				// return response;
			})
			.catch((error) => {
				Toast.fail('Xóa không thành công !!!');
			});
	};
	return (
		<Layout navigation={navigation} title="Quản lý bài hát" withBack>
			<SearchBar
				placeholder="Search"
				showCancelButton
				value={inputSearch}
				onSubmit={(value) => clickSearch(value)}
				onChange={(value) => clickSearch(value)}
				onCancel={() => clickClear()}
			/>
			<Button
				type="primary"
				onPress={() => {
					createSong();
				}}
			>
				Tạo bài hát
			</Button>
			<ScrollView
				style={{ flex: 1, backgroundColor: '#f5f5f9' }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				<List renderHeader={'Danh sách bài hát'}>
					{dataSong.map((item, i) => (
						<Item
							key={i}
							onPress={() => {
								test();
							}}
							thumb={item.image}
							extra={
								<View>
									<Button
										type="warning"
										size="small"
										onPress={() => {
											{
												Modal.alert(
													'Xác nhận',
													'xóa bài hát khỏi danh sách',
													[
														{
															text: 'Cancel',
															onPress: () =>
																console.log(
																	'cancel'
																),
															style: 'cancel',
														},
														{
															text: 'OK',
															onPress: () =>
																deleteItemSong(
																	item._id
																),
														},
													]
												);
											}
										}}
									>
										xóa
									</Button>
								</View>
							}
							multipleLine
						>
							{item.title}
							<Brief>{item.listArtists}</Brief>
						</Item>
					))}
				</List>
			</ScrollView>
		</Layout>
	);
}
