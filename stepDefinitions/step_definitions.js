var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var {defineSupportCode} = require('cucumber');

var myAccountPage = require('../pages/myAccountPage');
var loginPage = require('../pages/loginPage');
var homePage = require('../pages/homePage');
var footerPage = require('../pages/footerPage');

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

    /*
     *   Mobile Rebrush Scenario
     */

    When(/^I click the Login button$/, function() {
        homePage.clickOnLoginButton();
    });

    Then(/^I login with username "([^"]*)" and password "([^"]*)"$/, function(username, password) {
        loginPage.loginWithUsernameAndPassword(username, password);
    });

    Then(/^I should see the "([^"]*)" name in the header$/, function(username) {
        footerPage.clickOnMyAccountButton();

        expect((myAccountPage.getName()).getText()).to.eventually.equal(username);
    });


});
