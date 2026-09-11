"use client";

import { useState } from "react";
import type { Beam } from "@/engine/structures/beam/types";

type BeamInputsProps = {
  beam: Beam;
  onBeamChange: (beam: Beam) => void;
};

export default function BeamInputs({
  beam,
  onBeamChange,
}: BeamInputsProps) {
  const [lengthInput, setLengthInput] = useState(
    beam.length.toString()
  );

  const parsedLength = Number(lengthInput);

  const isLengthValid =
    lengthInput !== "" &&
    Number.isFinite(parsedLength) &&
    parsedLength > 0;

  return (
    <section>
      <h2>Inputs</h2>

      <label htmlFor="beam-length">
        Beam Length
      </label>

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

          if (
            newInput !== "" &&
            Number.isFinite(newLength) &&
            newLength > 0
          ) {
            onBeamChange({
              ...beam,
              length: newLength,
            });
          }
        }}
      />

      <span> m</span>

      {!isLengthValid && (
        <p>
          Beam length must be greater than 0.
        </p>
      )}
    </section>
  );
}