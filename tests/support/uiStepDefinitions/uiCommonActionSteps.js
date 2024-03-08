const { Given, When, Then } = require('@cucumber/cucumber');
const loginPage=require("../../../main/SUT/ui/components/login/loginPage");
const getFiles = require("./../../../main/core/utils/getFiles");
const userOptionsModal = require('../../../main/SUT/ui/components/homePage/homePage');

Given,When('the user logs in to Swag Labs as {string}', async function (role) {
  const url =getFiles.environment['ui-url'];
  await loginPage.login(url,getFiles.environment['users'][role.toLowerCase()]['username'],getFiles.environment['users'][role.toLowerCase()]['password']);
});

Then('the user logs out', async function () {
  await userOptionsModal.logoutSession();
});
