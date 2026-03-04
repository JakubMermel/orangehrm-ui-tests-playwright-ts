import { test } from '../fixtures/baseTest';
import { feature, story, severity } from '../fixtures/allureMeta';

test.describe('Auth', () => {
  test('login/logout (happy path)', async ({ loginAsAdmin, dashboardPage, loginPage }, testInfo) => {
    feature(testInfo, 'Auth');
    story(testInfo, 'Login');
    severity(testInfo, 'critical');

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

  test('negative login - invalid password', async ({ loginPage }, testInfo) => {
    feature(testInfo, 'Auth');
    story(testInfo, 'Login');
    severity(testInfo, 'critical');

    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Attempt login with invalid password', async () => {
      await loginPage.loginAs(process.env.OHRM_USERNAME!, 'wrongPassword');
    });

    await test.step('Verify invalid credentials error is displayed', async () => {
      await loginPage.expectInvalidCredentials();
    });
  });
});