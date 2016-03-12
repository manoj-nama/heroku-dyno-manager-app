'use strict';

import React, {
	Component,
	View,
	StyleSheet,
	Text,
	ListView,
	Navigator
} from 'react-native';

var enums = require("../../common/enums"),
	ImageManager = require("../../common/image.manager"),
	API = require("../../common/api.manager");

export default class AccountPage extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			loading: true,
			dataSource: ds.cloneWithRows([])
		};
	}

	render() {
		return (
			<View style={styles.centering}>
				<Text>Accounts view</Text>
			</View>
		);
	}
};

var styles = StyleSheet.create({
	centering: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});