# Sauce Demo Playwright Tests

A complete Playwright test automation project for [https://www.saucedemo.com/](https://www.saucedemo.com/) using the Page Object Model (POM) architecture.

## Project Structure

```
saucedemo-playwright/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts     # Base class with common functionality
│   │   ├── LoginPage.ts    # Login page object
│   │   ├── InventoryPage.ts # Products inventory page object
│   │   ├── CartPage.ts     # Shopping cart page object
│   │   └── CheckoutPage.ts # Checkout page object
│   ├── tests/              # Test specifications
│   │   └── example.spec.ts # Example tests
│   └── fixtures/           # Test fixtures
│       └── test.fixture.ts # Playwright fixtures
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md             # This file
```

## Page Objects Overview

### BasePage
Base class providing common functionality for all pages:
- Page navigation
- Element waits and interactions
- Text retrieval
- Visibility checks

### LoginPage
Login functionality:
- `goto()` - Navigate to login page
- `login(username, password)` - Perform login
- `getErrorMessage()` - Get error messages
- `isErrorDisplayed()` - Check if error is shown

### InventoryPage
Product inventory management:
- `goto()` - Navigate to inventory
- `getProductCount()` - Get number of products
- `getProductNames()` - Get all product names
- `addProductToCart(index)` - Add product by index
- `addProductToCartByName(name)` - Add product by name
- `sortBy(option)` - Sort products
- `goToCart()` - Navigate to cart

### CartPage
Shopping cart operations:
- `goto()` - Navigate to cart
- `getCartItemCount()` - Get items in cart
- `getCartItemNames()` - Get item names
- `getCartItemPrices()` - Get item prices
- `removeItemFromCart(index)` - Remove item by index
- `removeItemByName(name)` - Remove item by name
- `continueShopping()` - Continue shopping
- `proceedToCheckout()` - Go to checkout

### CheckoutPage
Checkout process:
- `gotoCheckout()` - Navigate to checkout
- `fillCheckoutInfo(firstName, lastName, postalCode)` - Fill checkout form
- `continueCheckout()` - Continue to review
- `finishCheckout()` - Complete order
- `getItemTotal()` - Get item total
- `getTaxTotal()` - Get tax amount
- `getGrandTotal()` - Get grand total

## Installation

1. **Install dependencies:**
```bash
npm install
```

## Running Tests

- **Run all tests:**
```bash
npm test
```

- **Run tests in UI mode (recommended for debugging):**
```bash
npm run test:ui
```

- **Run tests in headed mode (browser visible):**
```bash
npm run test:headed
```

- **Debug tests:**
```bash
npm run test:debug
```

- **Generate tests with Codegen:**
```bash
npm run codegen
```

## Test Credentials

The Sauce Demo site provides test users:
- **Username:** `standard_user`
- **Password:** `secret_sauce`

Other test users available:
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`

## Configuration

Edit `playwright.config.ts` to customize:
- Base URL
- Test directory
- Reporters
- Browser configurations
- Timeouts
- Retry settings

## Test Structure

Tests are organized by feature:
- **Login Tests** - Authentication and error handling
- **Inventory Tests** - Product listing and cart operations
- **Shopping Cart Tests** - Cart management
- **Checkout Tests** - Order completion process

Each test group includes a `beforeEach` hook that performs necessary setup (login, adding items, etc.).

## CI/CD Integration

The project is configured to run in CI environments. Set `CI=true` environment variable to:
- Run tests on all configured browsers
- Retry failed tests
- Use single worker
- Generate HTML report

## Troubleshooting

- **Tests timing out:** Increase timeout in `playwright.config.ts`
- **Navigation fails:** Check baseURL configuration
- **Selectors not found:** Update selectors in page object files
- **Screenshot/trace issues:** Check `test-results/` directory for artifacts

## Further Reading

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Sauce Demo Documentation](https://saucelabs.com/resources/articles/selenium-tutorial-demo-sauce-labs)