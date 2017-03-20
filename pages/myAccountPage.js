var helpers = require('../helpers/helpers');

var myAccountPage = function() {

    var personalDetails_username = '//div[@id="page1"]//div[@class="bartitle"]';

    var getName = function() {
        helpers.waitForElement(personalDetails_username,2000);
        username = element(by.xpath(personalDetails_username));
        return username.getText();
    };

    return {
        getName : getName
    };

};

module.exports = new myAccountPage();