'use strict';

import React, {
	Component,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicatorIOS,
	View,
} from 'react-native';

export default class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isBusy: false
		};
	}

	doLogin() {
		if(!this.state.isBusy) {
			this.setState({isBusy: true});
		}
	}

	render() {
		return (
			<View style={styles.nav}>

				<View style={styles.headingWrap}>
					<Text style={styles.heading}>Meroku</Text>
				</View>
				<View style={styles.form}>
					<TextInput
						keyboardType="email-address"
						autoCorrect={false}
						style={styles.txt}
						autoCapitalize="none"
						placeholder="Email" />

					<TextInput
						style={styles.txt}
						secureTextEntry={true}
						placeholder="Password" />

					<TouchableOpacity style={styles.loginBtn}
						activeOpacity={0.3}
						onPress={this.doLogin.bind(this)}>
						<View>
							{
								this.state.isBusy ?
								<ActivityIndicatorIOS style={[styles.centering, {height: 20}]} /> :
								<Text style={styles.btnTxt}>Login</Text>
							}
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	nav: {
		flexDirection: 'column',
		flex: 1,
      backgroundColor: "#73478A",
	},
	copy: {
		paddingTop: 40,
		paddingBottom: 15,
		justifyContent: 'center',
		paddingHorizontal: 20,
		flex: 1,
	},
	heading: {
		fontSize: 42,
		textAlign: "center",
		color: "#fff",
		fontWeight: "200",
		paddingVertical: 20,
	},
	headingWrap: {
		paddingTop: 50,
	},
	form: {
		paddingTop: 20,
	},
	txt: {
		height: 40,
		borderBottomWidth: 1,
		fontSize: 16,
		padding: 10,
		borderRadius: 5,
		margin: 10,
      backgroundColor: "#BBA1C9",
		borderWidth: 1,
      color: "#3A1051",
		borderColor: "#3A1051",
	},
	loginBtn: {
		paddingVertical: 10,
		marginHorizontal: 70,
		marginVertical: 20,
		borderRadius: 5,
		backgroundColor: "#3A1051",
		borderWidth: 1,
		borderColor: "#3A1051",
		alignItems: 'center',
	},
	btnTxt: {
		fontSize: 16,
      color: "#fff",
	},
	centering: {
		alignItems: "center",
		justifyContent: "center",
	}
});
