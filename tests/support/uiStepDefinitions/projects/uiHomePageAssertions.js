const { Then } = require('@cucumber/cucumber');
const { expect } = require("expect");
const homePage = require('../../../../main/SUT/ui/components/homePage/homePage');

Then("the home page should display the following elements:", async function(table){
  const dataTable = table.transpose().raw()[0];
  const locatedElements=await homePage.displayedElements(dataTable);
  expect(locatedElements).toBeTruthy();
});

Then('the user selects the {string}', async function (element) {
  await homePage.clickOnElement(element);
});

Then('the user checks the price of the item', async function () {
  const locatedElements = await homePage.isDisplayed();
  expect(locatedElements).toBeTruthy();
});