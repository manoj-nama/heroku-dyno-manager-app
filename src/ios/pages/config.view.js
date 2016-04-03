'use strict';

import React, {
	Component,
	View,
	Text,
	StyleSheet
} from "react-native";

export default class ConfigPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.nav, styles.centering]}>
				<Text style={styles.centering}>This is the config vars view</Text>
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