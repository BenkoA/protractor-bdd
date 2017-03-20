var footerPage = function() {

    var myAccountButtonLocator = '//div[@id="page2"]//div[@onclick="go(\'account\', \'none\')"]';

    var clickOnMyAccountButton = function(){
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(element(by.xpath(myAccountButtonLocator))), 5000);

        element(by.xpath(myAccountButtonLocator)).click();
    };

    return {
        clickOnMyAccountButton : clickOnMyAccountButton
    };

};

module.exports = new footerPage();