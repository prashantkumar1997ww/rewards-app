import { fetchTransactions } from "../services/api";
import { describe, test, jest, beforeEach, expect } from "@jest/globals";

// mock logger
jest.mock("../helper/logger", () => {
  const { fn } = require("@jest/globals").jest;

  return {
    logger: fn(),
  };
});

import { logger } from "../helper/logger";

const mockFetchResponse = (response) =>
  (global.fetch = jest.fn(() => Promise.resolve(response)));

const mockFetchReject = (error) =>
  (global.fetch = jest.fn(() => Promise.reject(error)));

describe("fetchTransactions API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("returns data when API call is successful", async () => {
    mockFetchResponse({
      ok: true,
      json: () =>
        Promise.resolve({
          mockTransactions: [{ id: 1, amount: 100 }],
        }),
    });

    const result = await fetchTransactions();

    expect(result).toEqual([{ id: 1, amount: 100 }]);
    expect(fetch).toHaveBeenCalledWith("/db.json");
  });

  test("throws error when response is not ok", async () => {
    mockFetchResponse({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchTransactions()).rejects.toThrow(
      "HTTP 500: Internal Server Error",
    );

    expect(logger).toHaveBeenCalledWith(
      "error",
      "API fetch failed",
      expect.any(Error),
    );
  });

  test("throws error when mockTransactions is missing", async () => {
    mockFetchResponse({
      ok: true,
      json: () => Promise.resolve({}), // no mockTransactions
    });

    await expect(fetchTransactions()).rejects.toThrow(
      "No transaction data found",
    );

    expect(logger).toHaveBeenCalled();
  });

  test("throws error when fetch fails", async () => {
    mockFetchReject(new Error("Network error"));

    await expect(fetchTransactions()).rejects.toThrow("Network error");

    expect(logger).toHaveBeenCalledWith(
      "error",
      "API fetch failed",
      expect.any(Error),
    );
  });

  test("matches snapshot for success response", async () => {
    mockFetchResponse({
      ok: true,
      json: () =>
        Promise.resolve({
          mockTransactions: [{ id: 1, amount: 100 }],
        }),
    });

    const result = await fetchTransactions();

    expect(result).toMatchSnapshot();
  });
});
