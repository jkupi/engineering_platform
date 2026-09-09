"use client";

import { useState } from "react";
import BeamModel from "@/components/BeamModel";
import type { Beam } from "@/engine/structures/beam/types";

export default function BeamPage() {
  const [beam, setBeam] = useState<Beam>({
    length: 6,
  });

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
          value={beam.length}
          onChange={(event) => {
            const newLength = Number(event.target.value);

            setBeam({
              ...beam,
              length: newLength,
            });
          }}
        />
        <span> m</span>
      </section>

      <section>
        <h2>Results</h2>

        <p>Support reactions and analysis results will be displayed here.</p>
      </section>
    </main>
  );
}
