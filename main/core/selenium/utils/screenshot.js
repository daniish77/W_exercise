const logger = require("../../utils/loggerService");

/** 
 * Returns the screenshot buffer
 * @param driver the WebDriver driver for capturing the screenshot.
*/
let take = async (driver) => {
  logger.info("Taking Screenshot");
  const screenshotData = await driver.takeScreenshot();
  const screenshotBuffer = Buffer.from(screenshotData, 'base64');
  return screenshotBuffer;
};

module.exports = take;
