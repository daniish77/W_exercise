const { until } = require("selenium-webdriver");
const DriverManager = require("../driverManager");
const loggerService = require("./../../utils/loggerService");
const getFiles = require("../../utils/getFiles");

/**
   * Creates a web driver conditions class
   */
class WebDriverConditions {

  /**
   * Waits until an element is in a given location
   * @param locator locator for the web element to wait
   * @param timeout timeout set by the configuration file
   */
  static async waitUntilElementIsLocated(
    locator,
    timeout = getFiles.config['explicit-wait']
  ) {
    loggerService.debug(`Waiting until element is located: "${locator.toString()}"`);
    await DriverManager.driver.wait(
      until.elementLocated(locator),
      timeout
    );
  }

  /**
   * Waits until an element is visible
   * @param locator locator for the web element to wait
   * @param timeout timeout set by the configuration file
   */
  static async waitUntilElementIsVisible(
    locator,
    timeout = getFiles.config['explicit-wait']
  ) {
    loggerService.debug(`Waiting until element is visible: "${locator.toString()}"`);
    const element = await DriverManager.driver.findElement(locator);
    return await DriverManager.driver.wait(
      until.elementIsVisible(element),
      timeout
    );
  }
  /**
     * Returns true if element is visible, otherwise, returns false
     * @param locator locator for the web element to check of it is visible
     * @param timeout timeout set by the configuration file
     * @returns returns true if the element is visible
     * @returns returns false if the element is not visible
     */
  static async isElementVisible(
    locator,
    timeout = getFiles.config['explicit-wait']
  ) {
    try {
      await this.waitUntilElementIsVisible(locator, timeout);
      return true;
    } catch {
      return false;
    }
  }
  /**
     * Returns true if an element is not located nor visible
     * @param locator locator of the element to look for
     * @returns returns true if the element is not visible
     * @returns returns false if the element visible
     */
  static async isElementNotVisible(locator) {
    loggerService.debug(`Cheking if element is not visible: "${locator.toString()}"`);
    try {
      await DriverManager.driver.findElement(locator);
      return false;
    }
    catch {
      return true;
    }
  }
}

module.exports = WebDriverConditions;