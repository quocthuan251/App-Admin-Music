import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
// import {
//     useTheme,
//     Avatar,
//     Title,
//     Caption,
//     Paragraph,
//     Drawer,
//     Text,
//     TouchableRipple,
//     Switch
// } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import{ AuthContext } from '../components/context';

export function DrawerContent(props) {
	// const paperTheme = useTheme();

	// const { signOut, toggleTheme } = React.useContext(AuthContext);

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',

								justifyContent: 'center',
								marginTop: 15,
							}}
						>
							<Image
								style={styles.userImg}
								source={{
									uri:
										'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/e/7/3/ee73f7ca6482dacf33c752c4020c3938.jpg',
								}}
							/>
							<Text style={styles.title}>Quốc Thuận</Text>
						</View>
					</View>
					<View style={styles.drawerSection}>
						<DrawerItem
							icon={() => (
								<AntDesign
									name="home"
									size={24}
									color="black"
								/>
							)}
							label="Trang Chủ"
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={() => (
								<MaterialCommunityIcons
									name="library-music-outline"
									size={24}
									color="black"
								/>
							)}
							label="Quản lý bài hát"
							onPress={() => {
								props.navigation.navigate('SongManagement');
							}}
						/>
						<DrawerItem
							icon={() => (
								<MaterialIcons
									name="album"
									size={24}
									color="black"
								/>
							)}
							label="Quản lý Ablums"
							onPress={() => {
								props.navigation.navigate('SongManagement');
							}}
						/>
						<DrawerItem
							icon={() => (
								<FontAwesome
									name="user-o"
									size={24}
									color="black"
								/>
							)}
							label="Quản lý người dùng"
							onPress={() => {
								props.navigation.navigate('UserManagement');
							}}
						/>
						<DrawerItem
							icon={() => (
								<FontAwesome5
									name="user-tie"
									size={24}
									color="black"
								/>
							)}
							label="Quản lý Ca sĩ"
							onPress={() => {
								props.navigation.navigate('ArtistManagement');
							}}
						/>
					</View>
					<DrawerItem
						style={styles.bottomDrawerSection}
						icon={() => (
							<SimpleLineIcons
								name="logout"
								size={24}
								color="black"
							/>
						)}
						label="Sign Out"
						onPress={() => {}}
					/>
				</View>
			</DrawerContentScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
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
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
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
