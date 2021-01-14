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
	const [dataListArtist, setListArtist] = useState([]);
	const test = () => {
		console.log(dataListArtist[1]);
	};
	useEffect(() => {
		const callData = async () => {
			let res = await callAPI();
			setListArtist(res.data.data);
			console.log(res.data.data);
		};
		callData();
	}, []);
	const deleteItemSong = (id) => {
		const newDataSong = dataListArtist.filter((item, index) => {
			return index !== id;
		});
		setListArtist(newDataSong);
		// console.log(id);
		console.log('hello');
		// console.log(item);
	};
	return (
		<Layout navigation={navigation} title="Quản lý albums" withBack>
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
				{/* <List renderHeader={'Danh sách ca sĩ'}> */}
				{/* <View style={styles.content}> */}
				<Flex wrap="wrap" justify="center">
					{dataListArtist.map((item, i) => (
						<View key={i}>
							<Button
								onPress={() =>
									navigation.navigate('Notifications')
								}
								style={{
									width: 115,
									height: 115,
									margin: 10,
								}}
							>
								<View
									style={{
										flex: 1,
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Image
										style={{ width: 60, height: 60 }}
										source={{
											uri: item.thumbnail,
										}}
									/>
									<View>
										<Text
											numberOfLines={1}
											ellipsizeMode="tail"
											style={styles.title}
										>
											{item.name}
										</Text>
									</View>
									{/* <Text style={{}}>279</Text> */}
								</View>
							</Button>
						</View>
					))}
				</Flex>
				{/* </View> */}
				{/* </List> */}
			</ScrollView>
		</Layout>
	);
}
const styles = StyleSheet.create({
	content: {
		flex: 1,
		// flexDirection: 'column',
		// justifyContent: 'center',
		flexWrap: 'wrap',
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	userImg: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},

	title: {
		fontSize: 13,
		marginTop: 3,
		fontWeight: 'bold',
		maxWidth: 90,
		// maxHeight: 60,
		// flexDirection: 'row',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
		// backgroundColor: 'red',
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
