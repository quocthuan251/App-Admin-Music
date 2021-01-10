// tslint:disable:no-empty
import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
	List,
	SearchBar,
	Modal,
	Button,
	Provider,
} from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
import enUS from '@ant-design/react-native/es/locale-provider/en_US';

const Item = List.Item;
const Brief = Item.Brief;

export default function ({ navigation }) {
	const [isHungry, setIsHungry] = useState(true);
	const [visible, setVisible] = useState(false);
	const test = () => {
		console.log(isHungry);
	};

	return (
		<Layout navigation={navigation} title="Quản lý bài hát" withBack>
			<SearchBar placeholder="Search" showCancelButton />
			<ScrollView
				style={{ flex: 1, backgroundColor: '#f5f5f9' }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={'Danh sách bài hát'}>
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
				</List>
			</ScrollView>
		</Layout>
	);
}
