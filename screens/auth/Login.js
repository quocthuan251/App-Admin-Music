import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	ScrollView,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	ActivityIndicator,
	TextInput,
	Image,
	StyleSheet,
	Alert,
} from 'react-native';
import { Button, InputItem, List, Toast } from '@ant-design/react-native';
import Layout from '../../components/global/Layout';
// import Text from '../../components/utils/UbuntuFont';
import { Text } from 'react-native';
import Colors from '../../constants/colors';
import { callAPILogin } from './service';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';

export default function ({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(null);
	const [invalidPass, setinvalidPass] = useState(null);
	const [invalidEmail, setinvalidEmail] = useState(null);
	const [invalidLogin, setinvalidLogin] = useState(null);
	const [invalidEmailTitle, setinvalidEmailTitle] = useState(null);

	const auth = useContext(AuthContext);
	const { signIn } = auth.authContext;

	// const { signIn } = React.useContext(AuthContext);
	// const navigationRef = React.useRef(null);

	// useEffect(() => {
	// 	checkLogin();
	// }, [reload]);

	// function checkLogin() {
	// 	// console.log(AsyncStorage.getItem('@tokenLogin'));
	// 	const checkTokenStorage = async () => {
	// 		const value = await AsyncStorage.getItem('@tokenLogin');
	// 		// console.log(res.data.data);
	// 		if (value != null) {
	// 			console.log('dang nhap thanh cong');
	// 			setReload(true);
	// 		} else {
	// 			console.log('khoong thanhf coong');
	// 			// setTimeout(() => {
	// 			// 	setReload(false);
	// 			// }, 3000);
	// 		}
	// 		// setUser(true);
	// 	};
	// 	checkTokenStorage();
	// }

	// async function login() {
	// 	setLoading(true);
	// 	const callData = async () => {
	// 		const res = await callAPILogin();
	// 		// console.log(res.data.data);
	// 		try {
	// 			AsyncStorage.setItem('@tokenLogin', res.data.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	callData();
	// 	// setLoading(false);
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 4000);
	// }

	const loginHandle = async (email, password) => {
		setLoading(true);
		// setTimeout(() => {
		// 	setLoading(false);
		// }, 2000);
		// const foundUser = Users.filter((item) => {
		// 	return userName == item.username && password == item.password;
		// });
		console.log(email);
		console.log(password);
		if (password === '') {
			console.log('pass');
			setinvalidPass(false);
			setLoading(false);
		} else {
			setinvalidPass(null);
		}
		if (email === '') {
			console.log('email');
			setinvalidEmail(false);
			setLoading(false);
		} else {
			setinvalidEmail(null);
		}
		if (password !== '' && email !== '') {
			console.log('ok');
			const body = {
				email: email,
				password: password,
			};
			return await axios({
				url: `https://mp3-music-ios.herokuapp.com/auth/login`,
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
				},
				data: body,
			})
				.then((response) => {
					setinvalidLogin(true);
					setLoading(false);
					console.log('dăng nhạp thnahf cpng');
					console.log(response.data.data.token);
					AsyncStorage.setItem(
						'@tokenLogin',
						response.data.data.token
					);
					 signIn({ email, password });
				})
				.catch((error) => {
					console.log('dăng nhạp api thát bại');
					console.log(error);
					setinvalidLogin(false);
					setLoading(false);
					return Toast.fail('Email hoặc mật khẩu chưa đúng !!!');
				});

			// signIn({ email, password });
		}
	};
	return (
		<KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
			<StatusBar style="auto" translucent backgroundColor="#f7f7f7" />
			<Layout navigation={navigation} withBack>
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
							source={require('../../assets/login.png')}
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
								padding: 23,
							}}
						>
							Đăng nhập
						</Text>

						<Text style={{ color: Colors.black, fontSize: 16 }}>
							Email
						</Text>
						<View
							style={[
								styles.textInputContainer,
								invalidEmail === false
									? styles.textInputContainerFalse
									: styles.textInputContainer,
							]}
						>
							<TextInput
								style={styles.textInput}
								placeholder="Hãy nhập email"
								placeholderStyle={{
									fontFamily: 'Ubuntu_400Regular',
								}}
								value={email}
								autoCapitalize="none"
								autoCompleteType="email"
								autoCorrect={false}
								keyboardType="email-address"
								onChangeText={(text) => setEmail(text)}
							/>
						</View>
						<Text
							style={{
								marginTop: 15,
								color: Colors.black,
								fontSize: 16,
							}}
						>
							Mật khẩu
						</Text>
						<View
							style={[
								styles.textInputContainer,
								invalidPass === false
									? styles.textInputContainerFalse
									: styles.textInputContainer,
							]}
						>
							<TextInput
								style={styles.textInput}
								placeholder="Hãy nhập mật khẩu"
								placeholderStyle={{
									fontFamily: 'Ubuntu_400Regular',
								}}
								value={password}
								autoCapitalize="none"
								autoCompleteType="off"
								autoCorrect={false}
								secureTextEntry={true}
								onChangeText={(text) => setPassword(text)}
							/>
						</View>
						<TouchableOpacity
							// onPress={() => {
							// 	login();
							// }}
							// onPress={() => signIn({ email, password })}
							onPress={() => {
								loginHandle(email, password);
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
										Đăng nhập
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
								Bạn chưa có tài khoản?
							</Text>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Register');
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
									Đăng ký!
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 15,
								justifyContent: 'center',
							}}
						>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('ForgetPassword');
								}}
							>
								<Text
									bold
									style={{
										color: '#288050',
										fontWeight: 'bold',
									}}
								>
									Quên mật khẩu
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
	textInputContainerFalse: {
		marginTop: 15,
		backgroundColor: '#FFF',
		borderColor: 'red',
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
