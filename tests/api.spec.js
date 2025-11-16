import { test, expect } from "@playwright/test";

test.describe("API-тесты для Restful-booker", () => {
  const baseURL = "https://restful-booker.herokuapp.com";
  // TODO: Надо добавить USER, DATES чтобы менять данные сразу во всех тестах
  test("Создание бронирования", async ({ request }) => {
    const postData = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    };
    const response = await request.post(`${baseURL}/booking`, {
      data: postData,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("bookingid");
    const bookingid = responseBody["bookingid"];
    expect(responseBody["booking"]).toEqual(postData);
  });
  test("Получение информации о бронировании", async ({ request }) => {});
  test("Обновление бронирования", async ({ request }) => {});
  test("Удаление бронирования", async ({ request }) => {});
});
