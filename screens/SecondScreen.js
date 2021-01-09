import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
import { Button, SearchBar } from '@ant-design/react-native';
export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} title="Second Screen" withBack>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text bold>This is the second screen rpo</Text>
				<Text>The top navigation have back action</Text>
				<Button loading>loading button</Button>
				<SearchBar defaultValue="thuan" placeholder="tìm kiếm" />
				<Button type="primary">Start</Button>
			</View>
		</Layout>
	);
}
