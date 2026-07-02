import React from "react";
import { render, screen } from "@testing-library/react";
import Notification from "../components/Notification";
import { describe, test } from "@jest/globals";

describe("Notification", () => {
  test("renders notification message", () => {
    render(<Notification message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("renders danger alert", () => {
    render(<Notification message="Error occurred" />);

    const alertElement = screen.getByText("Error occurred");

    expect(alertElement).toHaveClass("alert-danger");
  });

  test("renders without crashing when message is not passed", () => {
    render(<Notification message="" />);

    expect(document.body).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Notification message="Failed to fetch data" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
