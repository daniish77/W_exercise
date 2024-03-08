@ui @login @functional @wip
Feature: Login
  Test performed on UI page Swag Labs

  Scenario: The user can successfully log in with valid credentials
    When the user logs in to Swag Labs as "user"
    Then the user logs out
