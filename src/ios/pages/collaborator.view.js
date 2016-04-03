'use strict';

import React, {
	Component,
	View,
	Text,
	InteractionManager,
	ActivityIndicatorIOS,
	StyleSheet
} from "react-native";

export default class CollaboratorPage extends Component {

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
					<Text>This is the collaborator view</Text> : 
					<View style={styles.centering}>
						<ActivityIndicatorIOS color={'#444'} size={'large'} />
					</View>
			}
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