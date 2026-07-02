/**
 * Simulates async API call.
 * Returns an array of transactions.
 */

import { logger } from "../helper/logger";

export const fetchTransactions = async () => {
  try {
    const res = await fetch("/db.json");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    if (
      !Array.isArray(data.mockTransactions) ||
      data.mockTransactions.length === 0
    ) {
      throw new Error("No transaction data found");
    }

    return data.mockTransactions;
  } catch (error) {
    logger("error", "API fetch failed", error);
    throw error;
  }
};
