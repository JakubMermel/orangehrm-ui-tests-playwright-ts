import { test } from './fixtures/baseTest';
import { feature, story, severity } from './fixtures/allureMeta';

test('login/logout smoke', async ({ loginAsAdmin, dashboardPage, loginPage }, testInfo) => {
  feature(testInfo, 'Smoke');
    story(testInfo, 'Smoke');
    severity(testInfo, 'normal');

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