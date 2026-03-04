import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly dashboardHeader: Locator;
  private readonly userDropdown: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeader = page.getByRole('heading', { name: /dashboard/i });

    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: /logout/i });
  }

  header(): Locator {
    return this.dashboardHeader;
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}