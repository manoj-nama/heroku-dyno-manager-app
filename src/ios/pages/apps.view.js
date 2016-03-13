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
	Icon = require('react-native-vector-icons/MaterialIcons'),
	API = require("../../common/api.manager");

export default class AppsPage extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		API.setToken(props.route.params.token);
		this.state = {
			loading: true,
			user: props.route.params,
			dataSource: ds.cloneWithRows([]),
		};
	}

	componentWillMount() {
		var response = API.apps({}),
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

	_renderRow(rowData) {
		return (
			<TouchableOpacity 
				style={styles.listItemWrap} 
				key={rowData.email}>
				<View style={styles.listItem}>
					<View style={styles.picCol}>
						<Icon style={styles.navIcon} name="dns" size={36} color="#477D7F" />
					</View>
					<View style={styles.info}>
						<Text style={styles.name}>{rowData.name}</Text>
						<Text style={styles.email}>{rowData.build_stack.name}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.nav} automaticallyAdjustsScrollViewInsets={true}>
			   {
			   	this.state.loading ?
			   	<View style={styles.centering}>
						<ActivityIndicatorIOS color={'#3A1051'} size={'large'} />
					</View> : <ListView style={styles.list}
					contentContainerStyle={styles.container}
					pageSize={5}
					automaticallyAdjustContentInsets={true}
			    	dataSource={this.state.dataSource}
			    	renderRow={this._renderRow.bind(this)} />
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
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	list: {
		paddingTop: 70,
	},
	listItemWrap: {
		alignSelf: "stretch",
	},
	listItem: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 4,
		backgroundColor: "#fff",
		padding: 10,
		marginHorizontal: 10,
		marginVertical: 5,
	},
	picCol: {
		marginRight: 10,
	},
	pic: {
		backgroundColor: "#ccc",
		borderRadius: 25,
	},
	info: {
		flex: 1,
	},
	name: {
		fontWeight: "200",
		flex: 1,
		fontSize: 18,
	},
	email: {
		flex: 1,
		color: "#555",
		paddingVertical: 3,
		fontWeight: "200",
		fontSize: 13,
	},
});
