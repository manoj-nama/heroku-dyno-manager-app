'use strict';

var enums = require("./enums");

function APIManager() {
	var token = null;
	this.hasToken = false;
	this.setToken = function(_token) {
		this.hasToken = true;
		token = _token;
	}
	this.getToken = function() {
		return token;
	}
}

APIManager.prototype.request = function(url, data) {
	try {
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};
		console.log("TOKEN:", this.getToken());
		if(this.hasToken) {
			headers["Authorization"] = "Bearer " + this.getToken();
		}
		return fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(data)
		});
	} catch(error) {
		console.error(error);
	}
};

APIManager.prototype.login = async function(options) {
	try {
		let response = await this.request(enums.ENDPOINTS.AUTH.LOGIN, options);
		let responseJson = await response.json();
		if(responseJson.token) {
			this.setToken(responseJson.token);
		}
		return {
			email: options.email,
			token: responseJson.token,
			user: responseJson.user
		};
	} catch(error) {
		// Handle error
		console.error(error);
	}
};

APIManager.prototype.apps = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.APPS, options);
		let responseJson = await response.json();
		console.log(responseJson);
	} catch(e) {
		console.error(e);
	}
};

var Manager = new APIManager();

module.exports = Manager;