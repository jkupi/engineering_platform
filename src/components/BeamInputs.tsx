"use client";

import { useState } from "react";
import type { Beam } from "@/engine/structures/beam/types";
import {
  validateBeamLength,
  validateSupportOrder,
  validateSupportPosition,
} from "@/engine/structures/beam/validation";

type BeamInputsProps = {
  beam: Beam;
  onBeamChange: (beam: Beam) => void;
};

export default function BeamInputs({ beam, onBeamChange }: BeamInputsProps) {
  const [lengthInput, setLengthInput] = useState(beam.length.toString());

  const [leftSupportInput, setLeftSupportInput] = useState(
    beam.leftSupportPosition.toString(),
  );

  const [rightSupportInput, setRightSupportInput] = useState(
    beam.rightSupportPosition.toString(),
  );

  const parsedLength = Number(lengthInput);
  const parsedLeftSupport = Number(leftSupportInput);
  const parsedRightSupport = Number(rightSupportInput);

  const isLengthValid = lengthInput !== "" && validateBeamLength(parsedLength);

  const isLeftSupportValid =
    leftSupportInput !== "" &&
    validateSupportPosition(parsedLeftSupport, beam.length);

  const isRightSupportValid =
    rightSupportInput !== "" &&
    validateSupportPosition(parsedRightSupport, beam.length);

  const isSupportOrderValid =
    isLeftSupportValid &&
    isRightSupportValid &&
    validateSupportOrder(parsedLeftSupport, parsedRightSupport);

  return (
    <section>
      <h2>Inputs</h2>

      <div>
        <label htmlFor="beam-length">Beam Length</label>

        <input
          id="beam-length"
          type="number"
          min="0.01"
          step="0.01"
          value={lengthInput}
          onChange={(event) => {
            const newInput = event.target.value;

            setLengthInput(newInput);

            const newLength = Number(newInput);

            if (newInput !== "" && validateBeamLength(newLength)) {
              setLeftSupportInput("0");
              setRightSupportInput(newLength.toString());

              onBeamChange({
                ...beam,
                length: newLength,
                leftSupportPosition: 0,
                rightSupportPosition: newLength,
              });
            }
          }}
        />

        <span> m</span>

        {!isLengthValid && <p>Beam length must be greater than 0.</p>}
      </div>

      <div>
        <label htmlFor="left-support-position">Left Support Position</label>

        <input
          id="left-support-position"
          type="number"
          min="0"
          max={beam.length}
          step="0.01"
          value={leftSupportInput}
          onChange={(event) => {
            const newInput = event.target.value;

            setLeftSupportInput(newInput);

            const newPosition = Number(newInput);

            if (
              newInput !== "" &&
              validateSupportPosition(newPosition, beam.length) &&
              validateSupportOrder(newPosition, beam.rightSupportPosition)
            ) {
              onBeamChange({
                ...beam,
                leftSupportPosition: newPosition,
              });
            }
          }}
        />

        <span> m</span>

        {!isLeftSupportValid && (
          <p>Left support must be between 0 and {beam.length} m.</p>
        )}
      </div>

      <div>
        <label htmlFor="right-support-position">Right Support Position</label>

        <input
          id="right-support-position"
          type="number"
          min="0"
          max={beam.length}
          step="0.01"
          value={rightSupportInput}
          onChange={(event) => {
            const newInput = event.target.value;

            setRightSupportInput(newInput);

            const newPosition = Number(newInput);

            if (
              newInput !== "" &&
              validateSupportPosition(newPosition, beam.length) &&
              validateSupportOrder(beam.leftSupportPosition, newPosition)
            ) {
              onBeamChange({
                ...beam,
                rightSupportPosition: newPosition,
              });
            }
          }}
        />

        <span> m</span>

        {!isRightSupportValid && (
          <p>Right support must be between 0 and {beam.length} m.</p>
        )}
      </div>

      {!isSupportOrderValid && (
        <p>Left support cannot be positioned after the right support.</p>
      )}
    </section>
  );
}
