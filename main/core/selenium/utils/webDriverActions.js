const DriverManager = require("../driverManager");
const loggerService = require("./../../utils/loggerService");
const conditions = require("./webDriverConditions");
const screenShot = require("./screenshot")

/**
   * Creates a web driver actions class
   */
class WebDriverActions {
/**
 * Constructor that receives an object with an attach function
 */
  constructor({attach}){
    this.attach = attach;
  }

  /**
    * Returns the captures a screenshot with Webdriver
    */
  static async takeScreenshot() {
    try {
      const screenshotData = await screenShot(DriverManager.driver);
      loggerService.info("Screenshot");
      return screenshotData;
    } catch (error) {
      loggerService.error('Error:', error);
    }
  }

  /**
   * Returns a web element to perform other actions
   * @param locator
   */
  static async getWebElement(locator) {
    loggerService.debug(`Getting element: "${locator}"`);
    await conditions.waitUntilElementIsLocated(locator);
    await conditions.waitUntilElementIsVisible(locator);
    return await DriverManager.driver.findElement(locator);
  }
  /**
   * Returns a web element to perform other actions
   * @param locator
   */
  static async getWebElements(locator) {
    loggerService.debug(`Getting elements by: "${locator}"`);
    await conditions.waitUntilElementIsLocated(locator);
    await conditions.waitUntilElementIsVisible(locator);
    return await DriverManager.driver.findElements(locator);
  }
  /**
   * Executes click on an element
   * @param locator
   */
  static async clickOn(locator) {
    loggerService.debug(`Clicking on: "${locator.toString()}" `);
    const element = await WebDriverActions.getWebElement(locator);
    await element.click();
  }
  /**
   * Gets text from a locator
   * @param locator
   */
  static async getText(locator) {
    const element = await WebDriverActions.getWebElement(locator);
    return await element.getText();
  }
  /**
   * Adds a new value in an input
   * @param locator
   * @param value
   */
  static async setText(locator, value) {
    loggerService.debug(`Setting "${value}" text on: "${locator.toString()}"`);
    const element = await WebDriverActions.getWebElement(locator);
    await element.clear();
    await element.sendKeys(value);
  }
  /**
   * Gets a defined element attribute by the element locator
   * @param locator locator of the web element
   * @param value attribute to get
   */
  static async getElementAttribute(locator,value) {
    const attribute=await this.getWebElement(locator);
    return await attribute.getAttribute(value);
  }
  /**
   * Scrolls an element into view
   * @param locator
   */
  static async scrollIntoView(locator) {
    loggerService.debug(`Scrolling element into view: "${locator.toString()}"`);
    const element = await WebDriverActions.getWebElement(locator);
    await DriverManager.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
  /**
   * Returns the current url of a Pivotal website
   */
  static async getCurrentUrl() {
    return await DriverManager.driver.getCurrentUrl();
  }
  /**
 * Performs a "drag and drop" action from one element to another target element.
 * @param sourceLocator - The locator of the element to be dragged.
 * @param targetLocator - The locator of the destination where it will be dropped.
 */
  static async dragAndDrop(sourceLocator, targetLocator) {
    const sourceElement = await WebDriverActions.getWebElement(sourceLocator);
    const targetElement = await WebDriverActions.getWebElement(targetLocator);
    const actionsDriver = DriverManager.driver.actions();
    await actionsDriver.dragAndDrop(sourceElement, targetElement).perform();
  }
}

module.exports = WebDriverActions;