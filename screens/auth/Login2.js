import * as React from 'react';
export default function SignInScreen() {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const AuthContext = React.createContext();

	const { signIn } = React.useContext(AuthContext);

	return (
		<View>
			<TextInput
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title="Sign in"
				onPress={() => signIn({ username, password })}
			/>
		</View>
	);
}
