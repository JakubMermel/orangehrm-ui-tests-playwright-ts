import { test } from '../fixtures/baseTest';
import { uniqueId } from '../../src/utils/data';
import { PimEmployeesPage } from '../../src/pages/pim/pim-employees.page';
import { feature, story, severity } from '../fixtures/allureMeta';

test.describe('PIM', () => {
  test('add employee, search employee, edit middle name', async ({ page, loginAsAdmin }, testInfo) => {
    feature(testInfo, 'PIM');
    story(testInfo, 'Employee management');
    severity(testInfo, 'critical');

    const pim = new PimEmployeesPage(page);

    const firstName = 'John';
    const lastName = uniqueId('Doe');
    const middleName1 = 'A';
    const middleName2 = 'B';

    await test.step('Login as admin', async () => {
      await loginAsAdmin();
    });

    await test.step('Open PIM -> Employee List', async () => {
      await pim.open();
    });

    await test.step(`Add employee: ${firstName} ${lastName}`, async () => {
      await pim.addEmployee({ firstName, middleName: middleName1, lastName });
    });

    await test.step('Return to Employee List', async () => {
      await pim.open();
    });

    await test.step('Search employee by name', async () => {
      await pim.searchByEmployeeName(`${firstName} ${lastName}`);
    });

    await test.step('Open employee details from results', async () => {
      await pim.openFirstResult();
    });

    await test.step(`Edit middle name to "${middleName2}"`, async () => {
      await pim.editMiddleName(middleName2);
    });
  });
});