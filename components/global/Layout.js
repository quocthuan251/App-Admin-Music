import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';
import TopNav from '../navigation/TopNav';
import Text from '../utils/UbuntuFont';
import { Provider } from '@ant-design/react-native';
import enUS from '@ant-design/react-native/es/locale-provider/en_US';

export default function (props) {
	return (
		<View style={styles.container}>
			{props.title && (
				<TopNav
					navigation={props.navigation}
					title={props.title}
					withBack={props.withBack ? true : false}
				/>
			)}
			<Provider locale={enUS}>{props.children}</Provider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.background,
	},
});
