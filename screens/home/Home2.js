import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Layout from '../../components/global/Layout';
export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} title="Home">
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button
					onPress={() => navigation.navigate('Notifications')}
					title="Chuyển notifications"
				/>
				<Button
					onPress={() => navigation.openDrawer()}
					title="Mở drawer"
				/>
			</View>
		</Layout>
	);
}
