import { describe, expect, test } from "vitest";
import { FirebaseError } from "firebase/app";
import { getAuthErrorMessage } from "./getAuthErrorMessage";

describe("getAuthErrorMessage", () => {
  test("maps a known Firebase code to our text", () => {
    const err = new FirebaseError("auth/invalid-credential", "library text");
    expect(getAuthErrorMessage(err)).toBe("Incorrect email or password.");
  });

  test("maps the email already in use code to our text", () => {
    const err = new FirebaseError("auth/email-already-in-use", "library text");
    expect(getAuthErrorMessage(err)).toBe(
      "An account with this email already exists.",
    );
  });

  test("uses the fallback for an unknown Firebase code", () => {
    const err = new FirebaseError("auth/something-new", "library text");
    expect(getAuthErrorMessage(err)).toBe("Something went wrong. Try again.");
  });

  test("uses the fallback for a non-Firebase error", () => {
    expect(getAuthErrorMessage(new Error("boom"))).toBe(
      "Something went wrong. Try again.",
    );
  });
});
