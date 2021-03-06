import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	ScrollView,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	ActivityIndicator,
	TextInput,
	Image,
	StyleSheet,
	Text,
} from 'react-native';
import * as firebase from 'firebase';

import Layout from '../../components/global/Layout';
// import Text from '../../components/utils/UbuntuFont';
import Colors from '../../constants/colors';

export default function ({ navigation }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	async function forget() {
		// setLoading(true);
		// await firebase
		// 	.auth()
		// 	.sendPasswordResetEmail(email)
		// 	.then(function () {
		// 		setLoading(false);
		// 		navigation.navigate('Login');
		// 		alert('Your password reset has been sent to your email');
		// 	})
		// 	.catch(function (error) {
		// 		setLoading(false);
		// 		alert(error);
		// 	});
		console.log('hello');
	}
	return (
		<KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
			<StatusBar style="auto" translucent backgroundColor="#f7f7f7" />
			<Layout navigation={navigation}>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#f7f7f7',
						}}
					>
						<Image
							resizeMode="contain"
							style={{
								height: 220,
								width: 220,
							}}
							source={require('../../assets/forget.png')}
						/>
					</View>
					<View
						style={{
							flex: 3,
							paddingHorizontal: 20,
							paddingBottom: 20,
							backgroundColor: '#fff',
						}}
					>
						<Text
							bold
							style={{
								fontSize: 24,
								color: Colors.black,
								alignSelf: 'center',
								padding: 30,
							}}
						>
							Quên mật khẩu
						</Text>
						<Text style={{ color: Colors.black, fontSize: 16 }}>
							Email
						</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								style={styles.textInput}
								placeholder="Hãy nhập email"
								placeholderStyle={{
									fontFamily: 'Ubuntu_400Regular',
								}}
								value={email}
								autoCapitalize="none"
								autoCompleteType="off"
								autoCorrect={false}
								keyboardType="email-address"
								onChangeText={(text) => setEmail(text)}
							/>
						</View>

						<TouchableOpacity
							onPress={() => {
								forget();
							}}
							disabled={loading}
							style={{
								flexDirection: 'row',
								marginTop: 20,
							}}
						>
							<View style={styles.button}>
								{loading ? (
									<ActivityIndicator color="#fff" />
								) : (
									<Text
										bold
										style={{ fontSize: 16, color: 'white' }}
									>
										Gửi email
									</Text>
								)}
							</View>
						</TouchableOpacity>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 15,
								justifyContent: 'center',
							}}
						>
							<Text
								style={{
									color: Colors.black,
								}}
							>
								Quay lại trang đăng nhập?
							</Text>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Login');
								}}
							>
								<Text
									bold
									style={{
										marginLeft: 5,
										color: '#288050',
										fontWeight: 'bold',
									}}
								>
									Đăng nhập
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Layout>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	textInputContainer: {
		marginTop: 15,
		backgroundColor: '#FFF',
		borderColor: '#d8d8d8',
		borderWidth: 1,
		borderRadius: 8,
		flexDirection: 'row',
	},
	textInput: {
		padding: 10,
		paddingHorizontal: 20,
		textAlign: 'left',
		color: 'black',
		flex: 1,
		fontFamily: 'Ubuntu_400Regular',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 8,
	},
});
