"use client";

import { useState } from "react";
import BeamInputs from "@/components/BeamInputs";
import BeamModel from "@/components/BeamModel";
import type { Beam } from "@/engine/structures/beam/types";

export default function BeamWorkspace() {
  const [beam, setBeam] = useState<Beam>({
    length: 6,
    leftSupportPosition: 0,
    rightSupportPosition: 6,
  });

  return (
    <>
      <BeamModel beam={beam} />

      <BeamInputs beam={beam} onBeamChange={setBeam} />
    </>
  );
}
