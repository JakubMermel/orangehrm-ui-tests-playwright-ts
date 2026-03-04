import { test } from '../fixtures/baseTest';
import { uniqueId } from '../../src/utils/data';
import { PimEmployeesPage } from '../../src/pages/pim/pim-employees.page';

test.describe('PIM', () => {
  test('add employee, search employee, edit middle name', async ({ page, loginAsAdmin }) => {
    await loginAsAdmin();

    const pim = new PimEmployeesPage(page);
    await pim.open();

    const firstName = 'John';
    const lastName = uniqueId('Doe');
    const middleName1 = 'A';
    const middleName2 = 'B';

    await pim.addEmployee({ firstName, middleName: middleName1, lastName });

    await pim.open();

    await pim.searchByEmployeeName(`${firstName} ${lastName}`);
    await pim.openFirstResult();
    await pim.editMiddleName(middleName2);
  });
});