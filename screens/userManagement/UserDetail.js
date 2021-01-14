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
import { callAPIUserInfo } from './service';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation }) {
	const [isHungry, setIsHungry] = useState(true);
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
	return (
		<Layout navigation={navigation} title="Quản lý user" withBack>
			{/* <SearchBar
				placeholder="Search"
				showCancelButton
				onSubmit={(value) => test()}
			/> */}
			{/* <Button
				onPress={() => {
					test();
				}}
			>
				hele test
			</Button> */}
			{/* <ScrollView
				style={{
					// flex: 1,
					backgroundColor: '#f5f5f9',
				}}
				// automaticallyAdjustContentInsets={false}
				// showsHorizontalScrollIndicator={false}
				// showsVerticalScrollIndicator={false}
			> */}
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
						flex: 4,

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
				</View>
				<View
					style={{
						flex: 6,
						flexDirection: 'column',
						// justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={styles.title}>{dataUserInfo.fullname}</Text>
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
		// marginTop: 30,
	},

	title: {
		marginLeft: 10,
		fontSize: 26,
		fontWeight: 'bold',
	},
	role: { fontSize: 14 },
});
