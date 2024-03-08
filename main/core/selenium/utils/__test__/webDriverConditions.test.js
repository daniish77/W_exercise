const { default: expect } = require('expect');
const driverManager=require('../../driverManager');
const conditions=require('../webDriverConditions');
const { By } = require("selenium-webdriver");


describe('Unit test for the Web Driver Conditions Class', function(){

  it('Should be able to wait until a determined web element is located', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const webElementLocator=By.id("title");
    let wasLocated=true;
    await driverManager.driver.get(url);
    try{
      await conditions.waitUntilElementIsLocated(webElementLocator);
    } catch{
      wasLocated=false;
    }
    await  driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeTruthy();
  });

  it('Should fail when a defined web element is not located', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const wrongWebElementLocator=By.id("NoObject");
    let wasLocated=true;
    await driverManager.driver.get(url);
    try{
      await conditions.waitUntilElementIsLocated(wrongWebElementLocator);
    } catch{
      wasLocated=false;
    }
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeFalsy();
  });

  it('Should be able to wait until a determined web element is visible', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const webElementLocator=By.id("title");
    let wasLocated=true;
    await driverManager.driver.get(url);
    try{
      await conditions.waitUntilElementIsVisible(webElementLocator);
    } catch{
      wasLocated=false;
    }
    await  driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeTruthy();
  });

  it('Should fail when a defined web element is not visible', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const wrongWebElementLocator=By.id("NoObject");
    let wasLocated=true;
    await driverManager.driver.get(url);
    try{
      await conditions.waitUntilElementIsVisible(wrongWebElementLocator);
    } catch{
      wasLocated=false;
    }
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeFalsy();
  });

  it('Should return true when a web element is visible', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const webElementLocator=By.id("title");
    await driverManager.driver.get(url);
    let wasLocated=await conditions.isElementVisible(webElementLocator);
    await  driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeTruthy();
  });

  it('Should return false when a web element is not visible', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const wrongWebElementLocator=By.id("NoObject");
    await driverManager.driver.get(url);
    let wasLocated=await conditions.isElementVisible(wrongWebElementLocator);
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeFalsy();
  });

  it('Should return true when a web element is not visible', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const wrongWebElementLocator=By.id("NoObject");
      
    await driverManager.driver.get(url);
    let wasLocated=await conditions.isElementNotVisible(wrongWebElementLocator);
    await  driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeTruthy();
  });

  it('Should return false when a web element is visible', async function() {
    await driverManager.init();
    const url="http://uitestingplayground.com/";
    const webElementLocator=By.id("title");
    await driverManager.driver.get(url);
    let wasLocated=await conditions.isElementNotVisible(webElementLocator);
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(wasLocated).toBeFalsy();
  });
});
