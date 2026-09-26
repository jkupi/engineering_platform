import { describe, expect, it } from "vitest";
import type { Beam } from "./types";
import { validateBeam } from "./validation";

describe("validateBeam", () => {
  it("accepts a valid beam", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: 0,
        },
        {
          type: "roller",
          position: 6,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(true);
    expect(result.isLengthValid).toBe(true);
    expect(result.areSupportPositionsValid).toBe(true);
    expect(result.hasValidSupportCount).toBe(true);
    expect(result.hasOnePinSupport).toBe(true);
    expect(result.hasOneRollerSupport).toBe(true);
    expect(result.areSupportPositionsDistinct).toBe(true);
  });

  it("accepts valid support positions inside the beam", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: 1,
        },
        {
          type: "roller",
          position: 5,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(true);
    expect(result.areSupportPositionsValid).toBe(true);
    expect(result.areSupportPositionsDistinct).toBe(true);
  });

  it("rejects a zero beam length", () => {
    const beam: Beam = {
      length: 0,
      supports: [
        {
          type: "pin",
          position: 0,
        },
        {
          type: "roller",
          position: 0,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a negative beam length", () => {
    const beam: Beam = {
      length: -6,
      supports: [
        {
          type: "pin",
          position: 0,
        },
        {
          type: "roller",
          position: 0,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a support before the beam", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: -1,
        },
        {
          type: "roller",
          position: 5,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.areSupportPositionsValid).toBe(false);
  });

  it("rejects a support beyond the beam", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: 1,
        },
        {
          type: "roller",
          position: 7,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.areSupportPositionsValid).toBe(false);
  });

  it("rejects a non-finite beam length", () => {
    const beam: Beam = {
      length: Number.NaN,
      supports: [
        {
          type: "pin",
          position: 0,
        },
        {
          type: "roller",
          position: 6,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a blank beam length after form conversion", () => {
    const blankInput = "";

    const beam: Beam = {
      length: Number(blankInput),
      supports: [
        {
          type: "pin",
          position: 0,
        },
        {
          type: "roller",
          position: 6,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.isLengthValid).toBe(false);
  });

  it("rejects a beam with a missing support", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: 0,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.hasValidSupportCount).toBe(false);
  });

  it("rejects duplicate pin supports", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: 0,
        },
        {
          type: "pin",
          position: 6,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.hasValidSupportCount).toBe(true);
    expect(result.hasOnePinSupport).toBe(false);
    expect(result.hasOneRollerSupport).toBe(false);
  });

  it("rejects duplicate roller supports", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "roller",
          position: 0,
        },
        {
          type: "roller",
          position: 6,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.hasValidSupportCount).toBe(true);
    expect(result.hasOnePinSupport).toBe(false);
    expect(result.hasOneRollerSupport).toBe(false);
  });

  it("rejects supports at the same position", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "pin",
          position: 3,
        },
        {
          type: "roller",
          position: 3,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(false);
    expect(result.areSupportPositionsDistinct).toBe(false);
  });

  it("accepts reversed support array order", () => {
    const beam: Beam = {
      length: 6,
      supports: [
        {
          type: "roller",
          position: 6,
        },
        {
          type: "pin",
          position: 0,
        },
      ],
    };

    const result = validateBeam(beam);

    expect(result.isValid).toBe(true);
    expect(result.isLengthValid).toBe(true);
    expect(result.areSupportPositionsValid).toBe(true);
    expect(result.hasValidSupportCount).toBe(true);
    expect(result.hasOnePinSupport).toBe(true);
    expect(result.hasOneRollerSupport).toBe(true);
    expect(result.areSupportPositionsDistinct).toBe(true);
  });
});
