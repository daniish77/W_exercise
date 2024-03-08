const webDriverActions = require('../webDriverActions');
const driverManager = require('../../driverManager');
const { By } = require("selenium-webdriver");

describe('Test for WebDriverActions class', () => {
  it('should initialize attach property', () => {
    const attachValue = 'some attachment';
    const instance = new webDriverActions({ attach: attachValue });
    expect(instance.attach).toBe(attachValue);
  });

  it('should find an element in a WebSite', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    const webElementLocator = By.id("title");
    let result = true;
    await driverManager.driver.get(url);
    try {
      await webDriverActions.getWebElement(webElementLocator); 
    } catch {
      result = false;
    }
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toBeTruthy();
  });

  it('should find elements in a WebSite', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    const webElementLocator = By.id("overview");
    let result = true;
    await driverManager.driver.get(url);
    try {
      await webDriverActions.getWebElements(webElementLocator); 
    } catch {
      result = false;
    }
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toBeTruthy();
  });

  it('should click on an element in a Website', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    await driverManager.driver.get(url);
    const webElementLocator = By.xpath("//a[text()='Dynamic ID']");
    let result = true;
    try {
      await webDriverActions.clickOn(webElementLocator); 
    } catch {
      result = false;
    }
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toBeTruthy();
  });

  it('should get text from an element in a Website', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    await driverManager.driver.get(url);
    const webElementLocator = By.className("blockquote-footer");
    const result = await webDriverActions.getText(webElementLocator);
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toEqual('Aristotle');
  });

  it('should add a new value in an input in a Website', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    await driverManager.driver.get(url);
    const webElementLocator = By.id("newButtonName");
    await webDriverActions.clickOn(By.xpath("//a[text()='Text Input']"));
    await webDriverActions.setText(webElementLocator, "Test setText");
    await webDriverActions.clickOn(By.id('updatingButton'));
    const textInput = await webDriverActions.getText(By.id('updatingButton'));
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(textInput).toEqual('Test setText');
  });

  it('should gets a defined element attribute by the element locator in a Website', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    await driverManager.driver.get(url);
    const webElementLocator = By.className("alert alert-warning");
    const result = await webDriverActions.getElementAttribute(webElementLocator, 'role');
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toEqual('alert');
  });

  it('should scroll an element or a Website', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/scrollbars";
    await driverManager.driver.get(url);
    const webElementLocator = By.id("hidingButton");
    let result = true;
    try{ 
      await webDriverActions.scrollIntoView(webElementLocator);
    } catch {
      result = false;
    }
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toBeTruthy();
  });

  it('should show a current url of a website', async function (){
    await driverManager.init();
    const url = "http://uitestingplayground.com/";
    await driverManager.driver.get(url);
    const result = await webDriverActions.getCurrentUrl();
    await driverManager.driver.quit();
    driverManager.sessionExists=false;
    expect(result).toEqual(url);
  });
});
