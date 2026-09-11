import type { Beam } from "@/engine/structures/beam/types";

type BeamModelProps = {
  beam: Beam;
};

export default function BeamModel({ beam }: BeamModelProps) {
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
          x1="80"
          y1="70"
          x2="520"
          y2="70"
          stroke="currentColor"
          strokeWidth="6"
        />

        {/* Left pin support */}
        <polygon
          points="80,70 60,110 100,110"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Ground line under left support */}
        <line
          x1="50"
          y1="110"
          x2="110"
          y2="110"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Right roller support triangle */}
        <polygon
          points="520,70 500,110 540,110"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Right roller circles */}
        <circle
          cx="510"
          cy="119"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />

        <circle
          cx="530"
          cy="119"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Ground line under roller support */}
        <line
          x1="490"
          y1="130"
          x2="550"
          y2="130"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Dimension line */}
        <line
          x1="80"
          y1="150"
          x2="520"
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Left dimension marker */}
        <line
          x1="80"
          y1="142"
          x2="80"
          y2="158"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Right dimension marker */}
        <line
          x1="520"
          y1="142"
          x2="520"
          y2="158"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Beam length */}
        <text
          x="300"
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
