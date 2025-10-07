# Smoke test Demoblaze

In test we go through essential elements of a website (https://www.demoblaze.com/) and check that they are visible and usable

Smoke test checks:

- All navbar links visible
- Contact modal elements visible
- About Us modal elements visible
- Cart view elements visible
- Login works and Logout works
- Sign Up modal elements
- Footer element visibles
- Home content elements visible
- Place product to cart and remove from cart

## How to run tests

You need latests nodejs

- clone repo
- run `npm install`
- run all tests: `npx playwright test`
  - playwright should give you information in terminal if need to install anything else (especially if you have not run playwright on your machine before)
