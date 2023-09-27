import { test, expect } from '@playwright/test';
const { DateTime } = require('luxon')

test('find trains from NYP to WAS', async ({ page }) => {
  await page.goto('https://amtrak.com/');
  await expect(page).toHaveTitle(/Amtrak/);
  await page.getByRole('button', { name: 'Allow All' }).click()
  await page.getByRole('button', { name: 'close button' }).click()
  await expect(page).toHaveURL(/home.html/)
  const today = DateTime.now()
  const threeDaysFromNow = DateTime.now().plus({ days: 3 })
  await page.getByTestId('fare-finder-from-station-field-page').getByRole('combobox', {name: 'From'}).fill('NYP')
  await page.getByTestId('fare-finder-from-station-field-page').getByRole('combobox', {name: 'From'}).click()
  await page.getByTestId('fare-finder-to-station-field-page').getByRole('combobox', {name: 'To'}).fill('WAS')
  await page.getByTestId('fare-finder-to-station-field-page').getByRole('combobox', {name: 'To'}).click()
  await page.getByRole('textbox', { name: 'Depart Date' }).click()
  await page.waitForTimeout(1000)
  await page.getByRole('gridcell', {name: today.toLocaleString(DateTime.DATE_HUGE)}).click()
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Done' }).click()
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Return Date' }).click()
  await page.waitForTimeout(1000)
  await page.getByRole('gridcell', {name: threeDaysFromNow.toLocaleString(DateTime.DATE_HUGE)}).click()
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Done' }).click()
  await page.waitForTimeout(4000)
  await page.getByRole('button', { name: 'FIND TRAINS' }).click()
  await page.waitForTimeout(5000)
  await expect(page).toHaveTitle(/Select Your Trip/)
});
