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

export default class AppNavPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.nav, styles.centering]}>
				<Text style={styles.centering}>This is the application navigation view</Text>
			</View>	
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
});