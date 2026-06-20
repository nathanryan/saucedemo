import { test, expect } from '../fixtures/test.fixture';

test.describe('Login Tests', () => {
  test('should display login page', async ({ loginPage }) => {
    await loginPage.goto();
    const isVisible = await loginPage.isLoginButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('should login with valid credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const isInventoryDisplayed = await inventoryPage.isInventoryDisplayed();
    expect(isInventoryDisplayed).toBe(true);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });
});

test.describe('Inventory Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForElement(inventoryPage.inventoryContainer);
  });

  test('should display products on inventory page', async ({ inventoryPage }) => {
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should get product names', async ({ inventoryPage }) => {
    const productNames = await inventoryPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames[0]).toBeTruthy();
  });

  test('should add product to cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(0);
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe('1');
  });

  test('should add product by name to cart', async ({ inventoryPage }) => {
    const productNames = await inventoryPage.getProductNames();
    const firstProduct = productNames[0];
    await inventoryPage.addProductToCartByName(firstProduct);
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe('1');
  });
});

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    // Login and add items to cart
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForElement(inventoryPage.inventoryContainer);
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);
    await cartPage.goto();
  });

  test('should display items in cart', async ({ cartPage }) => {
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test('should display correct item names in cart', async ({ cartPage }) => {
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames.length).toBe(2);
  });

  test('should remove item from cart', async ({ cartPage }) => {
    await cartPage.removeItemFromCart(0);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('should continue shopping from cart', async ({ cartPage, inventoryPage }) => {
    await cartPage.continueShopping();
    const isInventoryDisplayed = await inventoryPage.isInventoryDisplayed();
    expect(isInventoryDisplayed).toBe(true);
  });
});

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    // Login, add items, and go to cart
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForElement(inventoryPage.inventoryContainer);
    await inventoryPage.addProductToCart(0);
    await cartPage.goto();
  });

  test('should proceed to checkout from cart', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForElement(checkoutPage.firstNameInput);
    const isVisible = await checkoutPage.isVisible(checkoutPage.firstNameInput);
    expect(isVisible).toBe(true);
  });

  test('should complete checkout process', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    const completeHeaderVisible = await checkoutPage.isCompleteHeaderVisible();
    expect(completeHeaderVisible).toBe(true);
  });

  test('should display order totals on checkout', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await checkoutPage.continueCheckout();
    const itemTotal = await checkoutPage.getItemTotal();
    const taxTotal = await checkoutPage.getTaxTotal();
    const grandTotal = await checkoutPage.getGrandTotal();
    expect(itemTotal).toBeTruthy();
    expect(taxTotal).toBeTruthy();
    expect(grandTotal).toBeTruthy();
  });
});
