'use strict';

var API_BASE = process.env.HEROKU_API_BASE || "http://localhost:9000";
var obj = {
   STORAGE: {
      ACCOUNTS: "meroku_account"
   },
   TABS: {
      DYNO: "Dynos",
      RELEASE: "Releases",
      CONFIG: "Config",
      COLLABORATOR: "Collaborator"
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
         COLLABORATOR: {
            LIST: API_BASE + "/api/heroku/collaborators/list/:appId",
            ADD: API_BASE + "/api/heroku/collaborators/create/:appId",
            SHOW: API_BASE + "/api/heroku/collaborators/show/:appId/:collaboratorId",
            REMOVE: API_BASE + "/api/heroku/collaborators/remove/:appId/:collaboratorId"
         },
         RELEASE: {
            LIST: API_BASE + "/api/heroku/releases/list/:appId",
            ROLLBACK: API_BASE + "/api/heroku/releases/rollback/:appId/:releaseId"
         }
   	},
   	USER: {
   		ME: API_BASE + "/api/users/me"
   	}
   },
   IMAGE: {
      BASE: "http://www.gravatar.com/avatar",
      SECURE_BASE: "https://secure.gravatar.com/avatar"
   }
};

module.exports = obj;
