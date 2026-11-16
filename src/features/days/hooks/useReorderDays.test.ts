import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useAuth } from "../../auth/hooks/useAuth";
import { moveDay } from "../services/daysService";
import { useReorderDays } from "./useReorderDays";
import type { User } from "firebase/auth";
import type { Day } from "../schemas/daysSchemas";

vi.mock("../../auth/hooks/useAuth");
vi.mock("../services/daysService", () => ({ moveDay: vi.fn() }));

const days: Day[] = [
  { id: "a", name: "Legs", order: 1, exercises: [] },
  { id: "b", name: "Chest", order: 2, exercises: [] },
];

describe("useReorderDays", () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: "user-1" } as User,
      isLoading: false,
    });
    vi.mocked(moveDay).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("announces the move after it is saved", async () => {
    const { result } = renderHook(() => useReorderDays(days));

    await act(() => result.current.move("b", "up"));

    expect(moveDay).toHaveBeenCalledWith("user-1", days, "b", "up");
    expect(result.current.moveMessage).toBe("Chest moved up");
    expect(result.current.moveError).toBe("");
  });

  test("shows our own error and no message when the move fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(moveDay).mockRejectedValue(new Error("firestore failed"));
    const { result } = renderHook(() => useReorderDays(days));

    await act(() => result.current.move("a", "down"));

    expect(result.current.moveError).toBe("Could not move the day. Try again.");
    expect(result.current.moveMessage).toBe("");
  });

  test("clears the message when reorder mode is toggled", async () => {
    const { result } = renderHook(() => useReorderDays(days));
    await act(() => result.current.move("b", "up"));

    act(() => result.current.toggleReordering());

    expect(result.current.moveMessage).toBe("");
    expect(result.current.isReordering).toBe(true);
  });
});
