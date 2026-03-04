import { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  private readonly page: Page;
  private readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('aside.oxd-sidepanel');
  }

  async openAdmin(): Promise<void> {
    await this.sidebar.getByRole('link', { name: /^Admin$/i }).click();
  }

  async openPim(): Promise<void> {
    await this.sidebar.getByRole('link', { name: /^PIM$/i }).click();
  }
}