'use strict';

import React, {
	Component,
	View,
	Text,
	ListView,
	InteractionManager,
	ActivityIndicatorIOS,
	StyleSheet
} from "react-native";

var enums = require("../../common/enums"),
	Icon = require('react-native-vector-icons/Ionicons'),
	API = require("../../common/api.manager");

export default class DynoPage extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			isReady: false,
			loading: true,
			app: props.route.params,
			dataSource: ds.cloneWithRows([]),
		};
	}

	componentWillMount() {
		var response = API.dynos({appId: this.state.app.id}),
			self = this;

		response.then((data) => {
			if(data) {
				self.setState({
       		loading: false,
       		dataSource: self.state.dataSource.cloneWithRows(data)
       	});
			}
		}).done();
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
				(!this.state.isReady || this.state.loading) ? 
				<View style={styles.centering}>
					<ActivityIndicatorIOS color={'#444'} size={'large'} />
				</View> :
				<Text>This is dynos view</Text>				
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