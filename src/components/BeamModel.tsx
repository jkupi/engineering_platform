import type { Beam } from "@/engine/structures/beam/types";

type BeamModelProps = {
  beam: Beam;
};

export default function BeamModel({ beam }: BeamModelProps) {
  return (
    <section>
      <h2>Beam Model</h2>

      <p>Beam Length: {beam.length} m</p>
    </section>
  );
}
