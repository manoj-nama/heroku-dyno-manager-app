'use strict';

import React, {
	Component,
	Navigator,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

import AccountPage from './account.view';
import AddAccountPage from './account.add.view';

var Icon = require('react-native-vector-icons/MaterialIcons');

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const defaultRoute = {
			name: "Accounts",
			component: AccountPage,
			rightElement: (
				<TouchableOpacity 
					style={styles.navIconBtn} 
					onPress={()=> {
						this.refs.mainNavigator.push({ 
							name: "Add Account",
							id: "AddAccount",
							component: AddAccountPage,
							params: {},
							rightElement: null
						});
					}}
					activeOpacity={0.3}>
					<Icon style={styles.navIcon} name="person-add" size={30} color="#900" />
				</TouchableOpacity>
			)
		};

		const routeMapper = {
			LeftButton: (route, navigator, index, navState) => {
				if (index === 0) {
					return null;
				}
				return (
					<TouchableOpacity
						style={styles.backBtn}
						onPress={() => navigator.pop()}>
						<Text style={styles.navText}>
							&lt; Back
						</Text>
					</TouchableOpacity>
				);
			},
			RightButton: (route, navigator, index, navState) => {
				if (route.rightElement) {
					return route.rightElement;
				}
			},
			Title: (route, navigator, index, navState) => {
				return (
					<Text style={styles.navTitle}>{route.name}</Text>
				);
			}
		};

		return (
			<Navigator
				ref="mainNavigator"
				automaticallyAdjustsScrollViewInsets={true}
				navigationBar={
					   <Navigator.NavigationBar style={styles.navBar} routeMapper={routeMapper} />
				}
				initialRoute={defaultRoute}
				configureScene={() => {
				  return Navigator.SceneConfigs.PushFromRight;
				}}
				renderScene={(route, navigator) => {
					if (route.component) {
				   	return React.createElement(route.component, { navigator, route });
				  	}
			}} />
		);
	}
};

var styles = StyleSheet.create({
	centering: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	centering: {
		alignItems: "center",
		justifyContent: "center",
	},
	navWrap: {
		flex: 1,
		marginTop: 65, 
	},
	navText: {
		fontSize: 16,
		marginVertical: 10,
		color: "#fff",
		paddingHorizontal: 10,
	},
	navTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 10,
		color: "#fff",
		paddingHorizontal: 10,
	},
	navIconBtn: {
		marginTop: 10,
	},
	navIcon: {
		fontSize: 22,
		color: "#fff",
		paddingHorizontal: 15,
	},
	navBar: {
		backgroundColor: "#477D7F",
	},
});