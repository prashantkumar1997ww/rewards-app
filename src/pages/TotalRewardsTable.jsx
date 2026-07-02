/**
 * Component to display a table of total rewards for each customer.
 * Uses the DataTable component for rendering the table.
 * Expects an array of objects with customerName and rewardPoints properties.
 */

import React from "react";
import DataTable from "../components/DataTable";
import PropTypes from "prop-types";

const TOTAL_REWARDS_COLUMNS = [
  { key: "customerName", label: "Customer Name" },
  { key: "rewardPoints", label: "Total Reward Points" },
];

const TotalRewardsTable = ({ totalRewardsData }) => {

  return (
    <>
      <h2>Total Rewards</h2>
      <DataTable
        inputId="totalRewards"
        columns={TOTAL_REWARDS_COLUMNS}
        data={totalRewardsData}
      />
    </>
  );
};

TotalRewardsTable.propTypes = {
  totalRewardsData: PropTypes.arrayOf(
    PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TotalRewardsTable;
