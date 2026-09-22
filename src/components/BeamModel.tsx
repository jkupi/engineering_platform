import type { Beam } from "@/engine/structures/beam/types";
import PinSupport from "@/components/PinSupport";
import RollerSupport from "@/components/RollerSupport";

type BeamModelProps = {
  beam: Beam;
};

export default function BeamModel({ beam }: BeamModelProps) {
  const svgWidth = 600;
  const beamStartX = 80;
  const beamEndX = 520;
  const beamY = 70;

  const drawableBeamWidth = beamEndX - beamStartX;

  const positionToSvgX = (position: number) => {
    return beamStartX + (position / beam.length) * drawableBeamWidth;
  };

  return (
    <section>
      <h2>Beam Model</h2>

      <svg
        viewBox={`0 0 ${svgWidth} 180`}
        width="100%"
        height="180"
        role="img"
        aria-label={`Beam with a length of ${beam.length} meters`}
      >
        {/* Beam */}
        <line
          x1={beamStartX}
          y1={beamY}
          x2={beamEndX}
          y2={beamY}
          stroke="currentColor"
          strokeWidth="6"
        />

        {/* Supports */}
        {beam.supports.map((support, index) => {
          const supportX = positionToSvgX(support.position);

          if (support.type === "pin") {
            return <PinSupport key={index} x={supportX} y={beamY} />;
          }

          if (support.type === "roller") {
            return <RollerSupport key={index} x={supportX} y={beamY} />;
          }

          return null;
        })}

        {/* Dimension line */}
        <line
          x1={beamStartX}
          y1="150"
          x2={beamEndX}
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Left dimension marker */}
        <line
          x1={beamStartX}
          y1="142"
          x2={beamStartX}
          y2="158"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Right dimension marker */}
        <line
          x1={beamEndX}
          y1="142"
          x2={beamEndX}
          y2="158"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Beam length */}
        <text
          x={(beamStartX + beamEndX) / 2}
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
