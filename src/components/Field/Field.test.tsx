import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  test("links the label, the control and the error", () => {
    render(
      <Field label="Email" error="Enter a valid email">
        {(controlProps) => <input {...controlProps} />}
      </Field>,
    );

    const input = screen.getByLabelText("Email");
    const alert = screen.getByRole("alert");

    expect(alert.textContent).toBe("Enter a valid email");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe(alert.id);
  });

  test("keeps the label linked to the control when it is hidden", () => {
    render(
      <Field label="Exercise name" hideLabel>
        {(controlProps) => <input {...controlProps} />}
      </Field>,
    );

    expect(screen.getByLabelText("Exercise name")).toBeTruthy();
  });

  test("shows no alert and marks the control valid without an error", () => {
    render(
      <Field label="Email">
        {(controlProps) => <input {...controlProps} />}
      </Field>,
    );

    const input = screen.getByLabelText("Email");

    expect(screen.queryByRole("alert")).toBeNull();
    expect(input.getAttribute("aria-invalid")).toBe("false");
    expect(input.getAttribute("aria-describedby")).toBeNull();
  });
});
