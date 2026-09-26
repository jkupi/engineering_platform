"use client";

import { useState } from "react";
import type { Beam } from "@/engine/structures/beam/types";
import {
  validateBeam,
  validateBeamLength,
  validateSupportPosition,
} from "@/engine/structures/beam/validation";

type BeamInputsProps = {
  beam: Beam;
  onBeamChange: (beam: Beam) => void;
};

export default function BeamInputs({ beam, onBeamChange }: BeamInputsProps) {
  // Find each support by its type
  const pinSupport = beam.supports.find((support) => support.type === "pin");

  const rollerSupport = beam.supports.find(
    (support) => support.type === "roller",
  );

  // stores beam length input as text so user can edit
  const [lengthInput, setLengthInput] = useState(beam.length.toString());

  // stores pin support position input or empty string
  const [pinSupportInput, setPinSupportInput] = useState(
    pinSupport?.position.toString() ?? "",
  );

  // stores roller support position input or empty string
  const [rollerSupportInput, setRollerSupportInput] = useState(
    rollerSupport?.position.toString() ?? "",
  );

  if (!pinSupport || !rollerSupport) {
    return (
      <section>
        <h2>Inputs</h2>

        <p>This beam requires one pin support and one roller support.</p>
      </section>
    );
  }

  // Convert the input strings into numbers for validation
  const parsedLength = Number(lengthInput);
  const parsedPinSupport = Number(pinSupportInput);
  const parsedRollerSupport = Number(rollerSupportInput);

  // creates temporary beam from the current form values
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

  // Blank strings are handled here
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
    parsedPinSupport <= parsedRollerSupport;

  return (
    <section>
      <h2>Inputs</h2>

      {/* Beam Length */}
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
              // changing the length resets the pin to the
              // beginning and the roller to the end.
              setPinSupportInput("0");
              setRollerSupportInput(newLength.toString());

              onBeamChange({
                ...beam,
                length: newLength,

                // Preserve the existing support array order,
                // only change the positions of supports that we recognize
                supports: beam.supports.map((support) => {
                  if (support.type === "pin") {
                    return {
                      ...support,
                      position: 0,
                    };
                  }

                  if (support.type === "roller") {
                    return {
                      ...support,
                      position: newLength,
                    };
                  }

                  return support;
                }),
              });
            }
          }}
        />

        <span> m</span>

        {!isLengthValid && <p>Beam length must be greater than 0.</p>}
      </div>

      {/* Pin Support Position */}
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
              newPosition !== rollerSupport.position
            ) {
              onBeamChange({
                ...beam,

                // Update only the pin support
                supports: beam.supports.map((support) =>
                  support.type === "pin"
                    ? {
                        ...support,
                        position: newPosition,
                      }
                    : support,
                ),
              });
            }
          }}
        />

        <span> m</span>

        {!isPinSupportValid && (
          <p>Pin support must be between 0 and {beam.length} m.</p>
        )}
      </div>

      {/* Roller Support Position */}
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
              newPosition !== pinSupport.position
            ) {
              onBeamChange({
                ...beam,

                // update only the roller support
                supports: beam.supports.map((support) =>
                  support.type === "roller"
                    ? {
                        ...support,
                        position: newPosition,
                      }
                    : support,
                ),
              });
            }
          }}
        />

        <span> m</span>

        {!isRollerSupportValid && (
          <p>Roller support must be between 0 and {beam.length} m.</p>
        )}
      </div>

      {/* Support Order Error */}
      {!isSupportOrderValid && (
        <p>Pin support cannot be positioned after the roller support.</p>
      )}
    </section>
  );
}
