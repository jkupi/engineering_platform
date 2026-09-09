"use client";

import { useState } from "react";
import BeamModel from "@/components/BeamModel";
import type { Beam } from "@/engine/structures/beam/types";

export default function BeamPage() {
  const [beam, setBeam] = useState<Beam>({
    length: 6,
  });

  const [lengthInput, setLengthInput] = useState("6");

  const parsedLength = Number(lengthInput);

  const isLengthValid =
    lengthInput !== "" && Number.isFinite(parsedLength) && parsedLength > 0;

  return (
    <main>
      <h1>Beam Analysis</h1>

      <p>
        Analyze beam supports, loads, reactions, shear forces, and bending
        moments.
      </p>

      <BeamModel beam={beam} />

      <section>
        <h2>Inputs</h2>

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

            if (
              newInput !== "" &&
              Number.isFinite(newLength) &&
              newLength > 0
            ) {
              setBeam({
                ...beam,
                length: newLength,
              });
            }
          }}
        />

        <span> m</span>

        {!isLengthValid && <p>Beam length must be greater than 0.</p>}
      </section>

      <section>
        <h2>Results</h2>

        <p>Support reactions and analysis results will be displayed here.</p>
      </section>
    </main>
  );
}
