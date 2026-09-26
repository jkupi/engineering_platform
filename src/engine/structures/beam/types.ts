export type SupportType = "pin" | "roller";

export type Support = {
  type: SupportType;
  position: number;
};

export type Beam = {
  length: number;
  supports: Support[];
};

export type PointLoad = {
  position: number;
  magnitude: number;
};