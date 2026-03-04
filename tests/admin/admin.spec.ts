import { test } from '../fixtures/baseTest';
import { uniqueId } from '../../src/utils/data';
import { AdminUsersPage } from '../../src/pages/admin/admin-users.page';

test.describe('Admin', () => {
  test('add user, search user, edit status', async ({ page, loginAsAdmin }) => {
    await loginAsAdmin();

    const adminUsers = new AdminUsersPage(page);
    await adminUsers.open();

    const username = uniqueId('user');
    const password = 'P@ssw0rd123!';

    await adminUsers.addUser({
      userRole: 'Admin',
      employeeName: 'Amelia Brown',
      status: 'Enabled',
      username,
      password,
    });

    await adminUsers.searchByUsername(username);
    await adminUsers.expectUserExists(username);

    await adminUsers.openEditForUser(username);
    await adminUsers.setStatus('Disabled');

    await adminUsers.searchByUsername(username);
    await adminUsers.expectUserExists(username);
  });
});