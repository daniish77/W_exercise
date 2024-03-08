const { When } = require('@cucumber/cucumber');
const homePage = require('../../../../main/SUT/ui/components/homePage/homePage');
const actions = require('../../../../main/core/selenium/utils/webDriverActions');

When("the user adds to the cart", async function() {
  await actions.clickOn(homePage.addToCartButton);
});

When("the user goes to the cart page", async function() {
  await actions.clickOn(homePage.shoppingCartButton);
});