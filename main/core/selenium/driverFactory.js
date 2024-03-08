const chrome = require("./chrome");
const firefox = require("./firefox");
/**
   * Creates the webdriver based on the browser
   */
class DriverFactory {
  /**
   * @param browser the browser the webdriver wil work with
   * @param configurations the capabilities set by the configuration.json file
   */
  static async getDriver(browser, configurations) {
    switch (browser.toLowerCase()) {
    case "chrome":
      return await chrome(configurations);
    case "firefox":
      return await firefox(configurations);
    default:
      throw new Error(`Invalid browser name ${browser}`);
    }
  }
}

module.exports = DriverFactory;