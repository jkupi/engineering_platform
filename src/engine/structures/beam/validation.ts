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
