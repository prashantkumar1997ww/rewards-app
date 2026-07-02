import React from "react";
import { render, screen } from "@testing-library/react";
import TotalRewardsTable from "../pages/TotalRewardsTable";
import { describe, test } from "@jest/globals";

describe("TotalRewardsTable", () => {
  const mockTotalRewardsData = [
    {
      customerName: "John Doe",
      rewardPoints: 100,
    },
  ];

  test("renders heading", () => {
    render(<TotalRewardsTable totalRewardsData={mockTotalRewardsData} />);

    expect(
      screen.getByRole("heading", {
        name: /total rewards/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders customer reward data", () => {
    render(<TotalRewardsTable totalRewardsData={mockTotalRewardsData} />);

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();

    expect(screen.getByText("100")).toBeInTheDocument();
  });

  test("renders column headers", () => {
    render(<TotalRewardsTable totalRewardsData={mockTotalRewardsData} />);

    expect(screen.getByText(/customer name/i)).toBeInTheDocument();

    expect(screen.getByText(/reward points/i)).toBeInTheDocument();
  });
});
