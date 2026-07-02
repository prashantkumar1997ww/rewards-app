/**
 * Extracts month and year from a date string.
 * @param {string} dateStr - The date string to extract month and year from.
 * @returns {{month: number, year: number, key: string}} An object containing month, year, and a combined key for grouping.
 * Used for grouping transactions by month and year in the rewards calculation.
 */
import PropTypes from "prop-types";

export const getMonthYearKey = (dateStr) => {
  const date = new Date(dateStr);

  return {
    month: date.getMonth(),
    year: date.getFullYear(),
    key: `${date.getFullYear()}-${date.getMonth() + 1}`,
  };
};

getMonthYearKey.propTypes = {
  dateStr: PropTypes.string.isRequired,
};
