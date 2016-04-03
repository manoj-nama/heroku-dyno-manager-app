'use strict';

import React, {
	Component,
	View,
	TextInput,
	Text,
	AsyncStorage,
	ActivityIndicatorIOS,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

var enums = require("../../common/enums"),
	API = require("../../common/api.manager");

export default class AddAccountPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isBusy: false,
			accounts: {},
			email: "",
			password: ""
		};
	}

	componentWillMount() {
		let self = this;
		AsyncStorage.getItem(enums.STORAGE.ACCOUNTS, function (err, data) {
			let _data = {};
         if(data) {
         	try {
					_data = JSON.parse(data);
	         	self.setState({
	         		accounts: _data
	         	});
         	} catch(e) {
         		console.log(e);
         	}
         } else {
         	console.log("No data to show, that's strange..", err);
         }
      });
	}

	addAccount() {
		if(!this.state.isBusy && this.state.email) {
			var response = API.login({
				email: this.state.email,
				password: this.state.password,
			});
			response.then((data) => {
				if(data.token) {
					var accounts = this.state.accounts,
						self = this;
					accounts[data.email] = data;
					AsyncStorage.setItem(enums.STORAGE.ACCOUNTS, JSON.stringify(accounts), ()=> {
						self.props.navigator.pop();
					});
				} else {
					//auth error
				}
			}).done();
		}
		this.setState({isBusy: true});
	}

	render() {
		return (
			<View style={styles.nav}>
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
						onPress={this.addAccount.bind(this)}
						activeOpacity={0.3}>
						<View>
							{
								this.state.isBusy ?
								<ActivityIndicatorIOS color={'#BBA1C9'} style={[styles.centering, {height: 20}]} /> :
								<Text style={styles.btnTxt}>Add</Text>
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
		flex: 1,
		backgroundColor: "#eee",
		paddingTop: 70,
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
		backgroundColor: "#fff",
		borderWidth: 1,
    color: "#333",
		borderColor: "#bbb",
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