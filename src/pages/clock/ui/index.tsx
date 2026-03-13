import type React from "react";

import { MatrixBackground } from "@shared/ui/matrix-background";

import { MatrixClock } from "./matrix-clock";

export const ClockPage: React.FC = () => {
  return (
    <MatrixBackground>
      <MatrixClock />
    </MatrixBackground>
  );
};
