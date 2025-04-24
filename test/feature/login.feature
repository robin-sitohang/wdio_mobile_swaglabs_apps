@login
Feature: Login Functionality

  Scenario Outline: As a user, I want to login with different user credentials
    Given I am on the login page
    When I enter username "<username>"
    And I enter password "<password>"
    And I tap the login button
    Then I verify "<type>" login result

    Examples:
      | username        | password     | type             |
      | standard_user   | secret_sauce | homepage         |
      | standard_user   | qwerty       | invalid_password |
      | locked_out_user | secret_sauce | locked_user      |