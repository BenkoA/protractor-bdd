var helpers = require('../helpers/helpers');

var loginPage = function() {

    var userInput = element(by.name('username'));
    var userInputLocator = '//div[@id="page2"]//input[@name="username"]';
    var passwordInput = element(by.name('password'));
    var loginButton = element(by.className('submit'));

    var loginWithUsernameAndPassword = function(username, password){
        helpers.waitForElement(userInputLocator,2000);

        userInput.sendKeys(username);
        passwordInput.sendKeys(password);

        loginButton.click();
    };

    return {
        loginWithUsernameAndPassword : loginWithUsernameAndPassword
    };

};

module.exports = new loginPage();