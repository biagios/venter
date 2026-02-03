const logger = require("../modules/logger.js");

module.exports = async (client, error) => {
	// Pass the 'error' object directly, don't wrap it in a string or JSON.stringify
	logger.log(error, "error");
};
