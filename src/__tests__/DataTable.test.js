import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../components/DataTable";
import { describe, test, jest } from "@jest/globals";

// Mock constant
jest.mock("../constants/constants", () => ({
  ITEMS_PER_PAGE: 5,
}));

const columns = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
];

const mockData = [
  { name: "John", amount: 120 },
  { name: "Jane", amount: 200 },
  { name: "Alex", amount: 150 },
];

describe("DataTable", () => {
  test("renders table with data", () => {
    render(
      <DataTable inputId="search-input" columns={columns} data={mockData} />,
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  test("filters data based on search", () => {
    render(
      <DataTable inputId="search-input" columns={columns} data={mockData} />,
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.queryByText("John")).not.toBeInTheDocument();
  });

  test("sorts data when column header is clicked", () => {
    render(
      <DataTable inputId="search-input" columns={columns} data={mockData} />,
    );

    const header = screen.getByText("Amount");

    fireEvent.click(header);

    const rows = screen.getAllByRole("row");

    // first row after header should be smallest value (120)
    expect(rows[1]).toHaveTextContent("John");
  });

  test("shows empty message when no data", () => {
    render(<DataTable inputId="search-input" columns={columns} data={[]} />);

    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <DataTable inputId="search-input" columns={columns} data={mockData} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
