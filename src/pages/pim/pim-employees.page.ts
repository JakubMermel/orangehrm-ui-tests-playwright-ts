import { expect, Locator, Page } from '@playwright/test';
import { SidebarComponent } from '../../components/sidebar.component';

export class PimEmployeesPage {
  private readonly page: Page;
  private readonly sidebar: SidebarComponent;

  private readonly addButton: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(page);

    this.addButton = page.locator('button:has-text("Add")').first();
    this.searchButton = page.getByRole('button', { name: /^Search$/i });
    this.resetButton = page.getByRole('button', { name: /^Reset$/i });
  }

async open(): Promise<void> {
  await this.sidebar.openPim();

  // Wait until the Employee List view is rendered.
  // URL-based synchronization keeps navigation deterministic and minimal.
  await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/i);

  // The Add button is the next action in the flow, so we wait for it explicitly.
  await expect(this.addButton).toBeVisible();
}

  async addEmployee(data: { firstName: string; middleName?: string; lastName: string }): Promise<void> {
    await this.addButton.click();

    await this.page.getByRole('textbox', { name: /^First Name$/i }).fill(data.firstName);
    if (data.middleName) {
      await this.page.getByRole('textbox', { name: /^Middle Name$/i }).fill(data.middleName);
    }
    await this.page.getByRole('textbox', { name: /^Last Name$/i }).fill(data.lastName);

    await this.page.getByRole('button', { name: /^Save$/i }).click();

    await expect(this.page.getByRole('heading', { name: /personal details/i })).toBeVisible();
  }

  async searchByEmployeeName(name: string): Promise<void> {
    await this.resetButton.click();

    const filters = this.page.locator('.oxd-table-filter');
    const field = filters.locator('.oxd-input-group', { hasText: 'Employee Name' });
    const input = field.locator('input').first();

    await input.fill(name);

    const firstOption = this.page.locator('.oxd-autocomplete-option').first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await this.searchButton.click();
    await expect(this.page.locator('.oxd-table-body')).toBeVisible();
  }

  private firstResultRow(): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-row').first();
  }

async openFirstResult(): Promise<void> {
  const row = this.firstResultRow();
  await expect(row).toBeVisible();

  const link = row.locator('a').first();
  if (await link.count()) {
    await link.click();
  } else {
    // OrangeHRM sometimes renders the row/cell as clickable without an anchor tag.
    await row.locator('.oxd-table-cell').nth(1).click();
  }

  // Personal Details view should be displayed after opening an employee record.
  await expect(this.page.getByRole('heading', { name: /personal details/i })).toBeVisible();
}

  async editMiddleName(newMiddleName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: /^Middle Name$/i }).fill(newMiddleName);
    await this.page.getByRole('button', { name: /^Save$/i }).first().click();

    await expect(this.page.getByRole('heading', { name: /personal details/i })).toBeVisible();
  }
}