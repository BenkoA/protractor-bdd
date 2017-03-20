var helpers = function () {

    var waitForElement = function(selector, waitFor) {
        waitFor = waitFor || 5000;
        browser.driver.manage().timeouts().implicitlyWait(waitFor);
        browser.driver.findElement(by.xpath(selector));
        browser.driver.manage().timeouts().implicitlyWait(0);
    }

    return {
        waitForElement : waitForElement
    };
};
module.exports = new helpers();