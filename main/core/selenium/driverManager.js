const getFiles = require("../utils/getFiles");
const DriverFactory = require("./driverFactory");
const loggerService=require('../utils/loggerService');
/**
   * Creates a new driver manager 
   */
class DriverManager {
  /**
   * Sets the session state and configuration file
   */
  constructor() {
    this.configuration = getFiles.config;
    this.sessionExists=false;
  }
  /**
   * Creates a new driver instance
   */
  async getDriver() {
    let capabilities = this.configuration.capabilities;
    let browserName = this.configuration.browser;
    let instance = await DriverFactory.getDriver(browserName, capabilities);
    return instance;
  }
  /**
   * Verifies if the seesion has been initialized
   */
  async init() {
    if (!this.sessionExists) {
      loggerService.info("New session created");
      this.driver = await this.getDriver();
      this.sessionExists = true;
    } else {
      loggerService.warn("A session already exist");
    }
    loggerService.info(
      "Session ID:",
      (await this.driver.getSession()).getId()
    );
  }
}
 
module.exports = new DriverManager();