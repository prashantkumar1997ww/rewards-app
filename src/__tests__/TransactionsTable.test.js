import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsTable from "../pages/TransactionsTable";
import { describe, test } from "@jest/globals";

describe("TransactionsTable", () => {
  const mockTransactionData = [
    {
      transactionId: 1,
      id: 1,
      customerId: 1,
      customerName: "John Doe",
      firstname: "John",
      lastname: "Doe",
      productPurchased: "Laptop",
      purchaseDate: "2024-01-10",
      price: 120,
      amount: 120,
      rewardPoints: 50,
    },
    {
      transactionId: 2,
      id: 2,
      customerId: 102,
      customerName: "Jane Doe",
      firstname: "Jane",
      lastname: "Doe",
      productPurchased: "Phone",
      purchaseDate: "2026-01-01",
      price: 500,
      amount: 500,
      rewardPoints: 50,
    },
  ];

  test("renders heading", () => {
    render(<TransactionsTable transactionData={mockTransactionData} />);

    expect(
      screen.getByRole("heading", {
        name: /transactions/i,
      }),
    ).toBeInTheDocument();
  });

  test("passes data to DataTable", () => {
    render(<TransactionsTable transactionData={mockTransactionData} />);

    expect(screen.getByTestId("datatable")).toHaveTextContent("John Doe");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <TransactionsTable transactionData={mockTransactionData} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
