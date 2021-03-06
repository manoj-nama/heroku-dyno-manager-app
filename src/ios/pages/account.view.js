'use strict';

import React, {
	Component,
	View,
	StyleSheet,
	Text,
	Image,
	Alert,
	StatusBar,
	TouchableOpacity,
	AsyncStorage,
	ActivityIndicatorIOS,
	ListView,
	Navigator
} from 'react-native';

import AppsPage from "./apps.view";
import LoginPage from "./login.view";

var enums = require("../../common/enums"),
	Icon = require('react-native-vector-icons/MaterialIcons'),
	ImageManager = require("../../common/image.manager"),
	API = require("../../common/api.manager");

export default class AccountPage extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			loading: true,
			dataSource: ds.cloneWithRows([]),
			accounts: {}
		};
		this.extra = {
			loaded: true,
			updated: false,
		};
	}

	fetchAccountsFromStorage() {
		var _data, 
      	_accounts = [],
      	self = this;

      AsyncStorage.getItem(enums.STORAGE.ACCOUNTS, function (err, data) {
         if(data) {
         	try {
					_data = JSON.parse(data);       
	         	for(let i in _data) {
	         		if(_data.hasOwnProperty(i)) {
	         			_accounts.push(_data[i]);
	         		}
	         	}
	         	self.forceStateUpdate();
	         	self.setState({
	         		loading: false,
	         		accounts: _data,
	         		dataSource: self.state.dataSource.cloneWithRows(_accounts)
	         	});
         	} catch(e) {
         		console.log(e);
         	}
         	
         } else {
         	console.log("No data to show, that's strange..", err);
         }
      });
	}

	componentWillUpdate() {
		if(!this.extra.updated) {
			console.log("Refetching the accounts");
			this.fetchAccountsFromStorage();
		}
	}

	forceStateUpdate() {
		this.extra.updated = true;
   	this.extra.loaded = true;
	}

	shouldComponentUpdate() {
		var _retVal = this.extra.loaded;
		if(this.extra.loaded) {
			this.extra.loaded = false;
		}
		var routes = this.props.navigator.getCurrentRoutes();
		routes = routes.pop();
		if(routes.id === "AddAccount") {
			this.extra.loaded = true;
			this.extra.updated = false;
		}
		return _retVal;
	}

	componentWillMount() {
      this.fetchAccountsFromStorage();
   }

   goToDetailPage(data) {
		this.props.navigator.push({ 
			name: "Apps",
			id: "Apps",
			component: AppsPage,
			params: data,
			rightElement: null
		});
	}

	_deleteAndSyncAccounts(data) {
		var _accounts = this.state.accounts,
			finalAccountsCount = Object.keys(_accounts).length - 1,
			action = "setItem",
			self = this;

		if(_accounts.hasOwnProperty(data.email)) {
			delete _accounts[data.email];
			if(finalAccountsCount) {
				AsyncStorage.setItem(enums.STORAGE.ACCOUNTS, JSON.stringify(_accounts), ()=>{
					self.forceStateUpdate();
					self.setState({
	         		accounts: _accounts,
	         		dataSource: self.state.dataSource.cloneWithRows(_accounts)
					});
				});
			} else {
				AsyncStorage.removeItem(enums.STORAGE.ACCOUNTS,() => {
					self.props.parentNav.replace({
						id: "Login",
						name: "Login",
						component: LoginPage,
					});
				});
			}
		}
	}

	confirmDelete(data) {
		console.log("removing ...", data.email);
		var self = this;
		Alert.alert(
			"Delete Account",
			"Are you sure you want to remove this account?",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Delete",
					onPress: ()=>{self._deleteAndSyncAccounts(data)},
					style: "destructive"
				},
			]
		)
	}

   _renderRow(rowData) {
   	var imageUrl = ImageManager.get({
   		emailHash: rowData.user.emailHash,
   		default: "retro",
   		size: 100,
   	});
		return (
			<TouchableOpacity 
				style={styles.listItemWrap} 
				key={rowData.email}
				onPress={() => this.goToDetailPage(rowData)}>
				<View style={styles.listItem}>
					<View style={styles.picCol}>
						<Image 
							style={styles.pic}
							resizeMode={'contain'}
							source={{uri: imageUrl}} 
						/>
					</View>
					<View style={styles.info}>
					{
						rowData.user.name ?
						<View>
							<Text style={styles.name}>{rowData.user.name}</Text>
							<Text style={styles.email}>{rowData.email}</Text>
						</View> :
						<Text style={styles.name}>{rowData.email}</Text>
					}				
					</View>
					<TouchableOpacity onPress={()=> this.confirmDelete(rowData)}>
						<View style={styles.navIcon}>
							<Icon name="delete-forever" size={30} color="#c22" />
						</View>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.nav} automaticallyAdjustsScrollViewInsets={true}>
				<StatusBar barStyle="default" />
				<ListView style={styles.list}
					contentContainerStyle={styles.container}
					pageSize={5}
					automaticallyAdjustContentInsets={true}
			    	dataSource={this.state.dataSource}
			    	renderRow={this._renderRow.bind(this)} />

			   {
			   	this.state.loading ?
			   	<View style={styles.centering}>
						<ActivityIndicatorIOS color={'#444'} size={'large'} />
					</View> : null
		    	}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	centering: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	nav: {
		flex: 1,
		backgroundColor: "#eee",
	},
	list: {
		paddingTop: 70,
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	listItemWrap: {
		alignSelf: "stretch",
	},
	listItem: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 4,
		backgroundColor: "#fff",
		padding: 10,
		marginHorizontal: 10,
		marginVertical: 5,
	},
	picCol: {
		marginRight: 10,
		width: 50,
	},
	pic: {
		width: 50,
		backgroundColor: "#ccc",
		borderRadius: 25,
		height: 50,
	},
	info: {
		flex: 1,
	},
	navIcon: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#eee",
	},
	name: {
		fontWeight: "200",
		flex: 1,
		fontSize: 18,
	},
	email: {
		flex: 1,
		color: "#555",
		paddingVertical: 3,
		fontWeight: "200",
		fontSize: 13,
	},
});