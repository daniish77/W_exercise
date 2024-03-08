const log4js = require("log4js");
const getFiles = require("./getFiles");

const logLevel = getFiles.config["log-level"];
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'reports/logs/exec.log', backups: 3 },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: logLevel },
    console: { appenders: ['console'], level: logLevel },
    file: { appenders: ['file'], level: logLevel },
  },
});

let logger = log4js.getLogger();

module.exports = logger;