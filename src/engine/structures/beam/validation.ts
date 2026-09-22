import type { Beam } from "@/engine/structures/beam/types";

export type BeamValidationResult = {
  isValid: boolean;
  isLengthValid: boolean;
  areSupportPositionsValid: boolean;
  isSupportOrderValid: boolean;
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

export function validateSupportOrder(
  firstPosition: number,
  secondPosition: number,
): boolean {
  return firstPosition <= secondPosition;
}

export function validateBeam(beam: Beam): BeamValidationResult {
  const isLengthValid = validateBeamLength(beam.length);

  const areSupportPositionsValid =
    isLengthValid &&
    beam.supports.every((support) =>
      validateSupportPosition(support.position, beam.length),
    );

  const isSupportOrderValid =
    beam.supports.length < 2 ||
    validateSupportOrder(beam.supports[0].position, beam.supports[1].position);

  const isValid =
    isLengthValid && areSupportPositionsValid && isSupportOrderValid;

  return {
    isValid,
    isLengthValid,
    areSupportPositionsValid,
    isSupportOrderValid,
  };
}
