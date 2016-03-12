'use strict';

import React, {
	Component,
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	AsyncStorage,
	ActivityIndicatorIOS,
	ListView,
	Navigator
} from 'react-native';

var enums = require("../../common/enums"),
	ImageManager = require("../../common/image.manager"),
	API = require("../../common/api.manager");

export default class AccountPage extends Component {

	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			loading: true,
			dataSource: ds.cloneWithRows([])
		};
	}

	componentWillMount() {
      var _data, 
      	_accounts = [],
      	self = this;

      AsyncStorage.getItem(enums.STORAGE.ACCOUNTS, function (err, data) {
         if(data) {
         	_data = JSON.parse(data);       
         	for(let i in _data) {
         		if(_data.hasOwnProperty(i)) {
         			_accounts.push(_data[i]);
         		}
         	}
         	self.setState({
         		loading: false,
         		dataSource: self.state.dataSource.cloneWithRows(_accounts)
         	});
         } else {
         	console.log("No data to show, that's strange..", err);
         }
      });
   }

   _renderRow(rowData) {
   	var imageUrl = ImageManager.get({
   		emailHash: rowData.user.emailHash,
   		size: 100,
   	});
		return (
			<TouchableOpacity style={styles.listItemWrap} 
				key={rowData.email}>
				<View style={styles.listItem}>
					<View style={styles.picCol}>
						<Image 
							style={styles.pic}
							resizeMode={'contain'}
							source={{uri: imageUrl}} 
						/>
					</View>
					<View style={styles.info}>
						<Text style={styles.name}>{rowData.user.name}</Text>
						<Text style={styles.email}>{rowData.email}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.nav} automaticallyAdjustsScrollViewInsets={true}>
				<ListView style={styles.list}
					contentContainerStyle={styles.container}
					pageSize={5}
					automaticallyAdjustContentInsets={true}
			    	dataSource={this.state.dataSource}
			    	renderRow={this._renderRow.bind(this)} />

			   {
			   	this.state.loading ?
			   	<View style={styles.centering}>
						<ActivityIndicatorIOS color={'#3A1051'} size={'large'} />
					</View> : null
		    	}
			</View>
		);
	}
};

var styles = StyleSheet.create({
	centering: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	nav: {
		flex: 1,
		backgroundColor: "#f5f5f5",
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
		borderRadius: 25,
		height: 50,
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