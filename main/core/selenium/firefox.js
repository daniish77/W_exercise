const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
/**
   * Sets the firefox options for the webdriver
   * @param configurations the capabilities set by the configuration.json file
   * @returns returns an instance for a Firefox webdriver
   */
const Firefox = async (configurations) => {
  let options = new firefox.Options();
  if(configurations){
    if (configurations.headless) options.headless();
    if (!configurations.maximizedWindow) {
      options.windowSize(configurations.windowSize);
    }
    if(configurations.setAlertBehavior){
      options.setAlertBehavior(configurations.setAlertBehavior);
    }
  }
  let driver = await new webdriver.Builder().forBrowser("firefox").setFirefoxOptions(options).build();
  return driver;
};

module.exports = Firefox;
