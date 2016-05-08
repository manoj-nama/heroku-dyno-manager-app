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
	Icon = require('react-native-vector-icons/MaterialIcons'),
	API = require("../../common/api.manager");

export default class ReleasePage extends Component {

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
		var response = API.releases({appId: this.state.app.id}),
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

	confirmRollback(data) {
		var self = this;
		Alert.alert(
			"Rollback",
			"Are you sure you want to rollback to v" + data.version + "?",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Rollback",
					onPress: ()=>{self._rollbackRelease(data)},
					style: "destructive"
				},
			]
		)
	}

	_rollbackRelease(data) {
		var response = API.rollbackRelease({
			appId: this.state.app.id,
			releaseId: data.id
		}), self;

		response.then((resp) => {
			if(resp) {
				Alert.alert(
					"Dyno restart", 
					"Rolledback to v" + data.version + "!",
					{text: "OK"}
				);
			}
		}).done();
	}

	_renderRow(rowData) {
		return (
			<View style={styles.listItemWrap}>
				<View style={styles.listItem}>
					<View style={styles.info}>
						<View>
							<Text style={styles.name}>v{rowData.version} - {rowData.description}</Text>
							<Text style={styles.email}>{rowData.user.email}</Text>
						</View>						
					</View>
					<TouchableOpacity onPress={()=> this.confirmRollback(rowData)}>
							<View style={styles.navIcon}>
								<Icon name="settings-backup-restore" size={30} color="#c22" />
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
					pageSize={2}
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
	nav: {
		flex: 1,
		backgroundColor: "#eee",
	},
	list: {
		paddingTop: 70,
		paddingBottom: 40,
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
		fontSize: 16,
	},
	email: {
		flex: 1,
		color: "#555",
		paddingVertical: 3,
		fontWeight: "200",
		fontSize: 13,
	},
});