import { describe, expect, it } from "vitest";
import { FirebaseError } from "firebase/app";
import { getAuthErrorMessage } from "./getAuthErrorMessage";

describe("getAuthErrorMessage", () => {
  it("maps a known Firebase code to our text", () => {
    const err = new FirebaseError("auth/invalid-credential", "library text");
    expect(getAuthErrorMessage(err)).toBe("Incorrect email or password.");
  });

  it("uses the fallback for an unknown Firebase code", () => {
    const err = new FirebaseError("auth/something-new", "library text");
    expect(getAuthErrorMessage(err)).toBe("Something went wrong. Try again.");
  });

  it("uses the fallback for a non-Firebase error", () => {
    expect(getAuthErrorMessage(new Error("boom"))).toBe(
      "Something went wrong. Try again.",
    );
  });
});
