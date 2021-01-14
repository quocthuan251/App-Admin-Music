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
	const [dataSong, setDataSong] = useState({});
	const test = () => {
		console.log(isHungry);
	};
	const ListSongComp = [];
	useEffect(() => {
		const callData = async () => {
			let res = await callAPI();
			setDataSong(res.data.data);
			console.log(res.data.data);
		};
		callData();
		const addList = async () => {
			console.log(dataSong.length);
			for (let i = 0; i < dataSong.length; i++) {
				ListSongComp.push(
					<Item
						onPress={() => {
							test();
						}}
						thumb="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/7/2/b/072ba9ae04687203d6f6af8e526ce631.jpg"
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
															console.log('ok'),
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
						Không cần thêm một ai nữa<Brief>Mr.Siro</Brief>
					</Item>
				);
			}
		};
		addList();
	}, []);

	return (
		<Layout navigation={navigation} title="Quản lý bài hát" withBack>
			<SearchBar placeholder="Search" showCancelButton />
			{/* {ListSongComp} */}
			<ScrollView
				style={{ flex: 1, backgroundColor: '#f5f5f9' }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={'Danh sách bài hát'}>
					{/* <Item
						onPress={() => {
							test();
						}}
						thumb="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/7/2/b/072ba9ae04687203d6f6af8e526ce631.jpg"
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
															console.log('ok'),
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
						Không cần thêm một ai nữa<Brief>Mr.Siro</Brief>
					</Item>
			 */}
					{ListSongComp}
				</List>
			</ScrollView>
		</Layout>
	);
}
