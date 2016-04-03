'use strict';

import React, {
	Component,
	StyleSheet,
	View,
	Navigator,
	ActivityIndicatorIOS,
	AsyncStorage
} from 'react-native';

import LoginPage from './pages/login.view';
import AccountPage from './pages/account.view';
import Nav from './pages/nav.view';

var enums = require("../common/enums"),
	API = require("../common/api.manager");

export default class HerokuApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			initialPage: LoginPage,
			accountCheck: false
		}
	}

	componentWillMount() {
      var _data, self = this;

      AsyncStorage.getItem(enums.STORAGE.ACCOUNTS, function (err, data) {
         if(data) {
         	self.setState({initialPage: Nav, accountCheck: true});
         } else {
         	self.setState({accountCheck: true});
         }
         // AsyncStorage.removeItem(enums.STORAGE.ACCOUNTS, function(){});
      });
   }

	render() {
		var self = this;

		if(!self.state.accountCheck) {
			return (
				<View style={styles.centering}>
					<ActivityIndicatorIOS color={'#444'} size={'large'} />
				</View>
			);
		}

		return (
			<Navigator
				automaticallyAdjustsScrollViewInsets={true}
				initialRoute={{name: 'Login', component: self.state.initialPage, id: "Login"}}
				configureScene={() => {
				  return Navigator.SceneConfigs.PushFromRight;
				}}
				renderScene={(route, navigator) => {
					if (route.component) {
				   	return React.createElement(route.component, { 
				   		parentNav: navigator, 
				   		route: route 
				   	});
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
	centering: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
