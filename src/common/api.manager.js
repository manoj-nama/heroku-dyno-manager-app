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

APIManager.prototype.parseUrl = function(url, data) {
	var params = url.split("/:"),
		parsed = url;
	if(params && params.length) {
		parsed = params[0];
		for(let i = 1; i < params.length; i++) {
			if(data.hasOwnProperty(params[i])) {
				parsed += ("/" + data[params[i]]);
			}
		}
	}
	return parsed;
};

APIManager.prototype.request = function(url, data = {}) {
	try {
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};
		url = this.parseUrl(url, data);
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
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.dynos = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.DYNOS, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.restart = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.RESTART, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.collaborators = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.COLLABORATOR.LIST, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.showCollaborator = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.COLLABORATOR.SHOW, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return {};
	}
};

APIManager.prototype.addCollaborator = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.COLLABORATOR.ADD, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return {};
	}
};

APIManager.prototype.removeCollaborator = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.COLLABORATOR.REMOVE, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return {};
	}
};

APIManager.prototype.releases = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.RELEASE.LIST, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.rollbackRelease = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.RELEASE.ROLLBACK, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.config = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.CONFIG.LIST, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

APIManager.prototype.addConfig = async function (options) {
	try {
		let response = await this.request(enums.ENDPOINTS.HEROKU.CONFIG.ADD, options);
		let responseJson = await response.json();
		return responseJson;
	} catch(e) {
		console.log(e);
		return [];
	}
};

var Manager = new APIManager();

module.exports = Manager;