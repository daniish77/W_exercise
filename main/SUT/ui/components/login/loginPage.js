const { By } = require("selenium-webdriver");
const DriverManager = require("../../../../core/selenium/driverManager");
const loggerService= require('../../../../core/utils/loggerService');
const actions= require("../../../../core/selenium/utils/webDriverActions");
/**
   * Creates the login page class
   */
class LoginPage {

  /**
   * Sets the locators for the login class
   */
  constructor() {
    this.userName=By.id("user-name");
    this.password=By.id("password");
    this.logginButton=By.name("login-button");
    this.userLoggedIn=false;
  }
  /**
   * @param url the url that will be used to log in
   * @param username the username to login with
   * @param password the password to login with
   */
  async login(url,username, password) {
    await DriverManager.driver.get(url);
    if(!this.userLoggedIn) {
      await actions.setText(this.userName,username);
      await actions.setText(this.password,password);
      await actions.clickOn(this.logginButton);
      loggerService.info('The user logged into Swag Lab Page');
      this.userLoggedIn=true;
    }
  }
}

const loginPage = new LoginPage();
module.exports = loginPage;