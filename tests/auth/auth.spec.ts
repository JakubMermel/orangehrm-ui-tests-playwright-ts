import { test, expect } from '../fixtures/baseTest';

test.describe('Auth', () => {
  test('login/logout (happy path)', async ({ loginAsAdmin, dashboardPage, loginPage }) => {
    await loginAsAdmin();

    await dashboardPage.logout();
    await loginPage.isLoaded();
  });

  test('negative login - invalid password', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginAs(process.env.OHRM_USERNAME!, 'wrongPassword');
    await loginPage.expectInvalidCredentials();
  });
});