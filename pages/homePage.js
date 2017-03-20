var helpers = require('../helpers/helpers');

var homePage = function() {

    var loginItemLocator = '//div[@onclick="go(\'login\')" and not(contains(@class, \'hidden\'))]/div';

    var clickOnLoginButton = function(){
        helpers.waitForElement(loginItemLocator, 5000);

        element(by.xpath(loginItemLocator)).click();
    };

    return {
        clickOnLoginButton : clickOnLoginButton
    };

};

module.exports = new homePage();