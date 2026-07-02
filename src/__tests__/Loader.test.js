import React from "react";
import { render } from "@testing-library/react";
import Loader from "../components/Loader";
import { describe, test } from "@jest/globals";

describe("Loader", () => {
  test("renders loader component", () => {
    const { container } = render(<Loader />);

    // spinner exists
    const spinner = container.querySelector(".spinner-border");

    expect(spinner).toBeInTheDocument();
  });

  test("renders loader with correct classes", () => {
    const { container } = render(<Loader />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("text-center");
    expect(wrapper).toHaveClass("mt-5");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Loader />);

    expect(asFragment()).toMatchSnapshot();
  });
});
