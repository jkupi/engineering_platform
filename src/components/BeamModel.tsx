import type { Beam } from "@/engine/structures/beam/types";
import PinSupport from "@/components/PinSupport";
import RollerSupport from "@/components/RollerSupport";

type BeamModelProps = {
  beam: Beam;
};

export default function BeamModel({ beam }: BeamModelProps) {
  const leftX = 80;
  const rightX = 520;
  const beamY = 70;

  return (
    <section>
      <h2>Beam Model</h2>

      <svg
        viewBox="0 0 600 180"
        width="100%"
        height="180"
        role="img"
        aria-label={`Simply supported beam with a length of ${beam.length} meters`}
      >
        {/* Beam */}
        <line
          x1={leftX}
          y1={beamY}
          x2={rightX}
          y2={beamY}
          stroke="currentColor"
          strokeWidth="6"
        />

        {/* Supports */}
        <PinSupport x={leftX} y={beamY} />

        <RollerSupport x={rightX} y={beamY} />

        {/* Dimension line */}
        <line
          x1={leftX}
          y1="150"
          x2={rightX}
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Left dimension marker */}
        <line
          x1={leftX}
          y1="142"
          x2={leftX}
          y2="158"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Right dimension marker */}
        <line
          x1={rightX}
          y1="142"
          x2={rightX}
          y2="158"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Beam length */}
        <text
          x={(leftX + rightX) / 2}
          y="172"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
        >
          {beam.length} m
        </text>
      </svg>
    </section>
  );
}
