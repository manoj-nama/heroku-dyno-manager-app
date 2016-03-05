'use strict';

import React, {
	Component,
	View,
	StyleSheet,
	Text,
	Navigator
} from 'react-native';

export default class AccountPage extends Component {
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