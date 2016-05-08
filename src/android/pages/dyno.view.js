'use strict';

import React, {
	Component,
	View,
	Text,
	Alert,
	ListView,
	InteractionManager,
	TouchableOpacity,
	ProgressBarAndroid,
	StyleSheet
} from "react-native";

var enums = require("../../common/enums"),
	moment = require("moment"),
	Icon = require('react-native-vector-icons/MaterialIcons'),
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

	restartDyno(data) {
		var response = API.restart({
			appId: this.state.app.id,
			dynoId: data.id
		}),
		self = this;

		response.then((resp) => {
			if(resp) {
				Alert.alert(
					"Dyno restart", 
					data.name + " has been restarted!",
					[{text: "OK"}]
				);
			}
		}).done();
	}

	_renderRow(rowData) {
		var runTime = moment(rowData.updated_at).fromNow();
		return (
			<View style={styles.listItemWrap}>
				<View style={styles.listItem}>
					<View style={styles.picCol}>
						<Icon name="memory" size={32} color="#444" />
					</View>
					<View style={styles.info}>
						<View>
							<Text style={styles.name}>{rowData.name}</Text>
							<Text style={styles.email}>{rowData.size} - ({runTime})</Text>
						</View>						
					</View>
					<TouchableOpacity onPress={()=> this.restartDyno(rowData)}>
							<View style={styles.navIcon}>
								<Icon name="cached" size={30} color="#333" />
							</View>
						</TouchableOpacity>
				</View>
			</View>	
		);
	}

	render() {
		return (
			<View style={styles.nav}>
			{
				(!this.state.isReady || this.state.loading) ? 
				<View style={styles.centering}>
					<ProgressBarAndroid color={'#444'} />
				</View> :
				<ListView style={styles.list}
					contentContainerStyle={styles.container}
					pageSize={5}
					contentInset={{top: 0, bottom: 53}}
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
	list: {
		paddingTop: 70,
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
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
	navIcon: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#eee",
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