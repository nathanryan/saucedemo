import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class InventoryPage extends BasePage {
  // Selectors
  readonly inventoryContainer = '.inventory_list';
  readonly inventoryItem = '.inventory_item';
  readonly productName = '.inventory_item_name';
  readonly addToCartButton = 'button[data-test*="add-to-cart"]';
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '.shopping_cart_link';
  readonly sortDropdown = '.product_sort_container';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto('inventory.html');
  }

  async getProductCount(): Promise<number> {
    const products = await this.page.locator(this.inventoryItem).count();
    return products;
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.page.locator(this.productName).allTextContents();
    return names;
  }

  async addProductToCart(productIndex: number): Promise<void> {
    const buttons = await this.page.locator(this.addToCartButton);
    await buttons.nth(productIndex).click();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const productItem = this.page.locator(this.inventoryItem).filter({
      has: this.page.locator(this.productName, { hasText: productName }),
    });
    await productItem.locator(this.addToCartButton).click();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.getText(this.cartBadge);
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async sortBy(option: string): Promise<void> {
    await this.click(this.sortDropdown);
    await this.click(`option[value="${option}"]`);
  }

  async isInventoryDisplayed(): Promise<boolean> {
    return await this.isVisible(this.inventoryContainer);
  }
}
