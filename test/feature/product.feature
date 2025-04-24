@product
Feature: Product Functionality

  Scenario: As a user, I want to add product to cart and verify cart badge
    Given I am logged in as "standard_user"
    When I add product "Sauce Labs Backpack" to cart
    Then I should see cart badge with count "1"