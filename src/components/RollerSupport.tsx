type RollerSupportProps = {
  x: number;
  y: number;
};

export default function RollerSupport({ x, y }: RollerSupportProps) {
  return (
    <g>
      {/* Triangle */}
      <polygon
        points={`${x},${y} ${x - 20},${y + 40} ${x + 20},${y + 40}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Left roller */}
      <circle
        cx={x - 10}
        cy={y + 49}
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Right roller */}
      <circle
        cx={x + 10}
        cy={y + 49}
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Ground line */}
      <line
        x1={x - 30}
        y1={y + 60}
        x2={x + 30}
        y2={y + 60}
        stroke="currentColor"
        strokeWidth="3"
      />
    </g>
  );
}
