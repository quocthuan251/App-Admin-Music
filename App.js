import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import 'moment/locale/id';
import {
	Ubuntu_300Light,
	Ubuntu_300Light_Italic,
	Ubuntu_400Regular,
	Ubuntu_400Regular_Italic,
	Ubuntu_500Medium,
	Ubuntu_500Medium_Italic,
	Ubuntu_700Bold,
	Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './provider/AuthProvider';
import Auth2 from './provider/Auth2';

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	} else {
		return (
			// <SafeAreaView style={styles.container}>
			// <StatusBar style="auto" translucent />
			<AuthProvider>
				<AppNavigator />
			</AuthProvider>
			// <Auth2></Auth2>
			// </SafeAreaView>
		);
	}
}

async function loadResourcesAsync() {
	// load all resources such as images, fonts, etc.
	await Promise.all([
		Asset.loadAsync([
			require('./assets/icon.png'),
			require('./assets/splash.png'),
			require('./assets/login.png'),
			require('./assets/register.png'),
			require('./assets/forget.png'),
		]),
		Font.loadAsync({
			Ubuntu_300Light,
			Ubuntu_300Light_Italic,
			Ubuntu_400Regular,
			Ubuntu_400Regular_Italic,
			Ubuntu_500Medium,
			Ubuntu_500Medium_Italic,
			Ubuntu_700Bold,
			Ubuntu_700Bold_Italic,
		}),
	]);
	await Font.loadAsync(
		'antfill',
		// eslint-disable-next-line
		require('@ant-design/icons-react-native/fonts/antfill.ttf')
	);
	await Font.loadAsync(
		'antoutline',
		// eslint-disable-next-line
		require('@ant-design/icons-react-native/fonts/antoutline.ttf')
	);
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
