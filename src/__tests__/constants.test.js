import { ITEMS_PER_PAGE } from "../constants/constants";
import { describe, test, expect } from "@jest/globals";

describe("constants", () => {

  test("ITEMS_PER_PAGE should be 5", () => {
    expect(ITEMS_PER_PAGE).toBe(5);
  });

  test("matches snapshot", () => {
    expect(ITEMS_PER_PAGE).toMatchSnapshot();
  });

});