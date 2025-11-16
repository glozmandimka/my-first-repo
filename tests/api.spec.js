import { test, expect } from "@playwright/test";

test.describe.serial("API-тесты для Restful-booker", () => {
  const baseURL = "https://restful-booker.herokuapp.com";
  let bookingId;
  const BOOKING_DATA = {
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
  test("Создание бронирования", async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: BOOKING_DATA,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("bookingid");
    bookingId = responseBody.bookingid;
    expect(responseBody.booking).toEqual(BOOKING_DATA);
  });
  test("Получение информации о бронировании", async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(BOOKING_DATA);
  });
  test("Обновление бронирования", async ({ request }) => {});
  test("Удаление бронирования", async ({ request }) => {});
});
