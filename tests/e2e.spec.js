import { test, expect } from "@playwright/test";
import { UserFactory } from "../test-data/UserFactory.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";

const STANDARD_USER_LOGIN = "standard_user";
const STANDARD_USER_PASSWORD = "secret_sauce";
const EXPECTED_PAGE_TITLE = "Products";
const EXPECTED_SUCCESS_MESSAGE = "Thank you for your order!";

test("Buying the most expensive item", { tag: "@ui" }, async ({ page }) => {
  const user = UserFactory.createUser(
    STANDARD_USER_LOGIN,
    STANDARD_USER_PASSWORD
  );
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login(user.login, user.password);
  await expect(inventoryPage.pageTitle).toHaveText(EXPECTED_PAGE_TITLE);

  await inventoryPage.sortByPriceHighToLow();
  const mostExpensiveItemName = await inventoryPage.getFirstItemName();
  await inventoryPage.addItemToCart(mostExpensiveItemName);

  await inventoryPage.openCart();
  const cartItems = await cartPage.getCartItemsList();
  expect(cartItems).toContain(mostExpensiveItemName);

  await cartPage.goToCheckout();
  await checkoutStepOnePage.fillUserInfo(
    user.firstName,
    user.lastName,
    user.postalCode
  );

  await checkoutStepTwoPage.finishCheckout();
  await expect(checkoutCompletePage.completionMessage).toHaveText(
    EXPECTED_SUCCESS_MESSAGE
  );
});
