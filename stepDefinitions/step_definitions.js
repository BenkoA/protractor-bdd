var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var {defineSupportCode} = require('cucumber');

defineSupportCode(({Given, When, Then, setDefaultTimeout}) => {

    setDefaultTimeout(60 * 1000);

    Given(/^I go to "([^"]*)"$/, function(site, callback) {
        browser.get(site);
        var loadingWindow = '//div[@id="loading"]';
        var EC=protractor.ExpectedConditions;

        browser.driver.wait(EC.not(EC.presenceOf(element(by.xpath(loadingWindow)))), 20000);
        expect((element(by.xpath(loadingWindow))).isPresent()).to.eventually.equal(false)
            .and.notify(callback);
    });

    When(/^I add "([^"]*)" in the task field$/, function(task) {
        element(by.model('todoList.todoText')).sendKeys(task);
    });

    When(/^I click the add button$/, function() {
        var el = element(by.css('[value="add"]'));
        el.click();
    });

    Then(/^I should see my new task in the list$/, function(callback) {
        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).to.eventually.equal(3);
        expect(todoList.get(2).getText()).to.eventually.equal('Be Awesome')
            .and.notify(callback);
    });

    When(/^I click the Login button$/, function() {
        var loginItemLocator = '//div[@onclick="go(\'login\')" and not(contains(@class, \'hidden\'))]/div';

        waitForElement(loginItemLocator, 5000);
        expect((element(by.xpath(loginItemLocator))).isPresent()).to.eventually.equal(true);
        element(by.xpath(loginItemLocator)).click();
    });

    Then(/^I login with username "([^"]*)" and password "([^"]*)"$/, function(username, password) {
        var userInput = element(by.name('username'));
        var passwordInput = element(by.name('password'));
        var loginButton = element(by.className('submit'));

        waitForElement('//div[@id="page2"]//input[@name="username"]',2000);
        userInput.sendKeys(username);
        passwordInput.sendKeys(password);
        loginButton.click();
    });

    Then(/^I should see the "([^"]*)" name in the header$/, function(username) {
        var myAccountButton = '//div[@id="page2"]//div[@onclick="go(\'account\', \'none\')"]';
        //waitForElement(myAccountButton, 2000);
        //element(by.xpath(myAccountButton)).click();

        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(element(by.xpath(myAccountButton))), 5000);
        element(by.xpath(myAccountButton)).click();


        var personalDetails_login = '//div[@id="page1"]//div[@class="bartitle"]';
        waitForElement(personalDetails_login,2000);
        expect(element(by.xpath(personalDetails_login)).getText()).to.eventually.equal(username);
    });


    var waitForElement = function(selector, waitFor) {
        waitFor = waitFor || 5000;
        browser.driver.manage().timeouts().implicitlyWait(waitFor);
        browser.driver.findElement(by.xpath(selector));
        browser.driver.manage().timeouts().implicitlyWait(0);
    }

});
