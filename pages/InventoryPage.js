export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator("[data-test='title']");
    this.cartIcon = page.locator("[data-test='shopping-cart-link']");
    this.productItems = page.locator("[data-test='inventory-item']");
    this.addToCartButtons = page.locator(".btn_primary");
    this.sortDropdown = page.locator("select.product_sort_container");
  }
  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption("hilo");
  }

  async getFirstItemName() {
    const firstItem = this.productItems.first();
    return firstItem.locator(".inventory_item_name").textContent();
  }

  async addItemToCart(itemName) {
    const itemContainer = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: itemName }),
    });
    await itemContainer.locator(".btn_primary").click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getPageTitle() {
    return this.pageTitle.textContent();
  }
}
