'use strict';
const assert = require('assert');

const Page = require('./page.po.js');

let page = new Page();
let browser = page.createDriver();

browser.get('http://www.ci1-cms.gb.moneysupermarket.com/car-insurance/').then(() => {
    return browser.findElement(page.signInLink).click()
}).then(() => {
    return browser.findElement(page.emailInput).isDisplayed().then((present) => {
        return present;
    });
}, 10000, 'The element does\'t find.').then(() => {
    return browser.findElement(page.emailInput).sendKeys('active@msm.com');
}).then(() => {
    return browser.findElement(page.passwordInput).sendKeys('1234567');
}).then(() => {
    browser.findElement(page.signInButton).click()
}).then(() => {
    return browser.sleep(5000);
}).then(() => {
    browser.findElement(page.userNameLink).getText()
        .then((userName) => {
            return assert.equal(userName, "Hi Active", "-Hi Active");
        });
}).then(() => {
    return browser.findElement(page.recentQuotes).click();
}).then(() => {
    return browser.findElements(page.logoBrands);
}).then((logoBrand) => {
    return logoBrand[1].click();
}).then(() => {
    browser.sleep(5000);
    return browser.findElement(page.goToSiteButton).click();
}).then(() => {
    return browser.getAllWindowHandles().then((windowHandles) => {
        assert.equal(windowHandles.length, 2, "Not equal");
        return browser.switchTo().window(windowHandles[0]);
    }).then(() => {
        return browser.navigate().back();
    })
}).then(() => {
    browser.quit();
});
