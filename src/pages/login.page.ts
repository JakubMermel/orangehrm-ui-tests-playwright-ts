import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.getByRole('textbox', { name: /username/i });
    this.password = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });

    this.errorAlert = page.locator('.oxd-alert-content-text');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.username).toBeVisible();
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectInvalidCredentials(): Promise<void> {
    await expect(this.errorAlert).toContainText(/invalid credentials/i);
  }

  async isLoaded(): Promise<void> {
    await expect(this.username).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}