const { By } = require("selenium-webdriver");
const actions = require("../../../../core/selenium/utils/webDriverActions");
const conditions = require("../../../../core/selenium/utils/webDriverConditions");
const loginPage = require("../login/loginPage");


/**
 * HomePage class for interacting with homepage-related UI elements.
 */
class HomePage {
  /**
   * Initialize the locators for home page elements.
   */
  constructor() {
    this.backpackItemName = By.xpath("//div[text()='Sauce Labs Backpack']");
    this.bikeItemName = By.xpath("//div[text()='Sauce Labs Bike Light']");
    this.boltItemName = By.xpath("//div[text()='Sauce Labs Bolt T-Shirt']");
    this.fleeceItemName = By.xpath("//div[text()='Sauce Labs Fleece Jacket']");
    this.onesieItemName = By.xpath("//div[text()='Sauce Labs Onesie']");
    this.addToCartButton = By.xpath("//button[text()='Add to cart']");
    this.shoppingCartButton = By.xpath("//a[@class='shopping_cart_link']");
    this.price = By.css(".inventory_item_price");
    this.burgerMenuButton = By.xpath("//button[@id='react-burger-menu-btn']");
    this.logoutLink = By.css("#logout_sidebar_link.bm-item.menu-item");
  }

  /**
     * Returns the locators of the elements that are inside the project page.
     */
  homePageElements(){
    return {
      "Sauce Labs Backpack":this.backpackItemName,
      "Sauce Labs Bike Light":this.bikeItemName,
      "Sauce Labs Bolt T-Shirt":this.boltItemName,
      "Sauce Labs Fleece Jacket":this.fleeceItemName,
      "Sauce Labs Onesie":this.onesieItemName,
    }
  }
  /**
       * Returns true if all the elements were located in the
       * project page
       * @param elements Array of elements to check
       */
  async displayedElements(elements){
    const visibleElements = [];
    for (const element of elements) {
      const locator = this.homePageElements()[element];
      await conditions.waitUntilElementIsLocated(locator);
      visibleElements.push(await conditions.isElementVisible(locator))
    }
    return visibleElements.every((isVisible) => isVisible === true);
  }
  /**
   * Sets the total story points locator
   * @param element name of the panel the total story points belong to
   * @returns returns the total story points locator using the name of the panel the story points belong to
   */
  async selectedElement(element){
    return By.xpath(`//div[text()="${element}"]`);
  }
  /**
     * Selects an element in the project
     */
  async clickOnElement(element){
    await conditions.waitUntilElementIsVisible(await this.selectedElement(element));
    await actions.clickOn(await this.selectedElement(element));
  }
  /**
   * Returns true if the elements were located
   */
  async isDisplayed() {
    const visibleElements = [
      await conditions.isElementVisible(this.price),
    ];
    const results = await Promise.all(visibleElements);
    return results.every((isVisible) => isVisible === true);
  }
  /**
 * Logs out from the current session.
 */
  async logoutSession() {
    await conditions.waitUntilElementIsLocated(this.burgerMenuButton);
    await actions.clickOn(this.burgerMenuButton);
    await conditions.waitUntilElementIsLocated(this.logoutLink);
    await actions.clickOn(this.logoutLink);
    loginPage.userLoggedIn = false
  }
}
const homePage = new HomePage();
module.exports = homePage;
