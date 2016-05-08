'use strict';

import React, {
	Component,
	View,
	Text,
	ListView,
	Image,
	StatusBar,
	TouchableOpacity,
	AsyncStorage,
	InteractionManager,
	ProgressBarAndroid,
	StyleSheet
} from "react-native";

var enums = require("../../common/enums"),
	Icon = require('react-native-vector-icons/MaterialIcons'),
	ImageManager = require("../../common/image.manager"),
	API = require("../../common/api.manager");

export default class CollaboratorPage extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([]),
			loaded: true,
			app: props.route.params,
			isReady: false
		};
	}

	componentWillMount() {
		var response = API.collaborators({appId: this.state.app.id}),
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

	_renderRow(rowData) {
   	var imageUrl = ImageManager.get({
   		emailHash: rowData.emailHash,
   		default: "retro",
   		size: 100,
   	});
		return (
			<TouchableOpacity 
				style={styles.listItemWrap} 
				key={rowData.user.email}>
				<View style={styles.listItem}>
					<View style={styles.picCol}>
						<Image 
							style={styles.pic}
							resizeMode={'contain'}
							source={{uri: imageUrl}} 
						/>
					</View>
					<View style={styles.info}>
						<Text style={styles.name}>{rowData.user.email}</Text>
					</View>
				</View>
			</TouchableOpacity>
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
					automaticallyAdjustContentInsets={false}
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
		width: 50,
	},
	pic: {
		width: 50,
		backgroundColor: "#ccc",
		borderRadius: 25,
		height: 50,
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