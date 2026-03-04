import { test } from './fixtures/baseTest';

test('login/logout smoke', async ({ loginAsAdmin, dashboardPage, loginPage }) => {
  await test.step('Login as admin', async () => {
    await loginAsAdmin();
  });

  await test.step('Logout', async () => {
    await dashboardPage.logout();
  });

  await test.step('Verify login page is visible', async () => {
    await loginPage.isLoaded();
  });
});