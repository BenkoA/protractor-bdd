Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  In order to run my E2E tests

#  Scenario: Protractor and Cucumber Test
#    Given I go to "https://angularjs.org/"
#    When I add "Be Awesome" in the task field
#    And I click the add button
#    Then I should see my new task in the list


  Scenario: Try to Login on Staging
    Given I go to "https://mobile-staging.tipdev.com/"
    When I click the Login button
    And I login with username "protractor_mt_test" and password "tester123"
    Then I should see the "Protractor Mttest" name in the header