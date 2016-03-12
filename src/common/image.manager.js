'use strict';

var enums = require("./enums");

function ImageManager() {

}

ImageManager.prototype.get = function (options) {
	var urlBase = enums.IMAGE.BASE,
		size = 50,
		defaultImage = "mm",
		rating = "pg",
		url;

	if(!options.emailHash) {
		console.log("Error: Cannot fetch image, no email hash provided");
		return "";
	}

	if(options.secure) {
		urlBase = enums.IMAGE.SECURE_BASE;
	}

	if(options.default) {
		defaultImage = options.default;
	}

	if(options.size) {
		size = +options.size || size;
	}

	if(options.rating) {
		rating = options.rating;
	}

	url = urlBase;
	url += ("/" + options.emailHash);
	url += ("?s=" + size);
	url += ("&d=" + defaultImage);
	url += ("&r=" + rating);

	return url;
};

var manager = new ImageManager();

module.exports = manager;