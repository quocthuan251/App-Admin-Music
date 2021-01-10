import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home/Home2';
import NotificationsScreen from './home/Notifications2';
import SongManageScreen from './songManagement/SongManagement';
import {DrawerContent} from '../components/navigation/DrawerContent';
const Drawer = createDrawerNavigator();

export default function () {
	return (
		// <NavigationContainer>
		<Drawer.Navigator
			// initialRouteName="Home"
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen
				name="Notifications"
				component={NotificationsScreen}
			/>
			<Drawer.Screen name="SongManagement" component={SongManageScreen} />
		</Drawer.Navigator>
		// </NavigationContainer>
	);
}
