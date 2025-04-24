import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page';
import ProductPage from '../pageobjects/product.page';

Given(/^I am logged in as "(.*)"$/, async function(username: string) {
    await LoginPage.open();
    await LoginPage.enterUsername(username);
    await LoginPage.enterPassword('secret_sauce');
    await LoginPage.tapLoginButton();
    await LoginPage.verifyHomePageElements();
});

When(/^I add product "(.*)" to cart$/, async function(productName: string) {
    await ProductPage.addProductToCart(productName);
});

Then(/^I should see cart badge with count "(.*)"$/, async function(count: string) {
    await ProductPage.verifyCartBadgeCount(count);
});
