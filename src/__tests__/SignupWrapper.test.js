import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignupWrapper from "../components/Signup";
import LeftSectionPreview from "../components/Signup/LeftSectionPreview";
import RightSectionPreview from "../components/Signup/RightSectionPreview";
import Header from "../components/Signup/Header";

jest.mock("../components/Signup/LeftSectionPreview");
jest.mock("../components/Signup/RightSectionPreview");
jest.mock("../components/Signup/Header");

describe("SignupWrapper", () => {
  test("renders Header component", () => {
    const { getByText } = render(<SignupWrapper />);
    expect(Header).toHaveBeenCalled();
  });

  test("renders LeftSectionPreview component", () => {
    const { getByText } = render(<SignupWrapper />);
    expect(LeftSectionPreview).toHaveBeenCalled();
  });

  test("renders RightSectionPreview component", () => {
    const { getByText } = render(<SignupWrapper />);
    expect(RightSectionPreview).toHaveBeenCalled();
  });

  test("renders Grid components with correct class names", () => {
    const { container } = render(<SignupWrapper />);
    const leftSideGrid = container.querySelector(".left-side-grid");
    const rightSideGrid = container.querySelector(".right-side-grid");
    expect(leftSideGrid).toBeInTheDocument();
    expect(rightSideGrid).toBeInTheDocument();
  });

  test("left side grid has correct props", () => {
    const { container } = render(<SignupWrapper />);
    const leftSideGrid = container.querySelector(".left-side-grid");
    expect(leftSideGrid).toHaveStyle("padding: 20px");
    expect(leftSideGrid).toHaveClass("MuiGrid-grid-xs-12");
    expect(leftSideGrid).toHaveClass("MuiGrid-grid-xl-6");
    expect(leftSideGrid).toHaveClass("MuiGrid-grid-sm-12");
    expect(leftSideGrid).toHaveClass("MuiGrid-grid-md-6");
  });

  test("right side grid has correct styles and props", () => {
    const { container } = render(<SignupWrapper />);
    const rightSideGrid = container.querySelector(".right-side-grid");
    expect(rightSideGrid).toHaveStyle("overflow-y: auto");
    expect(rightSideGrid).toHaveStyle("height: 100vh");
    expect(rightSideGrid).toHaveClass("MuiGrid-grid-xs-12");
    expect(rightSideGrid).toHaveClass("MuiGrid-grid-xl-6");
    expect(rightSideGrid).toHaveClass("MuiGrid-grid-sm-12");
    expect(rightSideGrid).toHaveClass("MuiGrid-grid-md-6");
  });
});
