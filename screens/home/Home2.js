import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Layout from '../../components/global/Layout';
import { Button, Flex } from '@ant-design/react-native';

export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} title="Home">
			<View style={styles.homeContent}>
				<View style={styles.headerImg}>
					<Image
						style={styles.img}
						source={{
							uri:
								'https://i.pinimg.com/564x/95/0b/67/950b67f84f06e3c8b246cd91ac907653.jpg',
						}}
					/>
				</View>
				<View style={styles.bodyContent}>
					<View
						style={{
							flex: 1,
							marginTop: 10,
							// backgroundColor: 'white',
						}}
					>
						<View style={{ flex: 8 }}>
							<Flex justify="around" style={{ margin: 10 }}>
								<Button
									onPress={() =>
										navigation.navigate('UserManagement')
									}
									style={{
										width: 100,
										height: 100,
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
											style={{ width: 50, height: 50 }}
											source={require('../../assets/user.png')}
										/>
										<Text style={styles.title}>User</Text>
										<Text style={styles.number}>279</Text>
									</View>
								</Button>
								<Button
									onPress={() =>
										navigation.navigate('Notifications')
									}
									style={{
										width: 100,
										height: 100,
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
											style={{ width: 50, height: 50 }}
											source={require('../../assets/musiclisten.png')}
										/>
										<Text style={styles.title}>
											Nghe/Ngày
										</Text>
										<Text style={styles.number}>18562</Text>
									</View>
								</Button>
							</Flex>

							<Flex justify="between" style={{ margin: 20 }}>
								<Button
									onPress={() =>
										navigation.navigate('AlbumManagement')
									}
									style={{
										width: 100,
										height: 100,
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
											style={{ width: 50, height: 50 }}
											source={require('../../assets/albums.png')}
										/>
										<Text style={styles.title}>Albums</Text>
										<Text style={styles.number}>50</Text>
									</View>
								</Button>
								<Button
									onPress={() =>
										navigation.navigate('SongManagement')
									}
									style={{
										width: 100,
										height: 100,
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
											style={{ width: 50, height: 50 }}
											source={require('../../assets/music.png')}
										/>
										<Text style={styles.title}>
											Bài hát
										</Text>
										<Text style={styles.number}>123</Text>
									</View>
								</Button>
								<Button
									onPress={() =>
										navigation.navigate('ArtistManagement')
									}
									style={{
										width: 100,
										height: 100,
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
											style={{ width: 50, height: 50 }}
											source={require('../../assets/karaoke.png')}
										/>
										<Text style={styles.title}>Ca sĩ</Text>
										<Text style={styles.number}>79</Text>
									</View>
								</Button>
							</Flex>
						</View>
						<View
							style={{
								flex: 2,

								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={styles.appName}>
								ỨNG DỤNG QUẢN LÝ NHẠC
							</Text>
							<Text style={styles.authorName}>
								TRẦN QUỐC THUẬN
							</Text>
						</View>
					</View>
				</View>
			</View>
		</Layout>
	);
}
const styles = StyleSheet.create({
	homeContent: {
		flex: 1,
		backgroundColor: '#08192B',
	},
	headerImg: {
		flex: 3,
		// backgroundColor: 'yellow',
	},
	img: {
		flex: 1,
	},
	bodyContent: {
		flex: 7,
		// backgroundColor: 'green',
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	userImg: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},

	title: {
		fontSize: 14,
		marginTop: 3,
		fontWeight: 'bold',
	},
	appName: {
		color: 'white',
		fontSize: 14,
		marginTop: 3,
		fontWeight: 'bold',
	},
	authorName: {
		color: 'white',
		fontSize: 13,
		marginTop: 3,
		fontWeight: 'bold',
	},
	number: {
		fontSize: 12,
		marginTop: 3,
		fontWeight: 'bold',
	},
});
