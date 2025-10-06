import { test, expect } from '@playwright/test';


test.describe('Smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  });

  test('All navbar links visible', async ({ page }) => {
    const navbarLinks = [
      'Home',
      'Contact',
      'About us',
      'Cart',
      'Log in',
      'Sign up',
    ]
    for (const name of navbarLinks) {
      expect(
        page.getByRole('link', { name: name })
      ).toBeVisible();
    }
  });

  test('Contact modal elements', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#exampleModal')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'New message' })).toBeVisible();
    await expect(page.locator('#recipient-email')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Contact Email: Contact Name:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message:' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
    await page.getByRole('dialog', { name: 'New message' }).getByLabel('Close').click();

    await expect(page.locator('#exampleModal')).toBeHidden()
  })

  test('About Us modal elements', async ({ page }) => {
    const modal = page.locator('#videoModal');
    await page.getByRole('link', { name: 'About us' }).click();
    await expect(modal.getByRole('heading', { name: 'About us', exact: true })).toBeVisible();
    await modal.getByText('Close', { exact: true }).click();

    await expect(page.locator('#videoModal')).toBeHidden()
  });

  test('Cart view elements', async ({ page }) => {
    await page.getByRole('link', { name: 'Cart' }).click();

    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Total' })).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible();
  })

  test('Login works', async ({ page }) => {
    const username = 'kissaistuu'
    const password = 'kissaistuu'

    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();

    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);

    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.getByRole('link', { name: `Welcome ${username}` })).toBeVisible();

    await page.getByRole('link', { name: 'Log out' }).click();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });

  test('Sign Up modal elements', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();

    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password:' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();

    await page.getByLabel('Sign up').getByText('Close').click();
  });

  test('Footer elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PRODUCT STORE' })).toBeVisible();
  });

  test('Home content elements visible', async ({ page }) => {
    const carousel = page.locator('#carouselExampleIndicators')
    await expect(carousel).toBeVisible();

    const list = page.locator('.list-group')
    await expect(list.getByRole('link', { name: 'CATEGORIES' })).toBeVisible();
    await expect(list.getByRole('link', { name: 'Phones' })).toBeVisible();
    await expect(list.getByRole('link', { name: 'Laptops' })).toBeVisible();
    await expect(list.getByRole('link', { name: 'Monitors' })).toBeVisible();

    const cardContainer = page.locator('#tbodyid')
    await expect(cardContainer).toBeVisible();

    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
  });

  test('Next and Previous buttons', async ({ page }) => {
    const cards = page.locator('.card'); // multiple elements with .card
    const title = await cards.first().locator('.card-title').innerText();

    await expect(page.getByRole('link', { name: title })).toBeVisible();

    await page.locator('#next2').click();
    await expect(page.getByRole('link', { name: title })).toBeHidden();

    await page.locator('#prev2').click();
    await expect(page.getByRole('link', { name: title })).toBeVisible();
  });


  test('Add first product to cart', async ({ page }) => {
    const cards = page.locator('.card'); // multiple elements with .card
    const title = await cards.first().locator('.card-title').innerText();

    await cards.first().locator('.card-title').click()

    await page.waitForURL('./prod.html**')
    await expect(page.locator('h2.name')).toContainText(title);

    await expect(page.getByText('*includes tax')).toBeVisible();
    await expect(page.locator('#imgp img')).toBeVisible();
    await expect(page.getByText('Product description')).toBeVisible();

    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page.getByRole('cell', { name: title })).toBeVisible();
    await page.getByRole('link', { name: 'Delete' }).click();

    await expect(page.getByRole('cell', { name: title })).toBeHidden();
  })

  test('Place order modal elements', async ({ page }) => {
    const cards = page.locator('.card'); // multiple elements with .card
    const title = await cards.first().locator('.card-title').innerText();

    await cards.first().locator('.card-title').click()

    await page.waitForURL('./prod.html**')
    await expect(page.locator('h2.name')).toContainText(title);

    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    await expect(page.getByRole('cell', { name: title })).toBeVisible();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page.getByRole('heading', { name: 'Place order' })).toBeVisible();
    await page.getByText(/Total: \d+/).click();

    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Country:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'City:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Credit card:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Month:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Year:' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Purchase' })).toBeVisible();
    await page.getByLabel('Place order').getByText('Close').click();
  })

})