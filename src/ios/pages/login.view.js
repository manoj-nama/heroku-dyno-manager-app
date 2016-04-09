'use strict';

import React, {
	Component,
	StyleSheet,
	Text,
   AsyncStorage,
	TextInput,
	TouchableOpacity,
	ActivityIndicatorIOS,
	View,
} from 'react-native';

import Nav from './nav.view';

var enums = require("../../common/enums"),
	API = require("../../common/api.manager");

export default class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isBusy: false,
			authError: false,
			accounts: {},
			email: "",
			password: "",
		};
	}

	doLogin() {
		if(!this.state.isBusy && this.state.email) {
			var response = API.login({
				email: this.state.email,
				password: this.state.password,
			});
			response.then((data) => {		
				if(data.token) {
					var accounts = this.state.accounts;
					accounts[data.email] = data;
					this.setState({isBusy: false});
					AsyncStorage.setItem(enums.STORAGE.ACCOUNTS, JSON.stringify(accounts));
					this.props.parentNav.replace({
						id: "Nav",
						component: Nav,
					});
				} else {
					//auth error
					this.setState({
						isBusy: false,
						authError: true,
					});
				}
			}).done();
		}
		this.setState({isBusy: true});
	}

	render() {
		return (
			<View style={styles.nav}>

				<View style={styles.headingWrap}>
					<Text style={styles.heading}>Meroku</Text>
				</View>
				{
					this.state.authError ?
					<View style={styles.errWrap}>
						<Text style={styles.error}>Authentication failed!</Text>
					</View> : null
				}
				<View style={styles.form}>
					<TextInput
						keyboardType="email-address"
						autoCorrect={false}
						style={styles.txt}
						onChangeText={(text) => this.setState({email: text})}
						autoCapitalize="none"
						placeholder="Email" />

					<TextInput
						style={styles.txt}
						secureTextEntry={true}
						autoCapitalize="none"
						onChangeText={(text) => this.setState({password: text})}
						placeholder="Password" />

					<TouchableOpacity style={styles.loginBtn}
						activeOpacity={0.3}
						onPress={this.doLogin.bind(this)}>
						<View>
							{
								this.state.isBusy ?
								<ActivityIndicatorIOS color={'#BBA1C9'} style={[styles.centering, {height: 20}]} /> :
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
      backgroundColor: "#777",
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
	errWrap: {
		paddingVertical: 15,
		alignItems: "center",
		backgroundColor: "rgba(220, 40, 40, 0.7)",
	},
	error: {
		color: "#fff",
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
    backgroundColor: "#aaa",
		borderWidth: 1,
    color: "#275355",
		borderColor: "#555",
	},
	loginBtn: {
		paddingVertical: 10,
		marginHorizontal: 70,
		marginVertical: 20,
		borderRadius: 5,
		backgroundColor: "#666",
		borderWidth: 1,
		borderColor: "#555",
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
