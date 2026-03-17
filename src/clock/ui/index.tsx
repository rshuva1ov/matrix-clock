import type React from "react";

import { MatrixBackground } from "./matrix-background";
import { MatrixClock } from "./matrix-clock";
import { MoscowTimeProvider } from "./moscow-time-provider";

export const ClockPage: React.FC = () => {
  return (
    <MoscowTimeProvider>
      <MatrixBackground>
        <MatrixClock />
      </MatrixBackground>
    </MoscowTimeProvider>
  );
};
