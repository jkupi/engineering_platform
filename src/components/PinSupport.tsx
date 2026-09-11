type PinSupportProps = {
  x: number;
  y: number;
};

export default function PinSupport({ x, y }: PinSupportProps) {
  return (
    <g>
      {/* Triangle */}
      <polygon
        points={`${x},${y} ${x - 20},${y + 40} ${x + 20},${y + 40}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Ground line */}
      <line
        x1={x - 30}
        y1={y + 40}
        x2={x + 30}
        y2={y + 40}
        stroke="currentColor"
        strokeWidth="3"
      />
    </g>
  );
}
