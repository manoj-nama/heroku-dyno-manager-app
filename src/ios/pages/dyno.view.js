'use strict';

import React, {
	Component,
	View,
	Text,
	InteractionManager,
	ActivityIndicatorIOS,
	StyleSheet
} from "react-native";

export default class DynoPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		};
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({isReady: true});
		});
	}

	render() {
		return (
			<View style={[styles.nav, styles.centering]}>
			{
				this.state.isReady ? 
					<Text>This is dynos view</Text> : <View style={styles.centering}>
							<ActivityIndicatorIOS color={'#444'} size={'large'} />
						</View>
			}
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
	nav: {
		flex: 1,
		backgroundColor: "#eee",
	},
});