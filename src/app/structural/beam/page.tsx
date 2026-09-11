"use client";

import { useState } from "react";
import BeamModel from "@/components/BeamModel";
import type { Beam } from "@/engine/structures/beam/types";
import BeamInputs from "@/components/BeamInputs";

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

      <BeamInputs beam={beam} onBeamChange={setBeam} />

      <section>
        <h2>Results</h2>

        <p>Support reactions and analysis results will be displayed here.</p>
      </section>
    </main>
  );
}
