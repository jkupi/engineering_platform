import type { Beam } from "@/engine/structures/beam/types";

export type BeamValidationResult = {
  isValid: boolean;
  isLengthValid: boolean;
  isLeftSupportValid: boolean;
  isRightSupportValid: boolean;
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
  leftPosition: number,
  rightPosition: number,
): boolean {
  return leftPosition <= rightPosition;
}

export function validateBeam(beam: Beam): BeamValidationResult {
  const isLengthValid = validateBeamLength(beam.length);

  const isLeftSupportValid =
    isLengthValid &&
    validateSupportPosition(beam.leftSupportPosition, beam.length);

  const isRightSupportValid =
    isLengthValid &&
    validateSupportPosition(beam.rightSupportPosition, beam.length);

  const isSupportOrderValid =
    isLeftSupportValid &&
    isRightSupportValid &&
    validateSupportOrder(beam.leftSupportPosition, beam.rightSupportPosition);

  const isValid =
    isLengthValid &&
    isLeftSupportValid &&
    isRightSupportValid &&
    isSupportOrderValid;

  return {
    isValid,
    isLengthValid,
    isLeftSupportValid,
    isRightSupportValid,
    isSupportOrderValid,
  };
}
