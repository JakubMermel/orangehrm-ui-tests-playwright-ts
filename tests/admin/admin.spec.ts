import { test } from '../fixtures/baseTest';
import { uniqueId } from '../../src/utils/data';
import { AdminUsersPage } from '../../src/pages/admin/admin-users.page';

test.describe('Admin', () => {
  test('add user, search user, edit status', async ({ page, loginAsAdmin }) => {
    const adminUsers = new AdminUsersPage(page);

    const username = uniqueId('user');
    const password = 'P@ssw0rd123!';

    await test.step('Login as admin', async () => {
      await loginAsAdmin();
    });

    await test.step('Open Admin -> Users page', async () => {
      await adminUsers.open();
    });

    await test.step(`Add new user: ${username}`, async () => {
      await adminUsers.addUser({
        userRole: 'Admin',
        employeeName: 'Amelia Brown',
        status: 'Enabled',
        username,
        password,
      });
    });

    await test.step('Search created user by username', async () => {
      await adminUsers.searchByUsername(username);
      await adminUsers.expectUserExists(username);
    });

    await test.step('Open user edit view', async () => {
      await adminUsers.openEditForUser(username);
    });

    await test.step('Change status to Disabled and save', async () => {
      await adminUsers.setStatus('Disabled');
    });

    await test.step('Verify user is still present after status change', async () => {
      await adminUsers.searchByUsername(username);
      await adminUsers.expectUserExists(username);
    });
  });
});