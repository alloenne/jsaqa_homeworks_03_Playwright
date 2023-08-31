const { test, expect } = require("@playwright/test");
const { email, password } = require('../user.js');

test("Успешная авторизация", async ({ page }) => {
  
  await page.goto("https://netology.ru/");

  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator('h2')).toContainText("Моё обучение");
});

test("Неуспешная авторизация", async ({ page }) => {
  
  await page.goto("https://netology.ru/");

  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill("password");
  await page.click("text=Войти");  
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText("Вы ввели неправильно логин или пароль");
});
