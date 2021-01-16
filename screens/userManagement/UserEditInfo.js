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
	InputItem,
	WhiteSpace,
	WingBlank,
	Switch,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import { callAPIUserInfo } from './service';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation }) {
	const [valueName, setValueName] = useState('');
	const [valueSex, setValueSex] = useState(false);
	const [valueEmail, setValueEmail] = useState('');
	const [dataUserInfo, setDataUserInfo] = useState([]);
	const test = () => {
		console.log(dataUserInfo[1]);
	};
	useEffect(() => {
		const callData = async () => {
			let res = await callAPIUserInfo();
			setDataUserInfo(res.data.data);
			console.log(res.data.data);
		};
		callData();
	}, []);
	const deleteItemUser = (id) => {
		const newDataUserInfo = dataUserInfo.filter((item, index) => {
			return index !== id;
		});
		setDataUserInfo(newDataUserInfo);
		// console.log(id);
		console.log('hello');
		// console.log(item);
	};
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
								uri: dataUserInfo.avatar,
							}}
						/>
						<View style={styles.role}>
							{dataUserInfo.role == 1 ? (
								<Text>Admin</Text>
							) : (
								<Text>User</Text>
							)}
						</View>
						<Text style={styles.title}>
							{dataUserInfo.fullname}
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
								<InputItem
									clear
									value={dataUserInfo.fullname}
									onChange={(value) => {
										setValueName(value);
									}}
									placeholder="Hãy nhập tên"
								/>
							</View>
						</WingBlank>
						<WhiteSpace size="lg" />
						<WingBlank>
							<View>
								<Text>Email:</Text>
								<InputItem
									clear
									value={dataUserInfo.email}
									onChange={(value) => {}}
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
									value="Nam"
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
								test();
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
