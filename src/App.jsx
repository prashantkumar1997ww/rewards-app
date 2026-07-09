/**
 * Main application component for the Rewards Dashboard.
 * Fetches transaction data, calculates rewards, and renders tables for transactions, monthly rewards, and total rewards.
 * Handles loading and error states gracefully.
 */

import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchTransactions } from "./services/api";
import TransactionsTable from "./pages/TransactionsTable";
import MonthlyRewardsTable from "./pages/MonthlyRewardsTable";
import TotalRewardsTable from "./pages/TotalRewardsTable";
import Loader from "./components/Loader";
import Notification from "./components/Notification";
import {
  calculateRewardPoints,
  calculateMonthlyPoints,
  calculateTotalRewardPoints,
} from "./helper/rewardUtils";

function App() {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const transactions = await fetchTransactions();
      const rewardPoints = calculateRewardPoints(transactions);
      setTransactionData(rewardPoints);
    } catch (err) {
      setError({
        message: "Failed to fetch data",
        details: err,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // combine first and last name into customerName for easier display in tables
  const tableData = useMemo(() => {
    return transactionData?.map((item) => ({
      ...item,
      customerName: `${item.firstname} ${item.lastname}`,
    }));
  }, [transactionData]);

  // filter the transactions to only include those from the last 3 months based on the latest transaction date
  const last3MonthsData = useMemo(() => {
    if (!tableData?.length) return [];

    const lastTransaction = tableData?.reduce((latest, item) => {
      return new Date(item.purchaseDate) > new Date(latest.purchaseDate) ? item : latest;
    });

    const latestDate = new Date(lastTransaction.purchaseDate);

    const threeMonthsAgo = new Date(latestDate);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return tableData.filter((row) => {
      const purchaseDate = new Date(row.purchaseDate);

      return purchaseDate >= threeMonthsAgo && purchaseDate <= latestDate;
    });
  }, [tableData]);

  const monthlyRewards = useMemo(() => {
    return calculateMonthlyPoints(last3MonthsData);
  }, [last3MonthsData]);

  const totalRewards = useMemo(() => {
    return calculateTotalRewardPoints(last3MonthsData);
  }, [last3MonthsData]);

  if (loading) return <Loader />;

  if (error) {
    return <Notification message={error.message} />;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Rewards Dashboard</h1>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <TransactionsTable transactionData={last3MonthsData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <MonthlyRewardsTable monthlyRewardsData={monthlyRewards} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <TotalRewardsTable totalRewardsData={totalRewards} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
