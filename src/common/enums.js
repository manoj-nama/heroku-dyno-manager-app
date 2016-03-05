'use strict';

var API_BASE = "http://localhost:9000";
var obj = {
   STORAGE: {
      ACCOUNTS: "meroku_account"
   },
   ENDPOINTS: {
   	API_BASE: API_BASE,
   	AUTH: {
   		LOGIN: API_BASE + "/auth/local"
   	},
   	HEROKU: {
   		APPS: API_BASE + "/api/heroku",
   		DYNOS: API_BASE + "/api/heroku/dynos/:appId",
   		RESTART: API_BASE + "/api/heroku/restart/:appId/:dynoId",
   	},
   	USER: {
   		ME: API_BASE + "/api/users/me"
   	}
   }
};

module.exports = obj;
