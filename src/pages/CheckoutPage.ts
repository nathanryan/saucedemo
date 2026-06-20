import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  // Step One Selectors
  readonly firstNameInput = '#first-name';
  readonly lastNameInput = '#last-name';
  readonly postalCodeInput = '#postal-code';
  readonly continueButton = '#continue';
  readonly cancelButton = '#cancel';

  // Step Two Selectors
  readonly finishButton = '#finish';
  readonly itemTotalLabel = '.summary_subtotal_label';
  readonly taxLabel = '.summary_tax_label';
  readonly totalLabel = '.summary_total_label';

  // Complete Selectors
  readonly completeHeader = '.complete-header';
  readonly completeText = '.complete-text';
  readonly backHomeButton = '#back-to-products';

  constructor(page: Page) {
    super(page);
  }

  async gotoCheckout(): Promise<void> {
    await super.goto('checkout-step-one.html');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.click(this.continueButton);
  }

  async finishCheckout(): Promise<void> {
    await this.click(this.finishButton);
  }

  async cancelCheckout(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async getItemTotal(): Promise<string> {
    return await this.getText(this.itemTotalLabel);
  }

  async getTaxTotal(): Promise<string> {
    return await this.getText(this.taxLabel);
  }

  async getGrandTotal(): Promise<string> {
    return await this.getText(this.totalLabel);
  }

  async getCompleteMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }

  async isCompleteHeaderVisible(): Promise<boolean> {
    return await this.isVisible(this.completeHeader);
  }

  async goBackHome(): Promise<void> {
    await this.click(this.backHomeButton);
  }
}
