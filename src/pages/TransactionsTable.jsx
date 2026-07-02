/**
 * Component to display a table of transactions with pagination.
 * Filters transactions to show only those from the last 3 months.
 * Uses the DataTable component for rendering the table and handling pagination.
 */

import React from "react";
import DataTable from "../components/DataTable";
import PropTypes from "prop-types";

const TRANSACTION_COLUMNS = [
  { key: "transactionId", label: "Transaction ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "purchaseDate", label: "Purchase Date" },
  { key: "productPurchased", label: "Product Purchased" },
  { key: "price", label: "Price $" },
  { key: "rewardPoints", label: "Reward Points" },
];

const TransactionsTable = ({ transactionData }) => {

  return (
    <>
      <h2>Transactions</h2>
      <DataTable
        data-testid="datatable"
        inputId="transactions"
        columns={TRANSACTION_COLUMNS}
        data={transactionData}
      />
    </>
  );
};

TransactionsTable.propTypes = {
  transactionData: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      productPurchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TransactionsTable;
