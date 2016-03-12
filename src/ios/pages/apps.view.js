'use strict';

import React, {
	Component,
	View,
	ListView,
	Navigator,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicatorIOS,
} from 'react-native';

var enums = require("../../common/enums"),
	API = require("../../common/api.manager");

export default class AppsPage extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.centering}>
				<Text>AppsView</Text>
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
});

