"use client";

import { useState } from "react";
import type { Beam } from "@/engine/structures/beam/types";
import {
  validateBeam,
  validateBeamLength,
  validateSupportOrder,
  validateSupportPosition,
} from "@/engine/structures/beam/validation";

type BeamInputsProps = {
  beam: Beam;
  onBeamChange: (beam: Beam) => void;
};

export default function BeamInputs({ beam, onBeamChange }: BeamInputsProps) {
  const pinSupport = beam.supports[0];
  const rollerSupport = beam.supports[1];

  const [lengthInput, setLengthInput] = useState(beam.length.toString());

  const [pinSupportInput, setPinSupportInput] = useState(
    pinSupport.position.toString(),
  );

  const [rollerSupportInput, setRollerSupportInput] = useState(
    rollerSupport.position.toString(),
  );

  const parsedLength = Number(lengthInput);
  const parsedPinSupport = Number(pinSupportInput);
  const parsedRollerSupport = Number(rollerSupportInput);

  const candidateBeam: Beam = {
    length: parsedLength,
    supports: [
      {
        type: "pin",
        position: parsedPinSupport,
      },
      {
        type: "roller",
        position: parsedRollerSupport,
      },
    ],
  };

  const beamValidation = validateBeam(candidateBeam);

  const isLengthValid = lengthInput !== "" && beamValidation.isLengthValid;

  const isPinSupportValid =
    pinSupportInput !== "" &&
    validateSupportPosition(parsedPinSupport, parsedLength);

  const isRollerSupportValid =
    rollerSupportInput !== "" &&
    validateSupportPosition(parsedRollerSupport, parsedLength);

  const isSupportOrderValid =
    pinSupportInput !== "" &&
    rollerSupportInput !== "" &&
    beamValidation.isSupportOrderValid;

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
              setPinSupportInput("0");
              setRollerSupportInput(newLength.toString());

              onBeamChange({
                ...beam,
                length: newLength,
                supports: [
                  {
                    ...pinSupport,
                    position: 0,
                  },
                  {
                    ...rollerSupport,
                    position: newLength,
                  },
                ],
              });
            }
          }}
        />

        <span> m</span>

        {!isLengthValid && <p>Beam length must be greater than 0.</p>}
      </div>

      <div>
        <label htmlFor="pin-support-position">Pin Support Position</label>

        <input
          id="pin-support-position"
          type="number"
          min="0"
          max={beam.length}
          step="0.01"
          value={pinSupportInput}
          onChange={(event) => {
            const newInput = event.target.value;
            setPinSupportInput(newInput);

            const newPosition = Number(newInput);

            if (
              newInput !== "" &&
              validateSupportPosition(newPosition, beam.length) &&
              validateSupportOrder(newPosition, rollerSupport.position)
            ) {
              onBeamChange({
                ...beam,
                supports: [
                  {
                    ...pinSupport,
                    position: newPosition,
                  },
                  rollerSupport,
                ],
              });
            }
          }}
        />

        <span> m</span>

        {!isPinSupportValid && (
          <p>Pin support must be between 0 and {beam.length} m.</p>
        )}
      </div>

      <div>
        <label htmlFor="roller-support-position">Roller Support Position</label>

        <input
          id="roller-support-position"
          type="number"
          min="0"
          max={beam.length}
          step="0.01"
          value={rollerSupportInput}
          onChange={(event) => {
            const newInput = event.target.value;
            setRollerSupportInput(newInput);

            const newPosition = Number(newInput);

            if (
              newInput !== "" &&
              validateSupportPosition(newPosition, beam.length) &&
              validateSupportOrder(pinSupport.position, newPosition)
            ) {
              onBeamChange({
                ...beam,
                supports: [
                  pinSupport,
                  {
                    ...rollerSupport,
                    position: newPosition,
                  },
                ],
              });
            }
          }}
        />

        <span> m</span>

        {!isRollerSupportValid && (
          <p>Roller support must be between 0 and {beam.length} m.</p>
        )}
      </div>

      {!isSupportOrderValid && (
        <p>Pin support cannot be positioned after the roller support.</p>
      )}
    </section>
  );
}
