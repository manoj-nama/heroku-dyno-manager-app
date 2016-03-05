'use strict';

var enums = require("./enums");

function APIManager() {}

APIManager.prototype.login = async function(options) {
	try {
		let response = await fetch(enums.ENDPOINTS.AUTH.LOGIN, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(options)
		});
		let responseJson = await response.json();
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

var Manager = new APIManager();

module.exports = Manager;