// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import {
	Image,
	ScrollView,
	View,
	StyleSheet,
	Text,
	RefreshControl,
} from 'react-native';
import axios from 'axios';
import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
	Flex,
	Toast,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPI, callAPIDelete } from './service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = List.Item;
const Brief = Item.Brief;
const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};
export default function ({ navigation, route }) {
	const [isHungry, setIsHungry] = useState(true);
	const [dataListUser, setDataListUser] = useState([]);
	const [dataListUser2, setDataListUser2] = useState([]);
	const [inputSearch, setinputSearch] = useState('');

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		if (refresh()) {
			setRefreshing(false);
		}
		// refresh().then(() => ;
	}, []);

	const clickSearch = (value) => {
		setinputSearch(value);
		const newDataSearchUser = dataListUser2.filter((item, index) => {
			return item.fullname.includes(value);
		});
		setDataListUser(newDataSearchUser);
	};
	const clickClear = () => {
		clickSearch('');
	};
	const refresh = () => {
		// const { isRefe } = route.params;
		const callData = async () => {
			let res = await callAPI();
			setDataListUser(res.data.data);
			setDataListUser2(res.data.data);
			console.log('danh sách user ở useEffect user home');
			// console.log(res.data.data);
		};
		callData();
		return true;
	};
	useEffect(() => {
		Toast.loading('Loading...', 2, () => {});
		if (typeof route.params !== 'undefined') {
			const { isRefe } = route.params;
			if (typeof isRefe !== 'undefined') {
				refresh();
			}
		}
		const callData = async () => {
			let res = await callAPI();
			setDataListUser(res.data.data);
			setDataListUser2(res.data.data);
			console.log('danh sách user ở useEffect user home');
			// console.log(res.data.data);
		};
		callData();
	}, []);
	const deleteItemUser = async (id) => {
		console.log(id);
		let token = await AsyncStorage.getItem('@tokenLogin');
		return axios({
			url: `https://mp3-music-ios.herokuapp.com/user/${id}`,
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
				const newDataListUser = dataListUser.filter((item, index) => {
					return item._id !== id;
				});
				setDataListUser(newDataListUser);
				Toast.success('xóa thành công !!!', 1);
				// return response;
			})
			.catch((error) => {
				Toast.fail('Xóa không thành công !!!');
			});
	};
	return (
		<Layout navigation={navigation} title="Quản lý user" withBack>
			<SearchBar
				placeholder="Search"
				showCancelButton
				value={inputSearch}
				onSubmit={(value) => clickSearch(value)}
				onChange={(value) => clickSearch(value)}
				onCancel={() => clickClear()}
			/>
			{/* <Button
				onPress={() => {
					test();
				}}
			>
				hele test
			</Button> */}
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
				<List renderHeader={'Danh sách người dùng'}>
					{dataListUser.map((item, i) => (
						<Item
							key={i}
							onPress={() => {
								navigation.navigate('UserInfoManagement', {
									userID: item._id,
								});
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
										uri: item.avatar,
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
											{item.fullname}
										</Text>
									</View>

									<View
										style={{
											flex: 1,
											flexDirection: 'column',
											justifyContent: 'center',
										}}
									>
										<Text style={styles.role}>
											{item.role === 1 ? (
												<Text>User</Text>
											) : (
												<Text>Admin</Text>
											)}
										</Text>
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
