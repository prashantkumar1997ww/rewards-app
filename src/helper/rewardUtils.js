/**
 * Calculate reward points for a given transaction amount.
 * $0-$50: 0 points
 * $51-$100: 1 point per dollar over $50
 * $101 and above: 2 points per dollar over $100 + 50 points for the first $50 over $50
 * @param {number} amount - The transaction amount.
 * @returns {number} The calculated reward points.
 */

import { getMonthYearKey } from "./dateUtils";

export const getPoints = (amount) => {
  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    return 0;
  }

  if (amount > 100) {
    return Math.floor((amount - 100) * 2 + 50);
  }

  if (amount > 50) {
    return Math.floor(amount - 50);
  }

  return 0;
};

// calculate reward points for each transaction
export const calculateRewardPoints = (transactions) => {
  return transactions.map((item) => ({
    ...item,
    rewardPoints: getPoints(item.price),
  }));
};

// group transactions by month and year
export const calculateMonthlyPoints = (transactions = []) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const grouped = transactions.reduce((acc, item) => {
    const { month, year, key } = getMonthYearKey(item.purchaseDate);

    const mapKey = `${item.customerId}-${key}`;

    if (!acc[mapKey]) {
      acc[mapKey] = {
        customerId: item.customerId,
        customerName: item.customerName,
        month: `${months[month]} ${year}`,
        rewardPoints: 0,
      };
    }

    acc[mapKey].rewardPoints += item.rewardPoints;

    return acc;
  }, {});

  return Object.values(grouped);
};

// calculate total reward points per customer
export const calculateTotalRewardPoints = (transactions = []) => {
  const grouped = transactions.reduce((acc, item) => {
    if (!acc[item.customerId]) {
      acc[item.customerId] = {
        customerName: item.customerName,
        rewardPoints: 0,
      };
    }

    acc[item.customerId].rewardPoints += item.rewardPoints;

    return acc;
  }, {});

  return Object.values(grouped);
};
