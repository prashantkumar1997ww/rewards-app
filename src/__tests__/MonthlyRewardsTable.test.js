import React from "react";
import { render, screen } from "@testing-library/react";
import MonthlyRewardsTable from "../pages/MonthlyRewardsTable";
import { describe, test } from "@jest/globals";

describe("MonthlyRewardsTable", () => {
  const mockMonthlyRewardsData = [
    {
      customerId: 1,
      customerName: "John Doe",
      month: "Jan",
      rewardPoints: 100,
    },
  ];

  test("renders heading", () => {
    render(<MonthlyRewardsTable monthlyRewardsData={mockMonthlyRewardsData} />);

    expect(
      screen.getByRole("heading", {
        name: /monthly rewards/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders table data", () => {
    render(<MonthlyRewardsTable monthlyRewardsData={mockMonthlyRewardsData} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  test("renders table headers", () => {
    render(<MonthlyRewardsTable monthlyRewardsData={mockMonthlyRewardsData} />);

    expect(screen.getByText("Customer ID")).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();
  });
});
