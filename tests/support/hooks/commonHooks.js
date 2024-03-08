const { After, Before, AfterAll, Status } = require("@cucumber/cucumber");
const loggerService=require('../../../main/core/utils/loggerService');
const driverManager = require("../../../main/core/selenium/driverManager");
const actions = require('../../../main/core/selenium/utils/webDriverActions');

Before(function (scenario) {
  loggerService.info(`Starting: ${scenario.pickle.name}`);
});

Before( async function () {
  await driverManager.init();
});

AfterAll(async function () {
  await driverManager.driver.quit();
  loggerService.info('All windows were closed')
});

After(function (scenario) {
  loggerService.info(
    `${scenario.result.status.toUpperCase()}: ${scenario.pickle.name}`
  );
});

After({tags:'@ui'}, async function (scenario){
  if(scenario.result?.status === Status.FAILED) {
    const screenShot = await actions.takeScreenshot();
    this.attach(screenShot, 'image/png');
  }
});