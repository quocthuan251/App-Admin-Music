// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
	Flex,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPI } from './service';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation }) {
	const [isHungry, setIsHungry] = useState(true);
	const [dataListUser, setDataListUser] = useState([]);
	const test = () => {
		console.log(dataListUser[1]);
	};
	useEffect(() => {
		const callData = async () => {
			let res = await callAPI();
			setDataListUser(res.data.data);
			console.log(res.data.data);
		};
		callData();
	}, []);
	const deleteItemUser = (id) => {
		const newDataListUser = dataListUser.filter((item, index) => {
			return index !== id;
		});
		setDataListUser(newDataListUser);
		// console.log(id);
		console.log('hello');
		// console.log(item);
	};
	return (
		<Layout navigation={navigation} title="Quản lý user" withBack>
			<SearchBar
				placeholder="Search"
				showCancelButton
				onSubmit={(value) => test()}
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
				<List renderHeader={'Danh sách người dùng'}>
					{dataListUser.map((item, i) => (
						<Item
							key={i}
							onPress={() => {
								navigation.navigate('UserInfoManagement');
							}}
							// thumb="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/7/2/b/072ba9ae04687203d6f6af8e526ce631.jpg"
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
																deleteItemUser(
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
						>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
								}}
							>
								<Image
									style={styles.userImg}
									source={{
										uri: item.thumbnail,
									}}
								/>
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'center',
									}}
								>
									<View
										style={{
											flex: 3,
											flexDirection: 'column',
											justifyContent: 'center',
										}}
									>
										<Text style={styles.title}>
											{item.name}
										</Text>
									</View>

									<View
										style={{
											flex: 1,
											flexDirection: 'column',
											justifyContent: 'center',
										}}
									>
										<Text style={styles.role}>User</Text>
									</View>
								</View>
							</View>
						</Item>
					))}
				</List>
			</ScrollView>
		</Layout>
	);
}
const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	userImg: {
		// flex: 3,
		width: 70,
		height: 70,
		borderRadius: 50,
	},

	title: {
		marginLeft: 10,
		fontSize: 16,
		// marginTop: 3,
		fontWeight: 'bold',
	},
	role: { fontSize: 14 },
});
