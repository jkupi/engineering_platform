import { describe, expect, it } from "vitest";
import type { Beam } from "./types";
import { validateBeam } from "./validation";

describe("validateBeam", () => {
  it("accepts a valid beam", () => {
    const beam: Beam = {
      length: 6,
      leftSupportPosition: 0,
      rightSupportPosition: 6,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(true);
    expect(result.isLengthValid).toBe(true);
    expect(result.isLeftSupportValid).toBe(true);
    expect(result.isRightSupportValid).toBe(true);
    expect(result.isSupportOrderValid).toBe(true);
  });

  it("accepts valid support positions inside the beam", () => {
    const beam: Beam = {
      length: 6,
      leftSupportPosition: 1,
      rightSupportPosition: 5,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(true);
  });

  it("rejects a zero beam length", () => {
    const beam: Beam = {
      length: 0,
      leftSupportPosition: 0,
      rightSupportPosition: 0,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a negative beam length", () => {
    const beam: Beam = {
      length: -6,
      leftSupportPosition: 0,
      rightSupportPosition: 0,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a left support before the beam", () => {
    const beam: Beam = {
      length: 6,
      leftSupportPosition: -1,
      rightSupportPosition: 5,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLeftSupportValid).toBe(false);
  });

  it("rejects a right support beyond the beam", () => {
    const beam: Beam = {
      length: 6,
      leftSupportPosition: 1,
      rightSupportPosition: 7,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isRightSupportValid).toBe(false);
  });

  it("rejects reversed support positions", () => {
    const beam: Beam = {
      length: 6,
      leftSupportPosition: 5,
      rightSupportPosition: 2,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLeftSupportValid).toBe(true);
    expect(result.isRightSupportValid).toBe(true);
    expect(result.isSupportOrderValid).toBe(false);
  });

  it("rejects a non-finite beam length", () => {
    const beam: Beam = {
      length: Number.NaN,
      leftSupportPosition: 0,
      rightSupportPosition: 6,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a blank beam length after form conversion", () => {
    const blankInput = "";

    const beam: Beam = {
      length: Number(blankInput),
      leftSupportPosition: 0,
      rightSupportPosition: 6,
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });
});
