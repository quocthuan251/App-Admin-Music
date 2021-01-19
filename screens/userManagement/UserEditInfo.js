// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import {
	Image,
	ScrollView,
	View,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
	Flex,
	InputItem,
	WhiteSpace,
	WingBlank,
	Switch,
	Toast,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPIUserInfo } from './service';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation, route }) {
	const [valueName, setValueName] = useState('');
	const [valueSex, setValueSex] = useState(false);
	const [valueEmail, setValueEmail] = useState('');
	const [dataUserInfoEdit, setDataUserInfoEdit] = useState([]);
	// const clickUpdateInfo = () => {
	// 	console.log(dataUserInfoEdit);
	// };
	///////////////////////

	const clickUpdateInfo = async () => {
		const body = {
			fullname: valueName,
			gender: valueSex,
			role: 2,
		};
		let token = await AsyncStorage.getItem('@tokenLogin');
		return axios({
			url: `https://mp3-music-ios.herokuapp.com/user/${dataUserInfoEdit._id}`,
			method: 'PATCH',
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

				Toast.success('cập nhật thành công !!!', 1);
				navigation.navigate('UserManagement', {
					isRefe: true,
				});
				// return response;
			})
			.catch((error) => {
				Toast.fail('cập nhật không thành công !!!');
			});
	};
	///////////////////

	useEffect(() => {
		const { dataUserInfo } = route.params;
		console.log(dataUserInfo);
		// const callData = async () => {
		// 	console.log(userID);
		// 	let res = await callAPIUserInfo(userID);
		// 	setDataUserInfo(res.data.data);
		// 	console.log(res.data.data);
		// };
		// callData();
		setDataUserInfoEdit(dataUserInfo);
	}, []);
	// const deleteItemUser = (id) => {
	// 	const newDataUserInfo = dataUserInfo.filter((item, index) => {
	// 		return index !== id;
	// 	});
	// 	setDataUserInfo(newDataUserInfo);
	// 	// console.log(id);
	// 	console.log('hello');
	// 	// console.log(item);
	// };
	const changeSex = () => {
		setValueSex(!valueSex);
	};
	return (
		<Layout navigation={navigation} title="Cập nhật thông tin" withBack>
			<ScrollView
				style={{
					// flex: 1,
					backgroundColor: '#f5f5f9',
				}}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						// justifyContent: 'center',
						alignItems: 'stretch',
					}}
				>
					<View
						style={{
							flex: 5,

							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							style={styles.userInfoImg}
							source={{
								uri: dataUserInfoEdit.avatar,
							}}
						/>
						<View style={styles.role}>
							{dataUserInfoEdit.role == 1 ? (
								<Text>User</Text>
							) : (
								<Text>Admin</Text>
							)}
						</View>
						<Text style={styles.title}>
							{dataUserInfoEdit.fullname}
						</Text>
					</View>
					<View
						style={{
							flex: 4.5,
							flexDirection: 'column',
							// justifyContent: 'center',
							// alignItems: 'center',
						}}
					>
						<WingBlank>
							<View>
								<Text>Tên:</Text>
								{/* <TextInput
								
								placeholder="Hãy nhập tên"
								placeholderStyle={{
									fontFamily: 'Ubuntu_400Regular',
								}}
								value={dataUserInfoEdit.fullname}
								autoCapitalize="none"
								autoCompleteType="email"
								autoCorrect={false}
								keyboardType="email-address"
								onChangeText={(text) => setValueName(text)}
							/> */}
								<InputItem
									clear
									defaultValue={dataUserInfoEdit.fullname}
									onChange={(value) => {
										setValueName(value);
									}}
									placeholder="Hãy nhập tên"
									autoFocus={
										/* TODO: https://github.com/facebook/jest/issues/3707  */ typeof jest ===
										'undefined'
									}
								/>
							</View>
						</WingBlank>
						<WhiteSpace size="lg" />
						<WingBlank>
							<View>
								<Text>Email:</Text>
								<InputItem
									clear
									defaultValue={dataUserInfoEdit.email}
									onChange={(value) => {
										setValueEmail(value);
									}}
									placeholder="Hãy nhập email"
								/>
							</View>
						</WingBlank>
						<WhiteSpace size="lg" />
						<WingBlank>
							<View>
								<Text>Giới tính:</Text>
								<InputItem
									clear
									defaultValue={
										dataUserInfoEdit.gender ? 'Nam' : 'Nữ'
									}
									onChange={(value) => {}}
									placeholder="Hãy nhập email"
								/>
							</View>
						</WingBlank>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							// justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button
							onPress={() => {
								clickUpdateInfo();
							}}
						>
							Cập nhật
						</Button>
					</View>
				</View>
			</ScrollView>
		</Layout>
	);
}
const styles = StyleSheet.create({
	userInfoImg: {
		width: 170,
		height: 170,
		borderRadius: 85,
		marginTop: 30,
	},

	title: {
		marginTop: 5,
		fontSize: 25,
		fontWeight: 'bold',
	},
	role: { marginTop: 10, fontSize: 14 },
});
