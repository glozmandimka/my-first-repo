import { test, expect } from "@playwright/test";

test.describe.serial("API-тесты для Restful-booker", () => {
  const BASE_URL = "https://restful-booker.herokuapp.com";
  let bookingId;
  let authToken;
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
  const UPDATED_BOOKING_DATA = {
    firstname: "Kim",
    lastname: "Brown",
    totalprice: 151,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  test("Создание бронирования", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: BOOKING_DATA,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("bookingid");
    bookingId = responseBody.bookingid;
    expect(responseBody.booking).toEqual(BOOKING_DATA);
  });

  test("Получение информации о бронировании", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(BOOKING_DATA);
  });

  test("Обновление бронирования", async ({ request }) => {
    const authResponse = await request.post(`${BASE_URL}/auth`, {
      data: { username: "admin", password: "password123" },
    });
    expect(authResponse.status()).toBe(200);
    const authResponseBody = await authResponse.json();
    expect(authResponseBody).toHaveProperty("token");
    authToken = authResponseBody.token;
    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: UPDATED_BOOKING_DATA,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(UPDATED_BOOKING_DATA);
  });

  test("Удаление бронирования", async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });
    expect(response.status()).toBe(201);
    const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
});
