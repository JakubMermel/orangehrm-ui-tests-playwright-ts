import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  loginAsAdmin: () => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  loginAsAdmin: async ({ loginPage, dashboardPage }, use) => {
    await use(async () => {
      await loginPage.open();
      await loginPage.loginAs(process.env.OHRM_USERNAME!, process.env.OHRM_PASSWORD!);
      await expect(dashboardPage.header()).toBeVisible();
    });
  },
});

export { expect };