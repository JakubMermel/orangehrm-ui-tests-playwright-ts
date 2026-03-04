import { expect, Locator, Page } from '@playwright/test';
import { SidebarComponent } from '../../components/sidebar.component';

export class AdminUsersPage {
  private readonly page: Page;
  private readonly sidebar: SidebarComponent;

  // list/search
  private readonly addButton: Locator;
  private readonly usernameSearch: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(page);

    this.addButton = page.locator('button:has-text("Add")').first();
    this.usernameSearch = page
      .locator('.oxd-table-filter .oxd-input-group', { hasText: 'Username' })
      .locator('input')
      .first();
    this.searchButton = page.getByRole('button', { name: /^Search$/i });
    this.resetButton = page.getByRole('button', { name: /^Reset$/i });
  }

      async open(): Promise<void> {
  await this.sidebar.openAdmin();

  // Wait until the Users page is actually rendered.
  // URL check makes the navigation deterministic and keeps the method minimal.
  await expect(this.page).toHaveURL(/\/admin\/viewSystemUsers/i);

  // The Add button is the next action in the flow, so we wait for it explicitly.
  await expect(this.addButton).toBeVisible();
}

  // ------ helpers (dropdown) ------
  private async selectFromDropdown(dropdownLabel: string, optionText: string): Promise<void> {
  const form = this.addUserForm();
  const field = form.locator('.oxd-input-group', { hasText: dropdownLabel });
  const trigger = field.locator('.oxd-select-text');

  await trigger.click();

  const option = this.page.getByRole('option', { name: new RegExp(`^${optionText}$`, 'i') });
  await expect(option).toBeVisible();
  await option.click();

  await expect(trigger).toContainText(new RegExp(optionText, 'i'));
}

private addUserForm(): Locator {
  return this.page.locator('form').first();
}

private inputByLabel(labelText: string): Locator {
  const form = this.addUserForm();
  const field = form.locator('.oxd-input-group', { hasText: labelText });
  return field.locator('input').first();
}

  private async fillEmployeeName(employeeName: string): Promise<void> {
  const field = this.page.locator('.oxd-input-group', { hasText: 'Employee Name' });
  const input = field.getByRole('textbox');

  await input.fill(employeeName);

  const option = this.page.locator('.oxd-autocomplete-option', { hasText: employeeName }).first();
  await expect(option).toBeVisible();
  await option.click();
  await expect(this.page.locator('.oxd-autocomplete-dropdown')).toBeHidden();
}

  // ------ actions ------
  async addUser(data: {
    userRole: 'Admin' | 'ESS';
    employeeName: string;
    status: 'Enabled' | 'Disabled';
    username: string;
    password: string;
  }): Promise<void> {
    await this.addButton.click();

    await this.selectFromDropdown('User Role', data.userRole);
    await this.fillEmployeeName(data.employeeName);
    await this.selectFromDropdown('Status', data.status);

    await this.inputByLabel('Username').fill(data.username);
    await this.inputByLabel('Password').fill(data.password);
    await this.inputByLabel('Confirm Password').fill(data.password);

    await this.page.getByRole('button', { name: /^Save$/i }).click();

    await expect(this.addButton).toBeVisible();
  }

  async searchByUsername(username: string): Promise<void> {
  await this.resetButton.click();

  await expect(this.usernameSearch).toBeVisible();
  await this.usernameSearch.fill(username);

  await this.searchButton.click();
  await expect(this.page.locator('.oxd-table-body')).toBeVisible();
}

  private rowByUsername(username: string): Locator {
    return this.page.locator('.oxd-table-row', { hasText: username }).first();
  }

  async expectUserExists(username: string): Promise<void> {
    await expect(this.rowByUsername(username)).toBeVisible();
  }

async openEditForUser(username: string): Promise<void> {
  const row = this.rowByUsername(username);
  await expect(row).toBeVisible();

  // Click the first action button in the row (Edit).
  await row.locator('button').nth(1).click();
}

async setStatus(status: 'Enabled' | 'Disabled'): Promise<void> {
    await this.selectFromDropdown('Status', status);
    await this.page.getByRole('button', { name: /^Save$/i }).click();
    await expect(this.addButton).toBeVisible();
  }
}