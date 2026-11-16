import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { ReorderButtons } from "./ReorderButtons";

function renderButtons(props: {
  isFirst?: boolean;
  isLast?: boolean;
  isDisabled?: boolean;
  onMove?: () => void;
}) {
  render(
    <ReorderButtons
      name="Legs"
      isFirst={props.isFirst ?? false}
      isLast={props.isLast ?? false}
      isDisabled={props.isDisabled ?? false}
      onMove={props.onMove ?? vi.fn()}
    />,
  );
  const [up, down] = screen.getAllByRole("button");
  return { up, down };
}

describe("ReorderButtons", () => {
  test("calls onMove with up and down", async () => {
    const onMove = vi.fn();
    const { up, down } = renderButtons({ onMove });

    await userEvent.click(up);
    await userEvent.click(down);

    expect(onMove).toHaveBeenNthCalledWith(1, "up");
    expect(onMove).toHaveBeenNthCalledWith(2, "down");
  });

  test("disables up for the first day", () => {
    const { up, down } = renderButtons({ isFirst: true });

    expect(up).toBeDisabled();
    expect(down).toBeEnabled();
  });

  test("disables down for the last day", () => {
    const { up, down } = renderButtons({ isLast: true });

    expect(up).toBeEnabled();
    expect(down).toBeDisabled();
  });

  test("disables both while a move is in progress", () => {
    const { up, down } = renderButtons({ isDisabled: true });

    expect(up).toBeDisabled();
    expect(down).toBeDisabled();
  });
});
