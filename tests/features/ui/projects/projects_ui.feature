@ui @homepage @functional @wip
Feature: Home Page

  Test performed on the Home page

  @2
  Scenario: The user can review all the items displayed on the home page
    Given the user logs in to Swag Labs as "user"
    And the home page should display the following elements:
      | Sauce Labs Backpack      |
      | Sauce Labs Bike Light    |
      | Sauce Labs Bolt T-Shirt  |
      | Sauce Labs Fleece Jacket |
      | Sauce Labs Onesie        |
    Then the user logs out

  @3
  Scenario: The user can select an item to the shopping cart
    Given the user logs in to Swag Labs as "user"
    And the user selects the "Sauce Labs Backpack"
    And the user adds to the cart
    And the user goes to the cart page
    Then the user checks the price of the item
    And the user logs out

