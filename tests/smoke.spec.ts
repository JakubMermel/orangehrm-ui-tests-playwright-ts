import { test, expect } from './fixtures/baseTest';

test('login/logout smoke', async ({ loginAsAdmin, dashboardPage, loginPage }) => {
  await loginAsAdmin();
  await dashboardPage.logout();
  await loginPage.isLoaded();
});