import type { Beam } from "@/engine/structures/beam/types";

export type BeamValidationResult = {
  isValid: boolean;
  isLengthValid: boolean;
  areSupportPositionsValid: boolean;
  hasValidSupportCount: boolean;
  hasOnePinSupport: boolean;
  hasOneRollerSupport: boolean;
  areSupportPositionsDistinct: boolean;
};

export function validateBeamLength(length: number): boolean {
  return Number.isFinite(length) && length > 0;
}

export function validateSupportPosition(
  position: number,
  beamLength: number,
): boolean {
  return Number.isFinite(position) && position >= 0 && position <= beamLength;
}

export function validateBeam(beam: Beam): BeamValidationResult {
  // check that the beam has a valid positive length
  const isLengthValid = validateBeamLength(beam.length);

  // check that every support is located somewhere on the beam
  const areSupportPositionsValid =
    isLengthValid &&
    beam.supports.every((support) =>
      validateSupportPosition(support.position, beam.length),
    );

  // current beam model requires exactly two supports
  const hasValidSupportCount = beam.supports.length === 2;

  // count how many pin supports are in the beam
  const pinSupportCount = beam.supports.filter(
    (support) => support.type === "pin",
  ).length;

  // count how many roller supports are in the beam
  const rollerSupportCount = beam.supports.filter(
    (support) => support.type === "roller",
  ).length;

  // simply supported beam requires exactly one pin
  const hasOnePinSupport = pinSupportCount === 1;

  // simply supported beam requires exactly one roller
  const hasOneRollerSupport = rollerSupportCount === 1;

  // no two supports should occupy the same position
  const supportPositions = beam.supports.map((support) => support.position);

  const uniqueSupportPositions = new Set(supportPositions);

  const areSupportPositionsDistinct =
    uniqueSupportPositions.size === supportPositions.length;

  // beam is only valid if every required rule passes
  const isValid =
    isLengthValid &&
    areSupportPositionsValid &&
    hasValidSupportCount &&
    hasOnePinSupport &&
    hasOneRollerSupport &&
    areSupportPositionsDistinct;

  return {
    isValid,
    isLengthValid,
    areSupportPositionsValid,
    hasValidSupportCount,
    hasOnePinSupport,
    hasOneRollerSupport,
    areSupportPositionsDistinct,
  };
}
