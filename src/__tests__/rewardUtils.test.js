import {
  getPoints,
  calculateRewardPoints,
  calculateMonthlyPoints,
  calculateTotalRewardPoints,
} from "../helper/rewardUtils";
import { describe, test } from "@jest/globals";

describe("rewardUtils", () => {
  // getPoints
  test("calculates points correctly", () => {
    expect(getPoints(120)).toBe(90);
    expect(getPoints(70)).toBe(20);
    expect(getPoints(30)).toBe(0);
  });

  test("returns 0 for invalid input", () => {
    expect(getPoints(-10)).toBe(0);
    expect(getPoints("100")).toBe(0);
  });
  // calculateRewardPoints
  test("adds rewardPoints to transactions", () => {
    const input = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Test Product",
        purchaseDate: "2024-01-01",
        price: 120,
      },
    ];

    const result = calculateRewardPoints(input);

    expect(result[0].rewardPoints).toBe(90);
  });

  test("matches snapshot for calculateRewardPoints", () => {
    const input = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Test Product",
        purchaseDate: "2024-01-01",
        price: 120,
      },
      {
        transactionId: 2,
        customerId: 2,
        customerName: "Jane Doe",
        firstname: "Jane",
        lastname: "Doe",
        productPurchased: "Test Product",
        purchaseDate: "2024-01-02",
        price: 70,
      },
    ];

    const result = calculateRewardPoints(input);

    expect(result).toMatchSnapshot();
  });
  // calculateMonthlyPoints
  test("groups data by month and customer", () => {
    const data = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Laptop",
        purchaseDate: "2024-01-10",
        price: 120,
        rewardPoints: 50,
      },
      {
        transactionId: 2,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Phone",
        purchaseDate: "2024-01-15",
        price: 80,
        rewardPoints: 30,
      },
    ];

    const result = calculateMonthlyPoints(data);

    expect(result[0].rewardPoints).toBe(80);
    expect(result[0].customerName).toBe("John Doe");
    expect(result[0].month).toBe("January 2024");
  });

  test("matches snapshot for calculateMonthlyPoints", () => {
    const data = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Laptop",
        purchaseDate: "2024-01-10",
        price: 120,
        rewardPoints: 50,
      },
    ];

    const result = calculateMonthlyPoints(data);

    expect(result).toMatchSnapshot();
  });
  // calculateTotalRewardPoints
  test("calculates total rewardPoints per customer", () => {
    const data = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Laptop",
        purchaseDate: "2024-01-10",
        price: 120,
        rewardPoints: 50,
      },
      {
        transactionId: 2,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Phone",
        purchaseDate: "2024-01-15",
        price: 80,
        rewardPoints: 30,
      },
    ];

    const result = calculateTotalRewardPoints(data);

    expect(result[0].rewardPoints).toBe(80);
    expect(result[0].customerName).toBe("John Doe");
  });

  test("matches snapshot for calculateTotalRewardPoints", () => {
    const data = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "John Doe",
        firstname: "John",
        lastname: "Doe",
        productPurchased: "Laptop",
        purchaseDate: "2024-01-10",
        price: 120,
        rewardPoints: 50,
      },
    ];

    const result = calculateTotalRewardPoints(data);

    expect(result).toMatchSnapshot();
  });
});
