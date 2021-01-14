// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import axios from 'axios';
import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPI } from './service';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation }) {
	const [isHungry, setIsHungry] = useState(true);
	const [dataSong, setDataSong] = useState([]);
	const test = () => {
		console.log(dataSong[1]);
	};
	useEffect(() => {
		const callData = async () => {
			let res = await callAPI();
			setDataSong(res.data.data);
			console.log(res.data.data);
		};
		callData();
	}, []);
	const deleteItemSong = (id) => {
		const newDataSong = dataSong.filter((item, index) => {
			return index !== id;
		});
		setDataSong(newDataSong);
		// console.log(id);
		console.log('hello');
		// console.log(item);
	};
	return (
		<Layout navigation={navigation} title="Quản lý bài hát" withBack>
			<SearchBar
				placeholder="Search"
				showCancelButton
				onSubmit={(value) =>
					test()
				}
			/>
			<Button
				onPress={() => {
					test();
				}}
			>
				hele test
			</Button>
			<ScrollView
				style={{ flex: 1, backgroundColor: '#f5f5f9' }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
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
																	i
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
