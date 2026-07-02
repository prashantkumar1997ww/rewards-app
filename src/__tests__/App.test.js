import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import * as api from "../services/api";
import { describe, test, jest, afterEach } from "@jest/globals";

jest.mock("../services/api");

const mockedFetchTransactions = jest.mocked(api.fetchTransactions);

describe("App Component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const today = new Date().toISOString().split("T")[0];

  const mockTransactions = [
    {
      transactionId: 1,
      customerId: 101,
      firstname: "John",
      lastname: "Doe",
      customerName: "John Doe",
      productPurchased: "Wireless Mouse",
      price: 120,
      purchaseDate: today,
    },
    {
      transactionId: 2,
      customerId: 102,
      firstname: "Jane",
      lastname: "Smith",
      customerName: "Jane Smith",
      productPurchased: "Keyboard",
      price: 75,
      purchaseDate: today,
    },
  ];

  test("renders loader while API request is pending", () => {
    jest.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders dashboard when API returns 200", async () => {
    mockedFetchTransactions.mockResolvedValue(mockTransactions);

    render(<App />);

    expect(await screen.findByText(/rewards dashboard/i)).toBeInTheDocument();

    expect(screen.getByText(/transactions/i)).toBeInTheDocument();

    expect(screen.getByText(/monthly/i)).toBeInTheDocument();
  });

  test("renders error UI when API returns 400", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => ({}),
    });

    render(<App />);

    expect(
      await screen.findByText(/failed to fetch data/i),
    ).toBeInTheDocument();

    expect(screen.queryByText(/rewards dashboard/i)).not.toBeInTheDocument();
  });

  test("renders error UI when API returns 500", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({}),
    });

    render(<App />);

    expect(
      await screen.findByText(/failed to fetch data/i),
    ).toBeInTheDocument();

    expect(screen.queryByText(/rewards dashboard/i)).not.toBeInTheDocument();
  });

  test("renders error UI when response contains empty data", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => ({
        mockTransactions: [],
      }),
    });

    render(<App />);

    expect(
      await screen.findByText(/failed to fetch data/i),
    ).toBeInTheDocument();
  });

  test("matches snapshot after successful render", async () => {
    mockedFetchTransactions.mockResolvedValue(mockTransactions);

    const { asFragment } = render(<App />);

    await screen.findByText(/rewards dashboard/i);

    expect(asFragment()).toMatchSnapshot();
  });
});
