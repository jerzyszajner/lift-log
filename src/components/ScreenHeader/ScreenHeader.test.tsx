import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ScreenHeader } from "./ScreenHeader";

describe("ScreenHeader", () => {
  test("shows the title as the page heading between back and action", () => {
    render(
      <ScreenHeader title="Edit day" back={<a href="/">Days</a>}>
        <button type="button">Delete day</button>
      </ScreenHeader>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Edit day" }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Days" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete day" })).toBeTruthy();
  });
});
