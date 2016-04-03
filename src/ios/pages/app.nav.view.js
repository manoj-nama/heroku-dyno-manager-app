'use strict';

import React, {
	Component,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TabBarIOS,
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
			selectedTab: enums.TABS.DYNO,
			ready: false
		}
		console.log(props);
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
					<Text style={styles.navTitle}>{route.name}</Text>
				);
			}
		};

		return (
			<Navigator
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

	render() {
		return (
			<TabBarIOS tintColor="#000">
				<Icon.TabBarItemIOS
					title={enums.TABS.DYNO}
					iconName="fiber-smart-record"
					selected={this.state.selectedTab === enums.TABS.DYNO}
					onPress={() => {
						this.setState({
							selectedTab: enums.TABS.DYNO,
						});
					}}>
					{this.getNavigator({name: enums.TABS.DYNO, component: DynoPage})}
				</Icon.TabBarItemIOS>

				<Icon.TabBarItemIOS
					title={enums.TABS.RELEASE}
					iconName="bookmark-border"
					selectedIconName="bookmark"
					selected={this.state.selectedTab === enums.TABS.RELEASE}
					onPress={() => {
						this.setState({
							selectedTab: enums.TABS.RELEASE,
						});
					}}>
					{this.getNavigator({name: enums.TABS.RELEASE, component: ReleasePage})}
				</Icon.TabBarItemIOS>

				<Icon.TabBarItemIOS
					title={enums.TABS.CONFIG}
					iconName="settings-applications"
					selected={this.state.selectedTab === enums.TABS.CONFIG}
					onPress={() => {
						this.setState({
							selectedTab: enums.TABS.CONFIG,
						});
					}}>
					{this.getNavigator({name: enums.TABS.CONFIG, component: ConfigPage})}
				</Icon.TabBarItemIOS>

				<Icon.TabBarItemIOS
					title={enums.TABS.COLLABORATOR}
					iconName="people-outline"
					selectedIconName="people"
					selected={this.state.selectedTab === enums.TABS.COLLABORATOR}
					onPress={() => {
						this.setState({
							selectedTab: enums.TABS.COLLABORATOR,
						});
					}}>
					{this.getNavigator({name: enums.TABS.COLLABORATOR, component: CollaboratorPage})}
				</Icon.TabBarItemIOS>

				<Icon.TabBarItemIOS
					title={enums.TABS.APPS}
					iconName="bubble-chart"
					selectedIconName="people"
					selected={this.state.selectedTab === enums.TABS.APPS}
					onPress={() => {
						this.props.parentNav.pop();
					}}>
				</Icon.TabBarItemIOS>

			</TabBarIOS>
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
		backgroundColor: "#eee",
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
		backgroundColor: "#777",
	},
});