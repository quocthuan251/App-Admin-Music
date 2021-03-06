// tslint:disable:no-empty
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
	Flex,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPIUserInfo } from './service';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation, route }) {
	const [isHungry, setIsHungry] = useState(true);
	const [dataUserInfo, setDataUserInfo] = useState([]);
	const test = () => {
		console.log(dataUserInfo[1]);
	};

	useEffect(() => {
		const { userID } = route.params;
		const callData = async () => {
			console.log(userID);
			let res = await callAPIUserInfo(userID);
			setDataUserInfo(res.data.data);
			console.log(res.data.data);
		};
		callData();
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
	return (
		<Layout navigation={navigation} title="Thông tin người dùng" withBack>
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
							uri: dataUserInfo.avatar,
						}}
					/>
					<Text style={styles.role}>
						{dataUserInfo.role == 1 ? (
							<Text>User</Text>
						) : (
							<Text>Admin</Text>
						)}
					</Text>
					<Text style={styles.title}>{dataUserInfo.fullname}</Text>
				</View>
				<View
					style={{
						flex: 4,
						flexDirection: 'column',
						// justifyContent: 'center',
						// alignItems: 'center',
					}}
				>
					<View
						style={{
							flex: 0.5,
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<View
							style={{
								borderColor: 'black',
								borderWidth: 1,
								width: 200,
								margin: 10,
							}}
						/>
					</View>

					<View
						style={{
							flexDirection: 'column',
							// alignItems: 'center',
							flex: 3.5,
						}}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<View
								style={{
									flex: 1,
								}}
							/>
							<Text
								style={{
									flex: 1,
									fontWeight: 'bold',
								}}
							>
								Email:
							</Text>
							<Text style={{ flex: 3.5, margin: 10 }}>
								{dataUserInfo.email}
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<View
								style={{
									flex: 1,
								}}
							/>
							<Text
								style={{
									flex: 1,
									fontWeight: 'bold',
								}}
							>
								Giới tính:
							</Text>
							<Text style={{ flex: 3.5, margin: 10 }}>
								{dataUserInfo.gender ? (
									<Text>Nam</Text>
								) : (
									<Text>Nữ</Text>
								)}
							</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						flex: 1.5,
						flexDirection: 'column',
						// justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button
						onPress={() => {
							navigation.navigate('UserEditInfoManagement', {
								dataUserInfo: dataUserInfo,
							});
						}}
					>
						sửa thông tin
					</Button>
				</View>
			</View>
			{/* </ScrollView> */}
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
