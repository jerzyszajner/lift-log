import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  test("shows and hides the password with the button", async () => {
    render(<PasswordInput aria-label="Password" />);

    const input = screen.getByLabelText("Password");
    expect(input.getAttribute("type")).toBe("password");

    await userEvent.click(screen.getByRole("button"));
    expect(input.getAttribute("type")).toBe("text");

    await userEvent.click(screen.getByRole("button"));
    expect(input.getAttribute("type")).toBe("password");
  });
});
