import { getMonthYearKey } from "../helper/dateUtils";
import { describe, test } from "@jest/globals";

describe("getMonthYearKey", () => {
  test("returns correct month, year and key", () => {
    const result = getMonthYearKey("2024-01-15");

    expect(result.month).toBe(0); // January = 0
    expect(result.year).toBe(2024);
    expect(result.key).toBe("2024-1");
  });

  test("works for different dates", () => {
    const result = getMonthYearKey("2023-12-05");

    expect(result).toEqual({
      month: 11, // December = 11
      year: 2023,
      key: "2023-12",
    });
  });

  test("handles invalid date", () => {
    const result = getMonthYearKey("invalid-date");

    expect(result.year).toBeNaN();
    expect(result.month).toBeNaN();
    expect(result.key).toBe("NaN-NaN");
  });

  test("matches snapshot", () => {
    const result = getMonthYearKey("2024-02-20");

    expect(result).toMatchSnapshot();
  });
});
