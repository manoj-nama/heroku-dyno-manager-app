'use strict';

import React, {
	Component,
	StyleSheet,
	Text,
	DrawerLayoutAndroid,
	TextInput,
	InteractionManager,
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
	ImageManager = require("../../common/image.manager"),
	IonIcon = require('react-native-vector-icons/Ionicons');

export default class AppNavPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: enums.TABS.DYNO,
			ready: false
		}
	}

	openDrawer() {
		this.refs.DRAWER_REF.openDrawer();
	}

	closeDrawer() {
		this.refs.DRAWER_REF.closeDrawer();	
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			//start doing things after this
		});
	}

	getNavigator(defaultRoute) {
		console.log("defR", defaultRoute);
		var self = this;
		const routeMapper = {
			LeftButton: (route, navigator, index, navState) => {
				if (index === 0) {
					return (
						<TouchableOpacity
							style={styles.backBtn}
							onPress={() => self.openDrawer()}>
							<Icon 
								style={[
									styles.navIcon, 
									styles.bigIcon,
									{color: '#333', marginHorizontal: 10, paddingLeft: 20}
								]} 
								name="menu" 
								size={30} 
								color="#333" />
						</TouchableOpacity>
					);
				}
				const previousRoute = navState.routeStack[index - 1]
				return (
					<TouchableOpacity
						style={styles.backBtn}
						onPress={() => navigator.pop()}>
						<Text style={styles.navText}>
							<IonIcon 
								style={[
									styles.navIcon,
									{color: "#333"}
								]} 
								name="chevron-left" 
								size={30} 
								color="#333" />
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
					<TouchableOpacity
						onPress={() => self.openDrawer()}>
						<View style={[styles.centering, {marginTop: -5}]}>
							<Text style={styles.navTitle}>
								{route.appName && route.appName || route.name}
							</Text>
							<Text style={styles.navDesc}>
								{route.name}
							</Text>
						</View>
					</TouchableOpacity>
				);
			}
		};

		return (
			<Navigator
				ref={"APP_NAV"}
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

	_navigateToSection(section, component) {
		const self = this;
		if(section) {
			this.refs.APP_NAV.replace({
				name: section, 
				component: component, 
				appName: self.props.route.params.name, 
				params: self.props.route.params
			});
			this.setState({
				selectedItem: section
			});
			this.closeDrawer();
		} else {
			this.props.parentNav.pop();
		}
	}

	getDrawerItems() {
		const self = this,
		selected = this.state.selectedItem;
		return (
			<View style={styles.nav}>
				<TouchableOpacity 
					style={styles.listItemWrap} 
					onPress={() => self._navigateToSection(enums.TABS.DYNO, DynoPage)}
					key={'a'}>
					<View style={[styles.listItem, selected === enums.TABS.DYNO && styles.selectedBg]}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon, styles.bigIcon, selected === enums.TABS.DYNO && styles.selectedIcon]} name="fiber-smart-record" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={[styles.name, selected === enums.TABS.DYNO && styles.selectedName]}>{enums.TABS.DYNO}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					onPress={() => self._navigateToSection(enums.TABS.RELEASE, ReleasePage)}
					key={'b'}>
					<View style={[styles.listItem, selected === enums.TABS.RELEASE && styles.selectedBg]}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon, styles.bigIcon, selected === enums.TABS.RELEASE && styles.selectedIcon]} name="bookmark-border" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={[styles.name, selected === enums.TABS.RELEASE && styles.selectedName]}>{enums.TABS.RELEASE}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					onPress={() => self._navigateToSection(enums.TABS.CONFIG, ConfigPage)}
					key={'c'}>
					<View style={[styles.listItem, selected === enums.TABS.CONFIG && styles.selectedBg]}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon, styles.bigIcon, selected === enums.TABS.CONFIG && styles.selectedIcon]} name="settings-applications" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={[styles.name, selected === enums.TABS.CONFIG && styles.selectedName]}>{enums.TABS.CONFIG}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					onPress={() => self._navigateToSection(enums.TABS.COLLABORATOR, CollaboratorPage)}
					key={'d'}>
					<View style={[styles.listItem, selected === enums.TABS.COLLABORATOR && styles.selectedBg]}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon, styles.bigIcon, selected === enums.TABS.COLLABORATOR && styles.selectedIcon]} name="people-outline" size={40} />
						</View>
						<View style={styles.info}>
							<Text style={[styles.name, selected === enums.TABS.COLLABORATOR && styles.selectedName]}>{enums.TABS.COLLABORATOR}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.listItemWrap} 
					onPress={() => self._navigateToSection()}
					key={'e'}>
					<View style={styles.listItem}>
						<View style={styles.picCol}>
							<Icon style={[styles.navIcon, styles.bigIcon]} name="bubble-chart" size={40} />
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
					{ 
						self.getNavigator(navParams)
					}
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
		marginTop: 0,
		marginHorizontal: 15,
		color: "#333",
		paddingHorizontal: 20,
	},
	navTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 0,
		color: "#333",
		paddingHorizontal: 10,
	},
	navDesc: {
		fontSize: 12,
		color: "#666",
		fontStyle: "italic",
		paddingHorizontal: 10,
	},
	navIcon: {
		fontSize: 22,
		color: "#eee",
		paddingHorizontal: 5,
	},
	bigIcon: {
		fontSize: 30,
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