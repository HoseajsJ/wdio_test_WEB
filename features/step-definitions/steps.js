const { Given, When, Then } = require('@wdio/cucumber-framework');

// Background
Given(/^I open the SauceDemo login page$/, () => {
    browser.url('https://www.saucedemo.com/');
});

// Login steps
When(/^I enter "([^"]*)" and "([^"]*)" on SauceDemo$/, (username, password) => {
    $('#user-name').setValue(username);
    $('#password').setValue(password);
    $('#login-button').click();
});

Then(/^I should be redirected to the products page$/, () => {
    expect(browser).toHaveUrlContaining('inventory.html');
});

Then(/^I should see an error message$/, () => {
    expect($('.error-message-container')).toBeDisplayed();
});

// Reusable login step for standard user
Given(/^I login as "([^"]*)" with "([^"]*)"$/, (username, password) => {
    browser.url('https://www.saucedemo.com/');
    $('#user-name').setValue(username);
    $('#password').setValue(password);
    $('#login-button').click();
    expect(browser).toHaveUrlContaining('inventory.html');
});

// Add and remove products from cart
When(/^I add the "([^"]*)" to the cart$/, (productName) => {
    const product = $$('div.inventory_item').find(item => 
        item.$('.inventory_item_name').getText() === productName);
    product.$('button.btn_primary').click();
});

When(/^I remove the "([^"]*)" from the cart$/, (productName) => {
    const product = $$('div.inventory_item').find(item => 
        item.$('.inventory_item_name').getText() === productName);
    product.$('button.btn_secondary').click();
});

Then(/^I should see "(\d+)" item in the cart$/, (itemCount) => {
    expect($('.shopping_cart_badge')).toHaveText(itemCount);
});

Then(/^I should see the cart is empty$/, () => {
    expect($('.shopping_cart_badge')).not.toBeDisplayed();
});

// View cart page
When(/^I navigate to the cart page$/, () => {
    $('.shopping_cart_link').click();
});

Then(/^I should see "([^"]*)" in the cart$/, (productName) => {
    const cartItem = $$('div.cart_item').find(item => 
        item.$('.inventory_item_name').getText() === productName);
    expect(cartItem).toBeDisplayed();
});

// Logout
When(/^I log out$/, () => {
    $('#react-burger-menu-btn').click();
    browser.pause(1000);  // Wait for the menu to open
    $('#logout_sidebar_link').click();
});

Then(/^I should be redirected to the login page$/, () => {
    expect(browser).toHaveUrl('https://www.saucedemo.com/');
});
