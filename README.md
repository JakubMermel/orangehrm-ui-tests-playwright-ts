OrangeHRM UI Tests - Playwright + TypeScript

This repository contains an automated UI test framework created with Playwright, TypeScript and Playwright Test Runner.

The project was developed as part of an engineering thesis comparing two UI test automation frameworks:

Selenium WebDriver with C# and NUnit
Playwright with TypeScript

Both frameworks cover the same set of test scenarios for the OrangeHRM demo application, allowing a practical comparison of architecture, synchronization, stability, readability and maintenance cost.

Tested Application

The tests are executed against the OrangeHRM demo application:

https://opensource-demo.orangehrmlive.com
Technology Stack
Playwright
TypeScript
Playwright Test Runner
Node.js / npm
Allure Report
Playwright HTML Report
Project Structure
src/
  components/
  config/
  pages/
    admin/
    pim/
  utils/

tests/
  auth/
  admin/
  pim/
  fixtures/
  smoke.spec.ts
Implemented Test Scenarios
Auth
Login and logout
Negative login validation
Admin
Add user
Search user
Edit user status
PIM
Add employee
Search employee
Edit employee middle name
Framework Design

The framework uses a Page Object Model approach combined with Playwright fixtures.

Main design decisions:

Playwright fixtures are used instead of a classic base test class.
Page Objects encapsulate page-level interactions.
Locators follow a container-first strategy to improve stability.
Playwright web-first assertions are used for synchronization.
Test steps are defined with test.step() for readable reports.
Failure attachments include screenshots and page HTML.
Configuration

Environment variables are stored in the .env file.

Example configuration:

OHRM_BASE_URL=https://opensource-demo.orangehrmlive.com
OHRM_USERNAME=Admin
OHRM_PASSWORD=admin123
OHRM_HEADLESS=false

The .env file is ignored by Git.
Use .env.example as a template.

Running Tests

Run all tests:

npm test

Run tests in Playwright UI mode:

npm run test:ui
Playwright HTML Report

Generate and open the Playwright HTML report:

npm test
npm run report
Allure Report

Run tests and generate Allure report:

npm test
npm run allure:generate
npm run allure:open
Notes

During framework development, execution was temporarily limited to Chrome and headed mode to simplify debugging.
Multi-browser and headless execution can be restored in playwright.config.ts.

Engineering Thesis Context

This project is intended for comparison with an equivalent Selenium WebDriver framework implemented in C# and NUnit.

The comparison focuses on:

framework architecture
synchronization mechanisms
locator strategy
test stability
amount of supporting code
reporting capabilities
maintenance cost