/**
 * Component to display a table of monthly rewards for each customer.
 * Uses the DataTable component for rendering the table.
 * Expects an array of objects with customerId, customerName, month, year, and rewardPoints properties.
 */

import React from "react";
import DataTable from "../components/DataTable";
import PropTypes from "prop-types";

const MONTHLY_REWARDS_COLUMNS = [
  { key: "customerId", label: "Customer ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "month", label: "Month" },
  { key: "rewardPoints", label: "Reward Points" },
];
const MonthlyRewardsTable = ({ monthlyRewardsData }) => {

  return (
    <>
      <h2>Monthly Rewards</h2>
      <DataTable
        inputId="monthlyRewards"
        columns={MONTHLY_REWARDS_COLUMNS}
        data={monthlyRewardsData}
      />
    </>
  );
};

MonthlyRewardsTable.propTypes = {
  monthlyRewardsData: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MonthlyRewardsTable;
