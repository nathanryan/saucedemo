import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
  // Selectors
  readonly cartContainer = '.cart_list';
  readonly cartItem = '.cart_item';
  readonly cartItemName = '.inventory_item_name';
  readonly cartItemPrice = '.inventory_item_price';
  readonly cartItemQuantity = '.cart_quantity';
  readonly removeButton = 'button[data-test*="remove"]';
  readonly continueShoppingButton = '#continue-shopping';
  readonly checkoutButton = '#checkout';
  readonly cartBadge = '.shopping_cart_badge';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto('cart.html');
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.page.locator(this.cartItem).count();
    return items;
  }

  async getCartItemNames(): Promise<string[]> {
    const names = await this.page.locator(this.cartItemName).allTextContents();
    return names;
  }

  async getCartItemPrices(): Promise<string[]> {
    const prices = await this.page.locator(this.cartItemPrice).allTextContents();
    return prices;
  }

  async removeItemFromCart(itemIndex: number): Promise<void> {
    const removeButtons = await this.page.locator(this.removeButton);
    await removeButtons.nth(itemIndex).click();
  }

  async removeItemByName(itemName: string): Promise<void> {
    const cartItem = this.page.locator(this.cartItem).filter({
      has: this.page.locator(this.cartItemName, { hasText: itemName }),
    });
    await cartItem.locator(this.removeButton).click();
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async isCartEmpty(): Promise<boolean> {
    const itemCount = await this.getCartItemCount();
    return itemCount === 0;
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.checkoutButton);
  }
}
