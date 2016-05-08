'use strict';

import React, {
	Component,
	StyleSheet,
	Text,
	DrawerLayoutAndroid,
	TextInput,
	TouchableOpacity,
	Navigator,
	View,
} from "react-native";

import DynoPage from "./dyno.view";
import ReleasePage from "./release.view";
import ConfigPage from "./config.view";
import CollaboratorPage from "./collaborator.view";

var enums = require("../../common/enums"),
	Icon = require('react-native-vector-icons/MaterialIcons'),
	ImageManager = require("../../common/image.manager");

export default class AppNavPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: enums.TABS.DYNO,
			ready: false
		}
	}

	getNavigator(defaultRoute) {
		const routeMapper = {
			LeftButton: (route, navigator, index, navState) => {
				if (index === 0) {
					return null;
				}
				const previousRoute = navState.routeStack[index - 1]
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
					<Text style={styles.navTitle}>
						{route.appName && route.appName || route.name}
					</Text>
				);
			}
		};

		return (
			<Navigator
				automaticallyAdjustsScrollViewInsets={true}
				navigationBar={
					<Navigator.NavigationBar 
						navigationStyles={Navigator.NavigationBar.StylesIOS}
						style={styles.navBar} 
						routeMapper={routeMapper} />
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

	getDrawerItems() {
		return (
			<View style={styles.nav}>
				<TouchableOpacity 
					style={styles.listItemWrap} 
					key={'a'}>
					<View style={[styles.listItem, styles.selectedBg]}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon, styles.selectedIcon]} name="fiber-smart-record" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={[styles.name, styles.selectedName]}>{enums.TABS.DYNO}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					key={'b'}>
					<View style={styles.listItem}>
						<View style={styles.picCol}>
							<Icon style={styles.navIcon} name="bookmark-border" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={styles.name}>{enums.TABS.RELEASE}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					key={'c'}>
					<View style={styles.listItem}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon]} name="settings-applications" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={[styles.name]}>{enums.TABS.CONFIG}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					key={'d'}>
					<View style={styles.listItem}>
						<View style={styles.picCol}>
							<Icon style={styles.navIcon} name="people-outline" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={styles.name}>{enums.TABS.COLLABORATOR}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					key={'e'}>
					<View style={styles.listItem}>
						<View style={styles.picCol}>
							<Icon style={styles.navIcon} name="bubble-chart" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={styles.name}>Back to {enums.TABS.APPS}</Text>
						</View>
					</View>
				</TouchableOpacity>
	    </View>
		)
	}

	render() {

		var navigationView = this.getDrawerItems(),
			self = this,
			navParams = {
				name: enums.TABS.DYNO, 
				component: DynoPage, 
				appName: this.props.route.params.name, 
				params: this.props.route.params
			};

		switch(this.state.selectedItem) {
			case enums.TABS.DYNO:
				navParams.name = enums.TABS.DYNO; 
				navParams.component = DynoPage; 
				break;

			case enums.TABS.RELEASE:
				navParams.name = enums.TABS.RELEASE; 
				navParams.component = ReleasePage; 
				break;

			case enums.TABS.CONFIG:
				navParams.name = enums.TABS.CONFIG; 
				navParams.component = ConfigPage; 
				break;

			case enums.TABS.COLLABORATOR:
				navParams.name = enums.TABS.COLLABORATOR; 
				navParams.component = CollaboratorPage; 
				break;
		}	

		return (
			<DrawerLayoutAndroid
				drawerWidth={300}
				statusBarBackgroundColor={'#333'}
				ref={'DRAWER_REF'}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navigationView}>
					
					{ self.getNavigator(navParams) }

			</DrawerLayoutAndroid>
		);
	}
};

const styles = StyleSheet.create({
	centering: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	nav: {
		flex: 1,
		paddingTop: 100,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	navWrap: {
		flex: 1,
		marginTop: 65, 
	},
	navText: {
		fontSize: 16,
		marginVertical: 10,
		color: "#333",
		paddingHorizontal: 10,
	},
	navTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 0,
		color: "#333",
		paddingHorizontal: 10,
	},
	navIcon: {
		fontSize: 30,
		color: "#eee",
		paddingHorizontal: 5,
	},
	selectedIcon: {
		color: "#000",
	},
	navBar: {
		backgroundColor: "#fc5",
	},
	listItemWrap: {
		alignSelf: "stretch",
	},
	listItem: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 4,
		padding: 10,
		marginHorizontal: 10,
		marginVertical: 5,
	},
	selectedBg: {
		backgroundColor: "#fc5",
	},
	picCol: {
		marginRight: 10,
	},
	info: {
		flex: 1,
	},
	name: {
		fontWeight: "200",
		color: "#eee",
		flex: 1,
		fontSize: 18,
	},
	selectedName: {
		color: "#000",
	},
});