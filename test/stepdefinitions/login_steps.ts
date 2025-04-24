import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page';

Given(/^I am on the login page$/, async function() {
    await LoginPage.open();
});

When(/^I enter username "([^"]*)"$/, async function(username: string) {
    await LoginPage.enterUsername(username);
});

When(/^I enter password "([^"]*)"$/, async function(password: string) {
    await LoginPage.enterPassword(password);
});

When(/^I tap the login button$/, async function() {
    await LoginPage.tapLoginButton();
});

Then(/^I verify "([^"]*)" login result$/, async function(type: string) {
    if (type === 'homepage') {
        await LoginPage.verifyHomePageElements();
    } else if (type === 'invalid_password') {
        await LoginPage.verifyInvalidPassword('Username and password do not match any user in this service.');
    } else if (type === 'locked_user') {
        await LoginPage.verifyErrorMessage('Sorry, this user has been locked out.');
    }
});