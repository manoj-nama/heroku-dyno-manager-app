'use strict';

import React, {
	Component,
	StyleSheet,
	Navigator
} from 'react-native';

import LoginPage from './pages/login.view';

export default class BootcampApp extends Component {
	render() {
		return (
			<Navigator
				automaticallyAdjustsScrollViewInsets={true}
				initialRoute={{name: 'Login', component: LoginPage}}
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

const styles = StyleSheet.create({
	nav: {
		flex: 1,
	},
	navWrap: {
		flex: 1,
		marginTop: 65,
	},
	navText: {
		fontSize: 16,
		marginVertical: 10,
		paddingHorizontal: 10,
	},
	navTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 10,
		paddingHorizontal: 10,
	},
	navBar: {
		backgroundColor: "#60467e",
	},
});
