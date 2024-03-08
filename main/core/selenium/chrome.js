const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

/**
   * Sets the chrome options for the webdriver
   * @param configurations the capabilities set by the configuration.json file
   * @returns returns an instance for a Chrome webdriver
   */
const Chrome = async (configurations) => {
  let options = new chrome.Options();
  if(configurations){
    if (configurations.headless) options.headless();
    options.excludeSwitches("enable-automation");
    if (!configurations.maximizedWindow) {
      options.windowSize(configurations.windowSize);
    } 
    if(configurations.setAlertBehavior){
      options.setAlertBehavior(configurations.setAlertBehavior);
    }
  }
  let driver = await new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
  return driver;
};

module.exports = Chrome;