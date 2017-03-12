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

        browser.driver.wait(EC.not(EC.presenceOf(element(by.xpath(loadingWindow)))), 10000);
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

    When(/^I click the Login button$/, function(callback) {
        var closeModalWindowLocator = '//*[@id="tipico-welcome-promo"]//div[@class="close-modal"]';
        var loginItemLocator = '//div[@onclick="go(\'login\')" and not(contains(@class, \'hidden\'))]/div';

        expect((element(by.xpath(closeModalWindowLocator))).isPresent()).to.eventually.equal(true);
        element(by.xpath(closeModalWindowLocator)).click();

        expect((element(by.xpath(loginItemLocator))).isPresent()).to.eventually.equal(true);
        element(by.xpath(loginItemLocator)).click();
    });

    Then(/^I login with username "([^"]*)" and password "([^"]*)"$/, function(username, password) {
        var userInput = element(by.name('usename'));
        var passwordInput = element(by.name('password'));
        var loginButton = element(by.className('submit'));

        userInput.sendKeys(username);
        passwordInput.sendKeys(password);
        loginButton.click();
    });

    Then(/^I should see the "([^"]*)" name in the header$/, function(callback) {
        var myBetsLocator = '//div[@class="footer-nav"]//div[contains(text(),\'My bets\')]';
        expect(element(by.xpath(myBetsLocator).getText())).to.eventually.equal(username).and.notify(callback);
    });

});
