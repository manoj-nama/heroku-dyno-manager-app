'use strict';

import React, {
	Component,
	View,
	TextInput,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

var enums = require("../../common/enums"),
	API = require("../../common/api.manager");

export default class AddAccountPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.centering}>
				<Text>Add more accounts here</Text>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	centering: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
});