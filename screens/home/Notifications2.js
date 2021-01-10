import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Layout from '../../components/global/Layout';

export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} title="Second Screen" withBack>
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Button
				onPress={() => navigation.goBack()}
				title="Go back home test moi"
			/>
		</View>
		</Layout>
	);
}
